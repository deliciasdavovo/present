/* Guia visual animado de respiração.
 *
 * Uso: BreathGuide.mount(container, anim) -> { stop() }
 *
 * anim = {
 *   type: "triangle" | "box" | "circle" | "nostril" | "sigh",
 *   cycles: 6,
 *   phases: [{ label: "Inspire", dur: 4, to: 1, side: "L"|"R"? }, ...]
 * }
 * "to" é o nível de ar nos pulmões ao fim da fase (0 = vazio, 1 = cheio).
 * Em triangle/box cada fase corresponde a um lado do polígono.
 */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs, cls) {
    var node = document.createElementNS(NS, tag);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (cls) node.setAttribute("class", cls);
    return node;
  }

  function polygonPoints(type) {
    // viewBox 0..100; triângulo e quadrado centrados
    if (type === "triangle") {
      return [[50, 10], [92, 84], [8, 84]];
    }
    return [[14, 14], [86, 14], [86, 86], [14, 86]]; // box
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function mount(container, anim) {
    container.innerHTML = "";
    container.hidden = false;

    var stage = document.createElement("div");
    stage.className = "breath-stage";
    var svg = el("svg", { viewBox: "0 0 100 100" });
    stage.appendChild(svg);

    var readout = document.createElement("div");
    readout.className = "breath-readout";
    var labelEl = document.createElement("div");
    labelEl.className = "breath-label";
    var counterEl = document.createElement("div");
    counterEl.className = "breath-counter";
    readout.appendChild(labelEl);
    readout.appendChild(counterEl);

    var ctl = document.createElement("button");
    ctl.className = "breath-ctl";
    ctl.textContent = "Pausar";

    container.appendChild(stage);
    container.appendChild(readout);
    container.appendChild(ctl);

    // ----- elementos por tipo -----
    var type = anim.type;
    var parts = {};

    if (type === "triangle" || type === "box") {
      var pts = polygonPoints(type);
      var ptsStr = pts.map(function (p) { return p.join(","); }).join(" ");
      svg.appendChild(el("polygon", { points: ptsStr }, "breath-track"));
      parts.edge = el("line", {}, "breath-active");
      svg.appendChild(parts.edge);
      parts.dot = el("circle", { r: 4 }, "breath-dot");
      svg.appendChild(parts.dot);
      parts.pts = pts;
    } else if (type === "nostril") {
      // nariz minimalista: ponte + duas narinas
      svg.appendChild(el("path", {
        d: "M50 18 C46 34 42 44 38 54 C34 63 36 70 43 72 M50 18 C54 34 58 44 62 54 C66 63 64 70 57 72"
      }, "breath-line"));
      parts.left = el("ellipse", { cx: 38, cy: 67, rx: 6, ry: 4.5 }, "breath-fill");
      parts.right = el("ellipse", { cx: 62, cy: 67, rx: 6, ry: 4.5 }, "breath-fill");
      svg.appendChild(parts.left);
      svg.appendChild(parts.right);
      // setas de fluxo de ar
      parts.arrowL = el("path", { d: "M38 88 L38 78 M34 82 L38 78 L42 82" }, "breath-active");
      parts.arrowR = el("path", { d: "M62 88 L62 78 M58 82 L62 78 L66 82" }, "breath-active");
      svg.appendChild(parts.arrowL);
      svg.appendChild(parts.arrowR);
      // marca de "tampe esta narina"
      parts.blockL = el("path", { d: "M33 62 L43 72 M43 62 L33 72" }, "breath-line");
      parts.blockR = el("path", { d: "M57 62 L67 72 M67 62 L57 72" }, "breath-line");
      svg.appendChild(parts.blockL);
      svg.appendChild(parts.blockR);
    } else {
      // circle / sigh: círculo que cresce e diminui
      svg.appendChild(el("circle", { cx: 50, cy: 50, r: 42 }, "breath-track"));
      parts.ball = el("circle", { cx: 50, cy: 50, r: 20 }, "breath-fill");
      svg.appendChild(parts.ball);
    }

    // ----- estado -----
    var phases = anim.phases;
    var totalCycles = anim.cycles || 6;
    var reduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var running = true;
    var finished = false;
    var phaseIdx = 0;
    var cycle = 1;
    var elapsed = 0;          // segundos dentro da fase atual
    var levelStart = 0;       // nível de ar no início da fase
    var raf = null;
    var lastTs = null;

    function phaseLevelTarget(i) {
      var p = phases[i];
      return typeof p.to === "number" ? p.to : levelStart;
    }

    function render() {
      var p = phases[phaseIdx];
      var t = Math.min(elapsed / p.dur, 1);
      var level = lerp(levelStart, phaseLevelTarget(phaseIdx), easeInOut(t));

      labelEl.textContent = p.label;
      var remaining = Math.max(Math.ceil(p.dur - elapsed), 0);
      counterEl.textContent = finished
        ? "Concluído"
        : remaining + "s · ciclo " + cycle + " de " + totalCycles;

      if (type === "triangle" || type === "box") {
        var pts = parts.pts;
        var a = pts[phaseIdx % pts.length];
        var b = pts[(phaseIdx + 1) % pts.length];
        var prog = reduced ? 0 : t;
        var x = lerp(a[0], b[0], prog);
        var y = lerp(a[1], b[1], prog);
        parts.dot.setAttribute("cx", x);
        parts.dot.setAttribute("cy", y);
        parts.edge.setAttribute("x1", a[0]);
        parts.edge.setAttribute("y1", a[1]);
        parts.edge.setAttribute("x2", x);
        parts.edge.setAttribute("y2", y);
      } else if (type === "nostril") {
        var side = p.side; // "L" respira pela esquerda, "R" pela direita
        var pulse = reduced ? 4.5 : 4.5 + 1.5 * level;
        parts.left.setAttribute("ry", side === "L" ? pulse : 4.5);
        parts.right.setAttribute("ry", side === "R" ? pulse : 4.5);
        parts.left.style.opacity = side === "L" ? 1 : 0.35;
        parts.right.style.opacity = side === "R" ? 1 : 0.35;
        parts.arrowL.style.opacity = side === "L" ? 1 : 0;
        parts.arrowR.style.opacity = side === "R" ? 1 : 0;
        parts.blockL.style.opacity = side === "R" ? 0.8 : 0;
        parts.blockR.style.opacity = side === "L" ? 0.8 : 0;
        // seta aponta para cima ao inspirar, para baixo ao expirar
        var goingUp = phaseLevelTarget(phaseIdx) >= levelStart;
        var rot = goingUp ? "" : "rotate(180 {x} 83)";
        parts.arrowL.setAttribute("transform", rot.replace("{x}", 38));
        parts.arrowR.setAttribute("transform", rot.replace("{x}", 62));
      } else {
        var r = reduced ? 30 : 14 + 26 * level;
        parts.ball.setAttribute("r", r);
      }
    }

    function advance(dt) {
      elapsed += dt;
      var p = phases[phaseIdx];
      while (elapsed >= p.dur) {
        elapsed -= p.dur;
        levelStart = phaseLevelTarget(phaseIdx);
        phaseIdx++;
        if (phaseIdx >= phases.length) {
          phaseIdx = 0;
          cycle++;
          if (cycle > totalCycles) {
            finished = true;
            running = false;
            phaseIdx = phases.length - 1;
            elapsed = phases[phaseIdx].dur;
            labelEl.textContent = "Muito bem";
            counterEl.textContent = "Prática concluída";
            ctl.textContent = "Repetir";
            return;
          }
        }
        p = phases[phaseIdx];
      }
    }

    function loop(ts) {
      if (!running) return;
      if (lastTs === null) lastTs = ts;
      var dt = Math.min((ts - lastTs) / 1000, 0.1);
      lastTs = ts;
      advance(dt);
      if (!finished) render();
      if (running) raf = requestAnimationFrame(loop);
    }

    function start() {
      running = true;
      finished = false;
      lastTs = null;
      ctl.textContent = "Pausar";
      raf = requestAnimationFrame(loop);
    }

    function reset() {
      phaseIdx = 0;
      cycle = 1;
      elapsed = 0;
      levelStart = 0;
    }

    ctl.addEventListener("click", function () {
      if (finished) { reset(); start(); return; }
      if (running) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        ctl.textContent = "Continuar";
      } else {
        start();
      }
    });

    render();
    start();

    return {
      stop: function () {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        container.innerHTML = "";
        container.hidden = true;
      }
    };
  }

  window.BreathGuide = { mount: mount };
})();
