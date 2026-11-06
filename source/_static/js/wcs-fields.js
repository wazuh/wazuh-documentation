/**
 * Wazuh documentation: search and filter bar for the WCS field tables.
 * The wcs-fields Sphinx extension adds this file. It does nothing on pages
 * without WCS field tables (table.wcs-fields).
 */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); } else { document.addEventListener('DOMContentLoaded', fn); }
  }

  function cellText(row, index) {
    var cell = row.cells[index];
    return cell ? cell.textContent.trim() : '';
  }

  // Every table starts collapsed. While the theme's accordions.js sets up the
  // accordions, it opens each one whose section id appears anywhere in the page
  // URL, and ids such as "wazuh", "threat", or "process" always do. Until the
  // setup ends, only the table that the URL fragment points to (#id) can open.
  var settingUp = true;
  document.addEventListener('show.bs.collapse', function (e) {
    if (!settingUp || !e.target.classList.contains('accordion-section')) { return; }
    var id = decodeURIComponent(window.location.hash.slice(1));
    var target = id && document.getElementById(id);
    if (!(target && e.target.parentElement.contains(target))) { e.preventDefault(); }
  });
  // The setup has ended once the theme has given every accordion its id.
  function endSetup(tries) {
    var bodies = document.querySelectorAll('.accordion-section');
    var done = Array.prototype.every.call(bodies, function (b) { return /-accordion$/.test(b.id); });
    if (done || tries > 40) { settingUp = false; } else { window.setTimeout(function () { endSetup(tries + 1); }, 50); }
  }
  ready(function () { window.setTimeout(function () { endSetup(0); }, 50); });

  ready(function () {
    var tables = Array.prototype.slice.call(document.querySelectorAll('table.wcs-fields'));
    if (!tables.length) { return; }

    // Columns: Field, Type, Level, Normalization, Indexed, Example, Description
    var rows = [];
    tables.forEach(function (table) {
      Array.prototype.forEach.call(table.tBodies[0].rows, function (row) {
        rows.push({
          row: row,
          table: table,
          text: (cellText(row, 0) + ' ' + cellText(row, 6)).toLowerCase(),
          type: cellText(row, 1),
          level: cellText(row, 2),
          indexed: cellText(row, 4)
        });
      });
    });

    function options(values, labels) {
      return '<option value="">All</option>' + values.map(function (value) {
        return '<option value="' + value + '">' + (labels && labels[value] ? labels[value] : value) + '</option>';
      }).join('');
    }
    function unique(key) {
      return rows.map(function (r) { return r[key]; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; }).sort();
    }

    var bar = document.createElement('div');
    bar.className = 'wcs-fields-filter';
    bar.innerHTML =
      '<input type="search" class="wcs-q" placeholder="Search ' + rows.length + ' fields by name or description">' +
      '<label>Type <select class="wcs-type">' + options(unique('type')) + '</select></label>' +
      '<label>Level <select class="wcs-level">' + options(['core', 'extended', 'custom'], { core: 'core (most used)', custom: 'custom (WCS)' }) + '</select></label>' +
      '<label>Indexed <select class="wcs-indexed">' + options(['true', 'false']) + '</select></label>' +
      '<button type="button" class="wcs-expand">Expand all</button>' +
      '<button type="button" class="wcs-collapse">Collapse all</button>' +
      '<span class="wcs-count"></span>';

    var style = document.createElement('style');
    style.textContent =
      '.wcs-fields-filter{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 0;margin:12px 0;border-bottom:1px solid rgba(128,128,128,.35)}' +
      // Form controls follow the theme's light or dark mode, not the browser's
      '.light-theme .wcs-fields-filter{color-scheme:light}' +
      '.dark-theme .wcs-fields-filter{color-scheme:dark}' +
      '.wcs-fields-filter input{flex:1;min-width:220px;padding:6px 10px}' +
      '.wcs-fields-filter label{margin:0;font-size:.9em}' +
      '.wcs-fields-filter .wcs-count{margin-left:auto;font-size:.9em;opacity:.75}';
    document.head.appendChild(style);

    // The bar goes above the first field table section on the page.
    var first = tables[0];
    var anchor = first.closest('section') || first;
    anchor.parentNode.insertBefore(bar, anchor);

    var q = bar.querySelector('.wcs-q'), type = bar.querySelector('.wcs-type'),
        level = bar.querySelector('.wcs-level'), indexed = bar.querySelector('.wcs-indexed'),
        count = bar.querySelector('.wcs-count');

    // Theme accordions: a .accordion-section after the heading, opened with the "show" class.
    function setOpen(section, open) {
      var body = section.querySelector(':scope > .accordion-section');
      if (!body) { return; }
      body.classList.toggle('show', open);
      var title = body.previousElementSibling;
      if (title) { title.classList.toggle('collapsed', !open); title.setAttribute('aria-expanded', open); }
    }

    function run() {
      var text = q.value.trim().toLowerCase();
      var active = text || type.value || level.value || indexed.value;
      var shown = 0;
      rows.forEach(function (r) {
        var ok = (!text || r.text.indexOf(text) > -1) && (!type.value || r.type === type.value) &&
                 (!level.value || r.level === level.value) && (!indexed.value || r.indexed === indexed.value);
        r.row.style.display = ok ? '' : 'none';
        if (ok) { shown++; }
      });
      tables.forEach(function (table) {
        var section = table.closest('section');
        if (!section) { return; }
        var any = Array.prototype.some.call(table.tBodies[0].rows, function (row) { return row.style.display !== 'none'; });
        section.style.display = active && !any ? 'none' : '';
        if (active) { setOpen(section, any); }
      });
      count.textContent = active ? shown + ' of ' + rows.length + ' fields match' : rows.length + ' fields';
    }

    [q].forEach(function (el) { el.addEventListener('input', run); });
    [type, level, indexed].forEach(function (el) { el.addEventListener('change', run); });
    bar.querySelector('.wcs-expand').addEventListener('click', function () {
      tables.forEach(function (t) { var s = t.closest('section'); if (s) { setOpen(s, true); } });
    });
    bar.querySelector('.wcs-collapse').addEventListener('click', function () {
      tables.forEach(function (t) { var s = t.closest('section'); if (s) { setOpen(s, false); } });
    });
    run();
  });
})();
