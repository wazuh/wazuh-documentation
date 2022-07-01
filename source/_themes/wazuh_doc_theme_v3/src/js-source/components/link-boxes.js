/**
 * --------------------------------------------------------------------------
 * Wazuh documentation (v3.0): link-boxes.js
 * --------------------------------------------------------------------------
 */

$(function() {
  $('.link-boxes-group[data-step]').each(function() {
    const group = $(this);
    const steps = group.find('.link-boxes-item').length;
    const current = parseInt($(this).data('step'));
    const stepsLine = $(document.createElement('div')).addClass('steps-line');
    let stepNumber = null;
    let status = current ? 'past-step' : 'future-step';
    // group.children().eq(current-1).addClass('current-step');
    for (let i = 1; i <= steps; i++) {
      stepNumber = $(document.createElement('div')).text(i).addClass('steps-number');
      if ( i == current ) {
        stepNumber.addClass('current-step');
        status = 'future-step';
      } else {
        stepNumber.addClass(status);
      }
      stepsLine.append(stepNumber);
      group.children().eq(i-1).addClass(current == i ? 'current-step' : status);
    }
    group.prepend(stepsLine);
  });
});
