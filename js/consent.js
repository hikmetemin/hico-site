/* Cookie consent + Google tag loader (KVKK).
   The Google tag is NOT loaded until the visitor clicks "Kabul Et". Choice is remembered in localStorage. */
(function () {
  var TAG = 'AW-18466505324';
  var GA4_ID = 'G-B8MX2FDF9X';
  var KEY = 'hico_consent_v1';

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadTag() {
    if (window.__hicoTag) return;
    window.__hicoTag = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', TAG);
    window.gtag('config', GA4_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + TAG;
    document.head.appendChild(s);
  }

  function clearGoogleCookies() {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (/^(_ga|_gid|_gcl|_gac|IDE|test_cookie)/.test(n)) {
        [location.hostname, '.' + host, host].forEach(function (d) {
          document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d;
        });
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      }
    });
  }

  function closeBanner() {
    var b = document.getElementById('cookie-banner');
    if (b && b.parentNode) b.parentNode.removeChild(b);
  }

  function showBanner() {
    closeBanner();
    var b = document.createElement('div');
    b.id = 'cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Çerez tercihleri');
    b.innerHTML =
      '<p>Reklam ve ölçüm için Google çerezleri kullanıyoruz. Onay vermezseniz bu çerezler kullanılmaz ve site aynen çalışır. ' +
      '<a href="/gizlilik.html#cerezler">Ayrıntılar</a></p>' +
      '<div class="cb-actions">' +
      '<button type="button" class="cb-accept">Kabul Et</button>' +
      '<button type="button" class="cb-reject">Reddet</button>' +
      '</div>';
    b.querySelector('.cb-accept').addEventListener('click', function () {
      write('granted'); closeBanner(); loadTag();
    });
    b.querySelector('.cb-reject').addEventListener('click', function () {
      var was = read();
      write('denied'); closeBanner();
      if (was === 'granted') { clearGoogleCookies(); location.reload(); }
    });
    document.body.appendChild(b);
    b.querySelector('.cb-accept').focus();
  }

  var state = read();
  if (state === 'granted') { loadTag(); }
  function init() {
    if (state !== 'granted' && state !== 'denied') { showBanner(); }
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.closest && t.closest('[data-cookie-settings]')) { e.preventDefault(); showBanner(); }
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }

  /* click events for phone / WhatsApp (only sent if the tag was loaded with consent) */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || typeof window.gtag !== 'function') return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('tel:') === 0) { window.gtag('event', 'phone_click'); }
    else if (h.indexOf('wa.me') > -1) { window.gtag('event', 'whatsapp_click'); }
  }, true);
})();
