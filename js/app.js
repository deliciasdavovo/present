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
    bondade: icon('<path d="M12 9.5 9.7 7.2a2.6 2.6 0 1 1 3.7-3.7l-1.4 1.3 1.4-1.3a2.6 2.6 0 1 1 3.7 3.7L14.5 9.8"/><path d="M3 14.5l4-3.8c.5-.5 1.4-.5 1.9 0 .6.6.5 1.5-.1 2L7 14.5h6.5a1.8 1.8 0 0 1 0 3.6H9.2c-1 0-1.9-.4-2.6-1.1"/><path d="M3 21l3-3"/>')
  };

  var DIMENSIONS = [
    {
      id: "respiracao",
      titulo: "Respiração",
      desc: "Exercícios guiados com animação para acalmar corpo e mente.",
      accent: "#4d8fd1"
    },
    {
      id: "gratidao",
      titulo: "Gratidão",
      desc: "Práticas com efeito comprovado sobre humor e sono.",
      accent: "#c98f3d"
    },
    {
      id: "visualizacao",
      titulo: "Visualização",
      desc: "Imagens mentais que reduzem a ansiedade e treinam o cérebro.",
      accent: "#8b6fc7"
    },
    {
      id: "movimentos",
      titulo: "Movimentos que curam",
      desc: "Gestos suaves, alongamento e tai chi para soltar a tensão.",
      accent: "#58a472"
    },
    {
      id: "contemplacao",
      titulo: "Contemplação",
      desc: "Pausas de atenção que restauram o foco e baixam o estresse.",
      accent: "#4aa3a3"
    },
    {
      id: "musicas",
      titulo: "Música",
      desc: "Escuta, canto e ritmo como reguladores do humor.",
      accent: "#c46a92"
    },
    {
      id: "humor",
      titulo: "Humor",
      desc: "Riso e leveza com efeitos mensuráveis no estresse.",
      accent: "#e08e4f"
    },
    {
      id: "bondade",
      titulo: "Fazer o bem",
      desc: "Pequenos atos de generosidade que elevam o bem-estar.",
      accent: "#d16a5e"
    }
  ];

  var STORAGE_KEY = "presente-bag-v2";
  var currentDim = null;
  var breathCtl = null;

  // Sorteio sem repetição: mantém um "saco" embaralhado de índices por
  // dimensão no localStorage; só repete depois de passar por todas.
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

  function drawTask(dimId) {
    var data = window.PRACTICES && window.PRACTICES[dimId];
    if (!data || !data.tarefas || !data.tarefas.length) return null;

    var total = data.tarefas.length;
    var bags = loadBags();
    var bag = bags[dimId];
    if (!Array.isArray(bag) || !bag.length ||
        bag.some(function (i) { return i >= total; })) {
      bag = shuffle(Array.from({ length: total }, function (_, i) { return i; }));
    }
    var idx = bag.pop();
    bags[dimId] = bag;
    saveBags(bags);

    return { tarefa: data.tarefas[idx], restantes: bag.length, total: total };
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

  function stopBreath() {
    if (breathCtl) {
      breathCtl.stop();
      breathCtl = null;
    }
    guideEl.hidden = true;
  }

  function openPractice(dim) {
    stopBreath();
    var result = drawTask(dim.id);
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

      if (t.anim && window.BreathGuide) {
        breathCtl = window.BreathGuide.mount(guideEl, t.anim);
      }
    }

    currentDim = dim;
    iconEl.innerHTML = ICONS[dim.id];
    sheetEl.style.setProperty("--accent", dim.accent);
    dimEl.textContent = dim.titulo;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closePractice() {
    stopBreath();
    overlay.hidden = true;
    document.body.style.overflow = "";
    currentDim = null;
  }

  document.getElementById("close-btn").addEventListener("click", closePractice);
  document.getElementById("done-btn").addEventListener("click", closePractice);
  document.getElementById("another-btn").addEventListener("click", function () {
    if (currentDim) openPractice(currentDim);
  });
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePractice();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) closePractice();
  });
})();
