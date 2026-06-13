/* Timer circular para práticas com duração.
 * Uso: PracticeTimer.mount(container, seconds) -> { stop() }
 */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var R = 54, CIRC = 2 * Math.PI * R;

  function fmt(s) {
    s = Math.max(0, Math.ceil(s));
    var m = Math.floor(s / 60);
    var ss = s % 60;
    return m + ":" + (ss < 10 ? "0" : "") + ss;
  }

  function mount(container, seconds) {
    container.innerHTML = "";
    container.hidden = false;

    var ring = document.createElement("div");
    ring.className = "timer-ring";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 120 120");
    var track = document.createElementNS(NS, "circle");
    track.setAttribute("class", "timer-track");
    var prog = document.createElementNS(NS, "circle");
    prog.setAttribute("class", "timer-progress");
    [track, prog].forEach(function (c) {
      c.setAttribute("cx", 60);
      c.setAttribute("cy", 60);
      c.setAttribute("r", R);
    });
    prog.style.strokeDasharray = CIRC;
    prog.style.strokeDashoffset = 0;
    svg.appendChild(track);
    svg.appendChild(prog);
    ring.appendChild(svg);

    var time = document.createElement("div");
    time.className = "timer-time";
    time.textContent = fmt(seconds);
    var pad = document.createElement("div");
    pad.className = "timer-pad";

    var btn = document.createElement("button");
    btn.className = "timer-btn";
    btn.textContent = "Iniciar";

    container.appendChild(ring);
    container.appendChild(time);
    container.appendChild(pad);
    container.appendChild(btn);

    var remaining = seconds;
    var running = false;
    var done = false;
    var interval = null;
    var lastTs = null;

    function render() {
      time.textContent = done ? "✓" : fmt(remaining);
      prog.style.strokeDashoffset = CIRC * (1 - remaining / seconds);
    }

    function tick() {
      var now = Date.now();
      remaining -= (now - lastTs) / 1000;
      lastTs = now;
      if (remaining <= 0) {
        remaining = 0;
        done = true;
        running = false;
        clearInterval(interval);
        btn.textContent = "Repetir";
        if (navigator.vibrate) navigator.vibrate([120, 80, 120]);
      }
      render();
    }

    btn.addEventListener("click", function () {
      if (done) {
        remaining = seconds;
        done = false;
        render();
      }
      if (running) {
        running = false;
        clearInterval(interval);
        btn.textContent = "Continuar";
      } else {
        running = true;
        lastTs = Date.now();
        interval = setInterval(tick, 200);
        btn.textContent = "Pausar";
      }
    });

    render();

    return {
      stop: function () {
        if (interval) clearInterval(interval);
        container.innerHTML = "";
        container.hidden = true;
      }
    };
  }

  window.PracticeTimer = { mount: mount };
})();
