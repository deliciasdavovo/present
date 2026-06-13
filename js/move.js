/* Guia visual "faça comigo" para movimentos ritmados.
 *
 * Irmão de breath.js — mesmo loop de fases comprovado, mas conta REPETIÇÕES
 * e desenha uma figura simples que se move junto com a pessoa.
 *
 * Uso: MoveGuide.mount(container, mov) -> { stop() }
 *
 * mov = {
 *   type: "arms" | "sway" | "squeeze",
 *   reps: 10,
 *   phases: [{ label: "Suba os braços", dur: 4, to: 1 }, ...]
 * }
 * "to" é o nível-alvo ao fim da fase (0..1) e guia a posição da figura.
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

  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function mount(container, mov) {
    container.innerHTML = "";
    container.hidden = false;

    var stage = document.createElement("div");
    stage.className = "move-stage";
    var svg = el("svg", { viewBox: "0 0 100 100" });
    stage.appendChild(svg);

    var readout = document.createElement("div");
    readout.className = "move-readout";
    var labelEl = document.createElement("div");
    labelEl.className = "move-label";
    var counterEl = document.createElement("div");
    counterEl.className = "move-counter";
    readout.appendChild(labelEl);
    readout.appendChild(counterEl);

    var ctl = document.createElement("button");
    ctl.className = "move-ctl";
    ctl.textContent = "Pausar";

    container.appendChild(stage);
    container.appendChild(readout);
    container.appendChild(ctl);

    var type = mov.type || "arms";

    // aura de tensão (só no modo squeeze)
    var aura = el("circle", { cx: 50, cy: 52, r: 44 }, "move-aura");
    if (type === "squeeze") svg.appendChild(aura);

    // figura: cabeça + tronco + pernas + dois braços, agrupada para poder balançar
    var fig = el("g", {}, "move-fig");
    fig.appendChild(el("circle", { cx: 50, cy: 20, r: 8 }, "move-body"));
    fig.appendChild(el("line", { x1: 50, y1: 28, x2: 50, y2: 60 }, "move-body"));
    fig.appendChild(el("line", { x1: 50, y1: 60, x2: 39, y2: 86 }, "move-body"));
    fig.appendChild(el("line", { x1: 50, y1: 60, x2: 61, y2: 86 }, "move-body"));
    var armL = el("line", { x1: 50, y1: 38, x2: 30, y2: 58 }, "move-limb");
    var armR = el("line", { x1: 50, y1: 38, x2: 70, y2: 58 }, "move-limb");
    fig.appendChild(armL);
    fig.appendChild(armR);
    svg.appendChild(fig);

    var phases = mov.phases;
    var totalReps = mov.reps || 8;
    var reduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var running = true;
    var finished = false;
    var phaseIdx = 0;
    var rep = 1;
    var elapsed = 0;
    var levelStart = 0;
    var raf = null;
    var lastTs = null;

    function levelTarget(i) {
      var p = phases[i];
      return typeof p.to === "number" ? p.to : levelStart;
    }

    function render() {
      var p = phases[phaseIdx];
      var t = Math.min(elapsed / p.dur, 1);
      var level = reduced ? levelTarget(phaseIdx) : lerp(levelStart, levelTarget(phaseIdx), easeInOut(t));

      labelEl.textContent = p.label;
      var remaining = Math.max(Math.ceil(p.dur - elapsed), 0);
      counterEl.textContent = finished
        ? "Concluído"
        : remaining + "s · repetição " + rep + " de " + totalReps;

      if (type === "arms") {
        // braços sobem dos lados (nível 0) até acima da cabeça (nível 1)
        var a = lerp(0.35, 2.79, level); // radianos a partir da vertical para baixo
        var L = 24;
        armL.setAttribute("x2", 50 - L * Math.sin(a));
        armL.setAttribute("y2", 38 + L * Math.cos(a));
        armR.setAttribute("x2", 50 + L * Math.sin(a));
        armR.setAttribute("y2", 38 + L * Math.cos(a));
        fig.removeAttribute("transform");
      } else if (type === "sway") {
        // figura inclina e desliza de um lado ao outro
        var dx = lerp(-14, 14, level);
        var rot = lerp(-8, 8, level);
        fig.setAttribute("transform", "translate(" + dx + " 0) rotate(" + rot + " 50 60)");
      } else {
        // squeeze: aura aperta (nível 1 = tensão) e a figura encolhe um pouco
        var r = lerp(44, 28, level);
        aura.setAttribute("r", r);
        aura.style.opacity = 0.25 + 0.55 * level;
        var s = lerp(1, 0.92, level);
        fig.setAttribute("transform", "translate(" + (50 - 50 * s) + " " + (60 - 60 * s) + ") scale(" + s + ")");
      }
    }

    function advance(dt) {
      elapsed += dt;
      var p = phases[phaseIdx];
      while (elapsed >= p.dur) {
        elapsed -= p.dur;
        levelStart = levelTarget(phaseIdx);
        phaseIdx++;
        if (phaseIdx >= phases.length) {
          phaseIdx = 0;
          rep++;
          if (rep > totalReps) {
            finished = true;
            running = false;
            phaseIdx = phases.length - 1;
            elapsed = phases[phaseIdx].dur;
            labelEl.textContent = "Muito bem";
            counterEl.textContent = "Movimento concluído";
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
      rep = 1;
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

  window.MoveGuide = { mount: mount };
})();
