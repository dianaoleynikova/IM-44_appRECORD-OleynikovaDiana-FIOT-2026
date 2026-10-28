/* Показ розділів звіту однієї лабораторної + живі приклади */
(function () {
  var parts = [].slice.call(document.querySelectorAll('.part'));
  var first = parts.length ? parts[0].id.slice(2) : '';

  function fit(f) {
    try {
      var d = f.contentDocument;
      if (d && d.documentElement && f.offsetParent !== null) {
        f.style.height = (d.documentElement.scrollHeight + 4) + 'px';
      }
    } catch (e) {}
  }
  function fitVisible() {
    [].slice.call(document.querySelectorAll('iframe.live')).forEach(fit);
  }

  // Живий результат: HTML і CSS беруться з блоків коду, що показані на сторінці
  [].slice.call(document.querySelectorAll('.ex')).forEach(function (ex) {
    var h = ex.querySelector('pre[data-code="html"]');
    var c = ex.querySelector('pre[data-code="css"]');
    var f = ex.querySelector('iframe.live');
    if (!h || !f) return;
    var html = h.textContent.replace(/<link[^>]*>/gi, '');
    var style = c ? '<style>' + c.textContent + '<\/style>' : '';
    f.srcdoc = '<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8"></head><body>' + style + html + '<\/body><\/html>';
    f.addEventListener('load', function () { fit(f); });
  });

  function show() {
    var h = location.hash.replace('#', '');
    if (!document.getElementById('p-' + h)) h = first;
    parts.forEach(function (p) { p.hidden = p.id !== 'p-' + h; });
    window.scrollTo(0, 0);
    fitVisible();
  }
  window.addEventListener('hashchange', show);
  window.addEventListener('resize', fitVisible);
  show();
})();
