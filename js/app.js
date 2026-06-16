(function () {
  "use strict";

  function icon(paths) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + "</svg>";
  }

  var ICONS = {
    visualizacao: icon('<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/>'),
    gratidao: icon('<path d="M12 20.5S4 15.3 4 9.9C4 7.2 6 5.2 8.4 5.2c1.5 0 2.9.8 3.6 2.1.7-1.3 2.1-2.1 3.6-2.1C18 5.2 20 7.2 20 9.9c0 5.4-8 10.6-8 10.6Z"/>'),
    respiracao: icon('<path d="M3 8.5h8.5a2.5 2.5 0 1 0-2.4-3.2"/><path d="M3 12.5h13.5a2.5 2.5 0 1 1-2.4 3.2"/><path d="M3 16.5h6a2 2 0 1 1-1.9 2.6"/>'),
    movimentos: icon('<path d="M11 20.5A7.5 7.5 0 0 1 9.7 6.2C15 5.1 17 4.5 19.5 2.5c.9 2 1.8 4.2 1.8 7.5 0 5.8-4.7 10.5-10.3 10.5Z"/><path d="M3 21c0-3 1.9-5.4 5-6 2.4-.5 4.5-2 5.5-3"/>'),
    contemplacao: icon('<circle cx="17" cy="7" r="2.4"/><path d="M3 18l5.5-8 4.5 6 2.5-3.2L21 18"/>'),
    musicas: icon('<path d="M9 18.5V5.5l11-2v12.5"/><circle cx="6.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>'),
    humor: icon('<circle cx="12" cy="12" r="9"/><path d="M8.2 14s1.3 2.2 3.8 2.2 3.8-2.2 3.8-2.2"/><path d="M9 9.3v.4M15 9.3v.4"/>'),
    bondade: icon('<path d="M12 9.5 9.7 7.2a2.6 2.6 0 1 1 3.7-3.7l-1.4 1.3 1.4-1.3a2.6 2.6 0 1 1 3.7 3.7L14.5 9.8"/><path d="M3 14.5l4-3.8c.5-.5 1.4-.5 1.9 0 .6.6.5 1.5-.1 2L7 14.5h6.5a1.8 1.8 0 0 1 0 3.6H9.2c-1 0-1.9-.4-2.6-1.1"/><path d="M3 21l3-3"/>'),
    palavras: icon('<path d="M2 4.5h6.5a3.5 3.5 0 0 1 3.5 3.5v11.5a3 3 0 0 0-3-3H2z"/><path d="M22 4.5h-6.5A3.5 3.5 0 0 0 12 8v11.5a3 3 0 0 1 3-3h7z"/>')
  };

  var DIMENSIONS = [
    {
      id: "respiracao",
      titulo: "Respiração",
      desc: "Exercícios guiados com animação.",
      accent: "#4d8fd1"
    },
    {
      id: "gratidao",
      titulo: "Gratidão",
      desc: "Práticas e um espaço para escrever.",
      accent: "#c98f3d"
    },
    {
      id: "visualizacao",
      titulo: "Visualização",
      desc: "Imagens mentais que acalmam e treinam o cérebro.",
      accent: "#8b6fc7"
    },
    {
      id: "movimentos",
      titulo: "Movimentos",
      desc: "Gestos suaves, alongamento e tai chi.",
      accent: "#58a472"
    },
    {
      id: "contemplacao",
      titulo: "Contemplação",
      desc: "Com imagem ou na vida real — você escolhe.",
      accent: "#4aa3a3"
    },
    {
      id: "musicas",
      titulo: "Música",
      desc: "Sons para ouvir agora e práticas de escuta.",
      accent: "#c46a92"
    },
    {
      id: "palavras",
      titulo: "Poemas & contos",
      desc: "Palavras para ler devagar.",
      accent: "#a3845c"
    },
    {
      id: "bondade",
      titulo: "Fazer o bem",
      desc: "Pequenos atos de generosidade.",
      accent: "#d16a5e"
    }
  ];

  var STORAGE_KEY = "presente-bag-v3";
  var MODE_KEY = "presente-contemplacao-modo";
  var NOTES_KEY = "presente-notas";
  var currentDim = null;
  var breathCtl = null;
  var timerCtl = null;
  var audioCtl = null;

  // ---------- sorteio sem repetição ----------

  function loadBags() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveBags(bags) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bags));
    } catch (e) { /* modo anônimo etc. — segue sem persistir */ }
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  // filter: função opcional (tarefa -> bool); bagKey separa os "sacos"
  // (ex.: contemplação com imagem × na vida real)
  function drawTask(dimId, filter, bagKey) {
    var data = window.PRACTICES && window.PRACTICES[dimId];
    if (!data || !data.tarefas || !data.tarefas.length) return null;

    var idxs = [];
    data.tarefas.forEach(function (t, i) {
      if (!filter || filter(t)) idxs.push(i);
    });
    if (!idxs.length) return null;

    var key = bagKey || dimId;
    var bags = loadBags();
    var bag = bags[key];
    var valid = Array.isArray(bag) && bag.length &&
      bag.every(function (i) { return idxs.indexOf(i) !== -1; });
    if (!valid) bag = shuffle(idxs.slice());

    var idx = bag.pop();
    bags[key] = bag;
    saveBags(bags);

    return { tarefa: data.tarefas[idx], restantes: bag.length, total: idxs.length };
  }

  // timer automático: detecta duração no texto da prática
  function parseTimer(t) {
    if (t.timer) return t.timer;
    if (t.anim) return 0; // respiração guiada já tem ritmo próprio
    var m = t.t.match(/(\d+)\s*(?:a\s*(\d+)\s*)?minutos?/i);
    if (m) return parseInt(m[2] || m[1], 10) * 60;
    m = t.t.match(/(\d+)\s*segundos?/i);
    if (m) return parseInt(m[1], 10);
    return 0;
  }

  // ---------- UI ----------

  var cardsEl = document.getElementById("cards");
  var overlay = document.getElementById("overlay");
  var iconEl = document.getElementById("practice-icon");
  var dimEl = document.getElementById("practice-dim");
  var textEl = document.getElementById("practice-text");
  var scienceEl = document.getElementById("practice-science");
  var whyEl = document.getElementById("practice-why");
  var sourceEl = document.getElementById("practice-source");
  var noteEl = document.getElementById("practice-note");
  var countEl = document.getElementById("practice-count");
  var imgWrap = document.getElementById("practice-img-wrap");
  var imgEl = document.getElementById("practice-img");
  var guideEl = document.getElementById("breath-guide");
  var poemEl = document.getElementById("practice-poem");
  var poemTextEl = document.getElementById("poem-text");
  var poemAuthorEl = document.getElementById("poem-author");
  var timerEl = document.getElementById("practice-timer");
  var audioEl = document.getElementById("practice-audio");
  var writeEl = document.getElementById("practice-write");
  var writeArea = document.getElementById("write-area");
  var writeStatus = document.getElementById("write-status");
  var modeEl = document.getElementById("practice-mode");
  var sheetEl = document.querySelector(".practice-card");

  DIMENSIONS.forEach(function (dim) {
    var btn = document.createElement("button");
    btn.className = "card";
    btn.style.setProperty("--accent", dim.accent);
    btn.innerHTML =
      '<span class="card-icon">' + ICONS[dim.id] + "</span>" +
      '<span class="card-title">' + dim.titulo + "</span>" +
      '<span class="card-desc">' + dim.desc + "</span>";
    btn.addEventListener("click", function () { openPractice(dim); });
    cardsEl.appendChild(btn);
  });

  function stopExtras() {
    if (breathCtl) { breathCtl.stop(); breathCtl = null; }
    if (timerCtl) { timerCtl.stop(); timerCtl = null; }
    if (audioCtl) { audioCtl.stop(); audioCtl = null; }
    guideEl.hidden = true;
    timerEl.hidden = true;
    audioEl.hidden = true;
    poemEl.hidden = true;
    writeEl.hidden = true;
    modeEl.hidden = true;
  }

  function getContemplacaoModo() {
    var m = localStorage.getItem(MODE_KEY);
    return m === "vida" ? "vida" : "imagem";
  }

  function syncModeButtons() {
    var modo = getContemplacaoModo();
    modeEl.querySelectorAll(".mode-opt").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.mode === modo));
    });
  }

  function openPractice(dim) {
    stopExtras();

    var result;
    var storyMode = false;
    if (dim.id === "contemplacao") {
      var modo = getContemplacaoModo();
      result = drawTask(dim.id, function (t) { return t.modo === modo; },
        dim.id + ":" + modo);
      storyMode = modo === "imagem";
      modeEl.hidden = storyMode;
      if (!storyMode) syncModeButtons();
    } else {
      result = drawTask(dim.id);
    }
    overlay.classList.toggle("story-mode", storyMode);

    if (!result) {
      textEl.textContent = "As práticas desta dimensão ainda não foram carregadas. Tente recarregar a página.";
      scienceEl.hidden = true;
      noteEl.hidden = true;
      countEl.textContent = "";
      imgWrap.hidden = true;
    } else {
      var t = result.tarefa;
      textEl.textContent = t.t;

      scienceEl.hidden = !t.f;
      whyEl.textContent = t.f || "";
      sourceEl.hidden = !t.fonte;
      sourceEl.textContent = t.fonte || "";

      noteEl.hidden = !t.n;
      noteEl.textContent = t.n || "";

      countEl.textContent =
        "Prática " + (result.total - result.restantes) + " de " + result.total + " desta rodada";

      if (t.img) {
        imgEl.src = "https://picsum.photos/seed/" + encodeURIComponent(t.img) + "/800/500";
        imgWrap.hidden = false;
      } else {
        imgWrap.hidden = true;
        imgEl.removeAttribute("src");
      }

      if (t.poema) {
        poemTextEl.textContent = t.poema;
        poemAuthorEl.textContent = t.autor || "";
        poemEl.hidden = false;
      }

      if (t.anim && window.BreathGuide) {
        breathCtl = window.BreathGuide.mount(guideEl, t.anim);
      } else {
        var secs = parseTimer(t);
        if (secs >= 20 && window.PracticeTimer) {
          timerCtl = window.PracticeTimer.mount(timerEl, secs);
        }
      }

      if (dim.id === "musicas" && window.SoundPlayer) {
        audioCtl = window.SoundPlayer.mount(audioEl, t.som);
      }

      if (dim.id === "gratidao") {
        writeArea.value = "";
        writeStatus.textContent = "";
        writeEl.hidden = false;
      }
    }

    currentDim = dim;
    iconEl.innerHTML = ICONS[dim.id];
    sheetEl.style.setProperty("--accent", dim.accent);
    document.querySelector(".practice-head").style.setProperty("--accent", dim.accent);
    dimEl.textContent = dim.titulo;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    sheetEl.scrollTop = 0;
  }

  function closePractice() {
    stopExtras();
    overlay.hidden = true;
    overlay.classList.remove("story-mode");
    document.body.style.overflow = "";
    currentDim = null;
  }

  // alternador imagem / vida real (contemplação)
  modeEl.querySelectorAll(".mode-opt").forEach(function (b) {
    b.addEventListener("click", function () {
      try { localStorage.setItem(MODE_KEY, b.dataset.mode); } catch (e) { /* ok */ }
      if (currentDim) openPractice(currentDim);
    });
  });

  // diário de gratidão
  document.getElementById("write-save").addEventListener("click", function () {
    var text = writeArea.value.trim();
    if (!text) {
      writeStatus.textContent = "Escreva algo primeiro.";
      return;
    }
    try {
      var notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
      notes.push({ data: new Date().toISOString(), texto: text });
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      writeStatus.textContent = "Guardado ✓ (" + notes.length + " no seu diário)";
    } catch (e) {
      writeStatus.textContent = "Não foi possível guardar neste navegador.";
    }
  });

  document.getElementById("close-btn").addEventListener("click", closePractice);
  document.getElementById("done-btn").addEventListener("click", function () {
    this.classList.add("is-done");
    var btn = this;
    setTimeout(function () {
      btn.classList.remove("is-done");
      closePractice();
    }, 620);
  });
  document.getElementById("another-btn").addEventListener("click", function () {
    if (currentDim) openPractice(currentDim);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) closePractice();
  });
})();
