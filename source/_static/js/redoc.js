function resizeIframe(obj) {
  obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
}

jQuery(function ($) {
  let iframe = $("iframe.redoc-container");
  /* Select the node that will be observed for mutations */
  const redocNode = iframe.contents().find("redoc")[0];
  /* Options for the observer (which mutations to observe) */
  const config = { childList: true };

  /* Callback function to execute when mutations are observed */
  const callback = function (mutationsList, observer) {
    console.log('Docu was loaded');
    resizeIframe(iframe[0]);
  };

  /* Create an observer instance linked to the callback function */
  const observer = new MutationObserver(callback);

  /* Start observing the target node for configured mutations */
  observer.observe(redocNode, config);

  resizeIframe(iframe[0]);
});
