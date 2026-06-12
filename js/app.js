(function () {
  "use strict";

  var DIMENSIONS = [
    {
      id: "visualizacao",
      titulo: "Visualização",
      emoji: "🌅",
      desc: "Imagine cenas que acalmam e fortalecem a mente.",
      grad: "linear-gradient(135deg, #f6a26b, #e2666f)"
    },
    {
      id: "gratidao",
      titulo: "Gratidão",
      emoji: "🙏",
      desc: "Treine o olhar para o que já é presente na sua vida.",
      grad: "linear-gradient(135deg, #e8b339, #d97836)"
    },
    {
      id: "respiracao",
      titulo: "Respiração",
      emoji: "🌬️",
      desc: "Use o fôlego para acalmar corpo e coração em minutos.",
      grad: "linear-gradient(135deg, #5fb8c9, #3e7fb0)"
    },
    {
      id: "movimentos",
      titulo: "Movimentos que curam",
      emoji: "🌿",
      desc: "Gestos suaves que soltam a tensão e despertam energia.",
      grad: "linear-gradient(135deg, #7fbf6e, #3f8f63)"
    },
    {
      id: "contemplacao",
      titulo: "Contemplação",
      emoji: "🕊️",
      desc: "Pare e descanse o olhar na beleza, sem pressa.",
      grad: "linear-gradient(135deg, #9d8fd8, #5f5aa8)"
    },
    {
      id: "musicas",
      titulo: "Músicas",
      emoji: "🎵",
      desc: "Som, canto e ritmo como remédio para a alma.",
      grad: "linear-gradient(135deg, #e08bb6, #a4509a)"
    },
    {
      id: "humor",
      titulo: "Senso de humor",
      emoji: "😄",
      desc: "Leveza e riso para arejar a mente.",
      grad: "linear-gradient(135deg, #f3c84e, #ec8f3e)"
    },
    {
      id: "bondade",
      titulo: "Fazer o bem",
      emoji: "💛",
      desc: "Saia de si: um gesto de amor por alguém, agora.",
      grad: "linear-gradient(135deg, #e57e6a, #b94a5e)"
    }
  ];

  var STORAGE_KEY = "presente-bag-v1";
  var currentDim = null;

  // Sorteio sem repetição: mantém um "saco" embaralhado de índices por
  // dimensão no localStorage; só repete depois de passar pelas 100.
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
    if (!Array.isArray(bag) || !bag.length) {
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
  var emojiEl = document.getElementById("practice-emoji");
  var dimEl = document.getElementById("practice-dim");
  var textEl = document.getElementById("practice-text");
  var whyEl = document.getElementById("practice-why");
  var countEl = document.getElementById("practice-count");
  var imgWrap = document.getElementById("practice-img-wrap");
  var imgEl = document.getElementById("practice-img");

  DIMENSIONS.forEach(function (dim) {
    var btn = document.createElement("button");
    btn.className = "card";
    btn.style.background = dim.grad;
    btn.innerHTML =
      '<span class="card-emoji">' + dim.emoji + "</span>" +
      '<span class="card-title">' + dim.titulo + "</span>" +
      '<span class="card-desc">' + dim.desc + "</span>";
    btn.addEventListener("click", function () { openPractice(dim); });
    cardsEl.appendChild(btn);
  });

  function openPractice(dim) {
    var result = drawTask(dim.id);
    if (!result) {
      textEl.textContent = "As práticas desta dimensão ainda não foram carregadas. Tente recarregar a página.";
      whyEl.hidden = true;
      countEl.textContent = "";
      imgWrap.hidden = true;
    } else {
      var t = result.tarefa;
      textEl.textContent = t.t;
      whyEl.hidden = !t.f;
      whyEl.textContent = t.f || "";
      countEl.textContent =
        "Prática " + (result.total - result.restantes) + " de " + result.total + " desta rodada";

      if (t.img) {
        imgEl.src = "https://picsum.photos/seed/" + encodeURIComponent(t.img) + "/800/500";
        imgWrap.hidden = false;
      } else {
        imgWrap.hidden = true;
        imgEl.removeAttribute("src");
      }
    }

    currentDim = dim;
    emojiEl.textContent = dim.emoji;
    dimEl.textContent = dim.titulo;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closePractice() {
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
