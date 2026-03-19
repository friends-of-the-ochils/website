(function () {
  /* ── Hamburger toggle ── */
  var btn  = document.querySelector('.hamburger');
  var menu = document.getElementById('main-menu-list');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  /* ── Mobile sub-menu: first tap opens, second tap navigates ── */
  document.querySelectorAll('nav.main-nav .has-children > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        var li = this.parentElement;
        if (!li.classList.contains('open')) {
          e.preventDefault();          // first tap — expand only
          li.classList.add('open');
          // collapse any sibling submenus
          var siblings = li.parentElement.children;
          for (var i = 0; i < siblings.length; i++) {
            if (siblings[i] !== li) siblings[i].classList.remove('open');
          }
        }
        // second tap — let the browser follow the link normally
      }
    });
  });

  /* ── Close menu when a leaf link is tapped ── */
  document.querySelectorAll('nav.main-nav a:not(.has-children > a)').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();
