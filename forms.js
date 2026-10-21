/* Website forms (contact + membership): spam-trap timing, inline submit, thank-you message. */
(function () {
  document.querySelectorAll('form[data-foto-form]').forEach(function (form) {
    var ts = form.querySelector('input[name="ts"]');
    if (ts) ts.value = Date.now();

    var success = form.querySelector('.form-success');
    var error = form.querySelector('.form-error');
    var button = form.querySelector('button[type="submit"]');

    function showSuccess() {
      if (!success) return;
      Array.prototype.forEach.call(form.children, function (el) {
        if (el !== success) el.style.display = 'none';
      });
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (/[?&]thanks=1/.test(location.search)) showSuccess();

    form.addEventListener('submit', function (e) {
      if (!window.fetch) return; // old browsers: plain POST, server redirects to ?thanks=1
      e.preventDefault();
      if (error) error.style.display = 'none';
      button.disabled = true;
      var label = button.textContent;
      button.textContent = 'Sending…';

      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.ok) { showSuccess(); return; }
          throw new Error(data.message);
        })
        .catch(function (err) {
          if (error) {
            error.textContent = (err && err.message) || 'Sorry, something went wrong. Please try again.';
            error.style.display = 'block';
          }
          button.disabled = false;
          button.textContent = label;
          if (window.turnstile) window.turnstile.reset();
        });
    });
  });
})();
