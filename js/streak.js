/* Sequência (streak) — recompensa imediata, nunca punição.
 *
 * Guarda os dias em que a pessoa concluiu ao menos uma prática e calcula
 * quantos dias seguidos vêm até hoje. Só celebra; nunca cobra.
 *
 * Uso:
 *   Streak.record()  -> registra hoje, devolve o nº de dias seguidos
 *   Streak.count()   -> nº de dias seguidos terminando hoje (ou ontem)
 *   Streak.label(n)  -> texto pronto, ex.: "🔥 3 dias seguidos"
 */
(function () {
  "use strict";

  var KEY = "presente-streak";
  var DAY = 86400000; // ms em um dia

  // data local no formato AAAA-MM-DD (sem fuso atrapalhando)
  function dayStr(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var dd = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + dd;
  }

  function load() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(v) ? v : [];
    } catch (e) {
      return [];
    }
  }

  function save(days) {
    try { localStorage.setItem(KEY, JSON.stringify(days)); } catch (e) { /* ok */ }
  }

  // conta dias consecutivos a partir de um conjunto de strings de dia
  function streakFrom(daySet) {
    var today = new Date();
    var cursor = dayStr(today);
    // se hoje ainda não tem registro, a sequência pode terminar ontem
    if (!daySet[cursor]) {
      cursor = dayStr(new Date(today.getTime() - DAY));
      if (!daySet[cursor]) return 0;
    }
    var n = 0;
    var t = new Date(cursor + "T00:00:00");
    while (daySet[dayStr(t)]) {
      n++;
      t = new Date(t.getTime() - DAY);
    }
    return n;
  }

  function toSet(days) {
    var s = {};
    days.forEach(function (d) { s[d] = true; });
    return s;
  }

  function record() {
    var days = load();
    var today = dayStr(new Date());
    if (days.indexOf(today) === -1) {
      days.push(today);
      // mantém no máximo ~120 dias para não crescer sem limite
      if (days.length > 120) days = days.slice(days.length - 120);
      save(days);
    }
    return streakFrom(toSet(days));
  }

  function count() {
    return streakFrom(toSet(load()));
  }

  function label(n) {
    if (n == null) n = count();
    if (n <= 0) return "";
    return "🔥 " + n + (n === 1 ? " dia seguido" : " dias seguidos");
  }

  window.Streak = { record: record, count: count, label: label };
})();
