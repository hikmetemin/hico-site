/* Quote form (Web3Forms). Same-origin script so the page CSP can stay strict. */
(function () {
  var f = document.getElementById('teklif-form');
  if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var b = f.querySelector('button[type=submit]');
    var s = document.getElementById('form-status');
    var label = b.textContent;
    b.disabled = true;
    b.textContent = 'Gönderiliyor...';
    s.style.display = 'none';
    fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.success) throw new Error('rejected');
        if (typeof gtag === 'function') { gtag('event', 'generate_lead'); }
        if (typeof fbq === 'function') { fbq('track', 'Lead'); }
        window.location.href = '/tesekkurler.html';
      })
      .catch(function () {
        s.textContent = 'Bir sorun oluştu, lütfen doğrudan telefon veya e-posta ile ulaşın.';
        s.style.display = 'block';
        b.disabled = false;
        b.textContent = label;
      });
  });
})();
