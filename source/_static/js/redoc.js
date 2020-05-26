function resizeIframe(obj, height) {
  /*obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';*/
  obj.style.height = height;
}

jQuery(function ($) {
  let iframe = $("iframe.redoc-container");
  const redocNode = iframe.contents().find("redoc")[0];
  const leftMenu = iframe.contents().find(".scrollbar-container")[0];
  const height = leftMenu.scrollHeight + 'px';
  const config = { childList: true };
  
  const callback = function (mutationsList, observer) {
    resizeIframe(iframe[0], height);
  };

  /* Create an observer instance linked to the callback function */
  const observer = new MutationObserver(callback);

  /* Start observing the target node for configured mutations */
  observer.observe(redocNode, config);

  resizeIframe(iframe[0], height);
});
