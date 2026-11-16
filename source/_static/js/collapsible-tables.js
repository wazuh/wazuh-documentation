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
    // Collapsed sections without a table: the search matches their text. On a
    // page with no tables, each one is an item to search for.
    var textSections = Array.prototype.slice.call(document.querySelectorAll('section.collapsible-text'));
    if (!tables.length && !textSections.length) { return; }
    var byText = !tables.length;
    var meta = document.querySelector('meta[name="collapsible-tables-noun"]');
    var noun = meta ? meta.getAttribute('content') : 'rows';

    var rows = [];
    tables.forEach(function (table) {
      Array.prototype.forEach.call(table.tBodies[0].rows, function (row) {
        rows.push({ row: row, text: row.textContent.replace(/\s+/g, ' ').toLowerCase() });
      });
    });

    var total = byText ? textSections.length : rows.length;
    function button(label, cls) {
      return '<button type="button" class="table-filter-btn ' + cls + '" title="' + label + '">' +
        '<span class="table-filter-btn-text">' + label + '</span></button>';
    }

    // The theme styles the bar (wazuh_doc_theme_v3: components/_table-filter.scss).
    var bar = document.createElement('div');
    bar.className = 'table-filter collapsible-tables-search';
    bar.setAttribute('role', 'search');
    bar.setAttribute('aria-label', 'Search ' + noun);
    bar.innerHTML =
      '<label class="table-filter-field"><span class="table-filter-label">Search</span>' +
        '<span class="table-filter-search">' +
          '<input type="search" class="table-filter-input ct-q" placeholder="Search ' + total + ' ' + noun + '"' +
          ' aria-label="Search ' + noun + '">' +
          '<span class="table-filter-count ct-count" aria-live="polite"></span>' +
        '</span>' +
      '</label>' +
      '<div class="table-filter-actions">' +
        button('Expand all', 'table-filter-expand ct-expand') +
        button('Collapse all', 'table-filter-collapse ct-collapse') +
      '</div>';

    var allSections = tables.map(function (t) { return t.closest('section'); }).concat(textSections);

    // The bar goes above the first top-level group of sections that has a table,
    // since it searches every table on the page.
    var anchor = allSections[0];
    while (anchor.parentElement && anchor.parentElement.closest('section') &&
           anchor.parentElement.closest('section').parentElement.closest('section')) {
      anchor = anchor.parentElement.closest('section');
    }
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
      var matched = 0;
      textSections.forEach(function (section) {
        var ok = !text || section.textContent.toLowerCase().indexOf(text) > -1;
        section.style.display = ok ? '' : 'none';
        if (text) { setOpen(section, ok); }
        if (ok) { matched++; }
      });
      // A group of sections with no match left hides with its heading and text
      var groups = [];
      allSections.forEach(function (section) {
        var group = section.parentElement && section.parentElement.closest('section');
        if (group && groups.indexOf(group) < 0 && group.parentElement.closest('section')) { groups.push(group); }
      });
      groups.forEach(function (group) {
        var any = allSections.some(function (s) { return group.contains(s) && s.style.display !== 'none'; });
        group.style.display = text && !any ? 'none' : '';
      });
      if (byText) { shown = matched; }
      // The placeholder gives the total until a search is typed; then the count
      // takes over and the placeholder gets shorter to leave it room.
      count.innerHTML = text ? shown + ' of ' + total + '<span class="visually-hidden"> ' + noun + ' match</span>' : '';
      q.placeholder = text ? 'Search' : 'Search ' + total + ' ' + noun;
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
      allSections.forEach(function (section) { setOpen(section, true); });
    });
    bar.querySelector('.ct-collapse').addEventListener('click', function () {
      allSections.forEach(function (section) { setOpen(section, false); });
    });
    run();
  });
})();
