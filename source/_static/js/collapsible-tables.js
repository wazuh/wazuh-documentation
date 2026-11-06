/**
 * Wazuh documentation: search box for pages whose tables start collapsed under
 * their headings. The collapsible-tables Sphinx extension adds this file. It does
 * nothing on pages without tables marked as table.collapsible-table.
 */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); } else { document.addEventListener('DOMContentLoaded', fn); }
  }

  // Every table starts collapsed. While the theme's accordions.js sets up the
  // accordions, it opens each one whose section id appears anywhere in the page
  // URL. Until the setup ends, only the table that the URL fragment points to
  // (#id) can open.
  var settingUp = true;
  var afterSetup = [];
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
    if (done || tries > 40) { settingUp = false; afterSetup.forEach(function (fn) { fn(); }); } else { window.setTimeout(function () { endSetup(tries + 1); }, 50); }
  }
  ready(function () { window.setTimeout(function () { endSetup(0); }, 50); });

  ready(function () {
    var tables = Array.prototype.slice.call(document.querySelectorAll('table.collapsible-table'));
    if (!tables.length) { return; }
    var meta = document.querySelector('meta[name="collapsible-tables-noun"]');
    var noun = meta ? meta.getAttribute('content') : 'rows';

    var rows = [];
    tables.forEach(function (table) {
      Array.prototype.forEach.call(table.tBodies[0].rows, function (row) {
        rows.push({ row: row, text: row.textContent.replace(/\s+/g, ' ').toLowerCase() });
      });
    });

    var bar = document.createElement('div');
    bar.className = 'collapsible-tables-search';
    bar.innerHTML =
      '<input type="search" class="ct-q" aria-label="Search ' + noun + '" placeholder="Search ' + rows.length + ' ' + noun + '">' +
      '<button type="button" class="ct-expand">Expand all</button>' +
      '<button type="button" class="ct-collapse">Collapse all</button>' +
      '<span class="ct-count" aria-live="polite"></span>';

    var style = document.createElement('style');
    style.textContent =
      '.collapsible-tables-search{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 0;margin:12px 0;border-bottom:1px solid rgba(128,128,128,.35)}' +
      // Form controls follow the theme's light or dark mode, not the browser's
      '.light-theme .collapsible-tables-search{color-scheme:light}' +
      '.dark-theme .collapsible-tables-search{color-scheme:dark}' +
      '.collapsible-tables-search input{flex:1;min-width:220px;padding:6px 10px}' +
      '.collapsible-tables-search .ct-count{margin-left:auto;font-size:.9em;opacity:.75}';
    document.head.appendChild(style);

    // The bar goes above the first section that has a table.
    var anchor = tables[0].closest('section');
    anchor.parentNode.insertBefore(bar, anchor);

    var q = bar.querySelector('.ct-q'), count = bar.querySelector('.ct-count');

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
      var shown = 0;
      rows.forEach(function (r) {
        var ok = !text || r.text.indexOf(text) > -1;
        r.row.style.display = ok ? '' : 'none';
        if (ok) { shown++; }
      });
      tables.forEach(function (table) {
        var section = table.closest('section');
        var any = Array.prototype.some.call(table.tBodies[0].rows, function (row) { return row.style.display !== 'none'; });
        section.style.display = text && !any ? 'none' : '';
        if (text) { setOpen(section, any); }
      });
      count.textContent = text ? shown + ' of ' + rows.length + ' ' + noun + ' match' : rows.length + ' ' + noun;
    }

    // A link to a section by any of its anchors (a label such as
    // helper_functions_filter, or a jump list) opens the table it leads to.
    // accordions.js opens only the section whose own id is in the URL.
    function openForHash() {
      var id = decodeURIComponent(window.location.hash.slice(1));
      var target = id && document.getElementById(id);
      // A label before a heading is an empty element inside its section
      var section = target && (target.tagName === 'SECTION' ? target : target.closest('section'));
      for (; section; section = section.parentElement && section.parentElement.closest('section')) {
        setOpen(section, true);
      }
    }
    window.addEventListener('hashchange', openForHash);
    if (settingUp) { afterSetup.push(openForHash); } else { openForHash(); }

    q.addEventListener('input', run);
    bar.querySelector('.ct-expand').addEventListener('click', function () {
      tables.forEach(function (t) { setOpen(t.closest('section'), true); });
    });
    bar.querySelector('.ct-collapse').addEventListener('click', function () {
      tables.forEach(function (t) { setOpen(t.closest('section'), false); });
    });
    run();
  });
})();
