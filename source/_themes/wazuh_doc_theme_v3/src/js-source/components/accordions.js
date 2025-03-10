/**
 * --------------------------------------------------------------------------
 * Wazuh documentation (v3.0): accordions.js
 * --------------------------------------------------------------------------
 */

$(function() {
  const accordions = document.getElementsByClassName('accordion-section');

  for (let j = 0; j < accordions.length; j++) {
    const accordionTitle = accordions[j].previousElementSibling;
    const accordionBody = accordions[j];
    const sectionId = accordions[j].parentElement.getAttribute('id') + '-accordion';
    const accordionParent = accordions[j].parentElement;
    let collapsed = 'collapsed';
    let show = '';
    let aria = false;

    if (accordions[j].classList.contains('open')) {
      collapsed = '';
      show = ' show';
      aria = true;
    }

    accordionParent.classList.add('accordion-parent');

    setAccordionAttributes(accordionTitle, {
      'data-bs-toggle': 'collapse',
      'href': '#' + sectionId,
      'role': 'button',
      'aria-expanded': aria,
      'aria-controls': sectionId,
      'class': 'accordion-title ' + collapsed,
    });

    setAccordionAttributes(accordionBody, {
      'class': 'accordion-section accordion collapse' + show,
      'id': sectionId,
    });

    /* Stop propagation when clicking the header link */
    const urlIcon = accordionTitle.getElementsByClassName('headerlink')[0];
    urlIcon.addEventListener('click', function(e) {
      if (accordionBody.classList.contains('show')) {
        e.stopPropagation();
      }
    });

    if (window.location.href.indexOf(accordionParent.getAttribute('id')) > -1 && accordionTitle.classList.contains('collapsed')) {
      accordionTitle.click();
    }
  }

  /**
   * Set the defined attributes ta a especific HTML element.
   * @param {DOM} element  HTML to which the attributes must be applied
   * @param {array} attrs  Associative array with the pairs attriute-value to apply.
   */
  function setAccordionAttributes(element, attrs) {
    for (const key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key)) {
        element.setAttribute(key, attrs[key]);
      }
    }
  }
});
