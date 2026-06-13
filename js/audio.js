/* Sons gerados no aparelho (Web Audio): tocam de verdade, offline,
 * sem depender de streaming nem de direitos autorais.
 *
 * Uso: SoundPlayer.mount(container, defaultKey) -> { stop() }
 */
(function () {
  "use strict";

  var SOUNDS = {
    tons: "Tons calmos",
    chuva: "Chuva",
    mar: "Mar",
    vento: "Vento"
  };

  var ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5z"/></svg>';
  var ICON_STOP = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6.5" y="6.5" width="11" height="11" rx="2"/></svg>';

  var ctx = null;
  var graph = null; // nós ativos para desligar

  function ensureCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function noiseBuffer(c, brown) {
    var len = c.sampleRate * 2;
    var buf = c.createBuffer(1, len, c.sampleRate);
    var data = buf.getChannelData(0);
    var last = 0;
    for (var i = 0; i < len; i++) {
      var w = Math.random() * 2 - 1;
      if (brown) {
        last = (last + 0.02 * w) / 1.02;
        data[i] = last * 3.5;
      } else {
        data[i] = w;
      }
    }
    return buf;
  }

  function startSound(key) {
    var c = ensureCtx();
    var master = c.createGain();
    master.gain.setValueAtTime(0.0001, c.currentTime);
    master.gain.exponentialRampToValueAtTime(0.5, c.currentTime + 1.2);
    master.connect(c.destination);
    var nodes = [master];

    function noiseSrc(brown) {
      var src = c.createBufferSource();
      src.buffer = noiseBuffer(c, brown);
      src.loop = true;
      return src;
    }

    if (key === "chuva") {
      var src = noiseSrc(false);
      var lp = c.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1400;
      var g = c.createGain();
      g.gain.value = 0.35;
      src.connect(lp); lp.connect(g); g.connect(master);
      src.start();
      nodes.push(src, lp, g);
    } else if (key === "mar") {
      var src2 = noiseSrc(true);
      var lp2 = c.createBiquadFilter();
      lp2.type = "lowpass";
      lp2.frequency.value = 650;
      var g2 = c.createGain();
      g2.gain.value = 0.5;
      // ondas: LFO bem lento modulando o volume
      var lfo = c.createOscillator();
      lfo.frequency.value = 0.07;
      var lfoGain = c.createGain();
      lfoGain.gain.value = 0.3;
      lfo.connect(lfoGain); lfoGain.connect(g2.gain);
      src2.connect(lp2); lp2.connect(g2); g2.connect(master);
      src2.start(); lfo.start();
      nodes.push(src2, lp2, g2, lfo, lfoGain);
    } else if (key === "vento") {
      var src3 = noiseSrc(false);
      var bp = c.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 500;
      bp.Q.value = 1.1;
      var g3 = c.createGain();
      g3.gain.value = 0.35;
      // o vento "passeia": LFO na frequência do filtro
      var lfo2 = c.createOscillator();
      lfo2.frequency.value = 0.05;
      var lfo2Gain = c.createGain();
      lfo2Gain.gain.value = 260;
      lfo2.connect(lfo2Gain); lfo2Gain.connect(bp.frequency);
      src3.connect(bp); bp.connect(g3); g3.connect(master);
      src3.start(); lfo2.start();
      nodes.push(src3, bp, g3, lfo2, lfo2Gain);
    } else {
      // tons calmos: acorde suave (lá maior) respirando devagar
      [220, 277.18, 329.63].forEach(function (freq, i) {
        var osc = c.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        var og = c.createGain();
        og.gain.value = 0.05;
        var lfo3 = c.createOscillator();
        lfo3.frequency.value = 0.05 + i * 0.018;
        var lfo3Gain = c.createGain();
        lfo3Gain.gain.value = 0.03;
        lfo3.connect(lfo3Gain); lfo3Gain.connect(og.gain);
        osc.connect(og); og.connect(master);
        osc.start(); lfo3.start();
        nodes.push(osc, og, lfo3, lfo3Gain);
      });
    }

    graph = { master: master, nodes: nodes };
  }

  function stopSound() {
    if (!graph || !ctx) return;
    var g = graph;
    graph = null;
    try {
      g.master.gain.cancelScheduledValues(ctx.currentTime);
      g.master.gain.setValueAtTime(g.master.gain.value || 0.5, ctx.currentTime);
      g.master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
    } catch (e) { /* contexto pode ter fechado */ }
    setTimeout(function () {
      g.nodes.forEach(function (n) {
        try { if (n.stop) n.stop(); } catch (e) { /* já parado */ }
        try { n.disconnect(); } catch (e) { /* já desconectado */ }
      });
    }, 500);
  }

  function mount(container, defaultKey) {
    container.innerHTML = "";
    container.hidden = false;

    var current = SOUNDS[defaultKey] ? defaultKey : "tons";
    var playing = false;

    var row = document.createElement("div");
    row.className = "audio-row";
    var playBtn = document.createElement("button");
    playBtn.className = "audio-play";
    playBtn.setAttribute("aria-label", "Tocar som");
    playBtn.innerHTML = ICON_PLAY;
    var info = document.createElement("div");
    var title = document.createElement("div");
    title.className = "audio-title";
    var hint = document.createElement("div");
    hint.className = "audio-hint";
    hint.textContent = "Som gerado no aparelho · funciona offline";
    info.appendChild(title);
    info.appendChild(hint);
    row.appendChild(playBtn);
    row.appendChild(info);

    var chips = document.createElement("div");
    chips.className = "audio-chips";
    Object.keys(SOUNDS).forEach(function (key) {
      var chip = document.createElement("button");
      chip.className = "chip";
      chip.textContent = SOUNDS[key];
      chip.setAttribute("aria-pressed", String(key === current));
      chip.addEventListener("click", function () {
        current = key;
        chips.querySelectorAll(".chip").forEach(function (el) {
          el.setAttribute("aria-pressed", String(el === chip));
        });
        update();
        if (playing) { stopSound(); startSound(current); }
      });
      chips.appendChild(chip);
    });

    function update() {
      title.textContent = SOUNDS[current];
      playBtn.innerHTML = playing ? ICON_STOP : ICON_PLAY;
      playBtn.setAttribute("aria-label", playing ? "Parar som" : "Tocar som");
    }

    playBtn.addEventListener("click", function () {
      if (playing) {
        stopSound();
        playing = false;
      } else {
        startSound(current);
        playing = true;
      }
      update();
    });

    container.appendChild(row);
    container.appendChild(chips);
    update();

    return {
      stop: function () {
        stopSound();
        container.innerHTML = "";
        container.hidden = true;
      }
    };
  }

  window.SoundPlayer = { mount: mount };
})();
