// Interactions: mobile menu, smooth scroll, back-to-top, reveal animations
document.addEventListener('DOMContentLoaded', function(){
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');

  menuToggle && menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(!href || href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        if(navList.classList.contains('show')){
          navList.classList.remove('show');
          menuToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // Back to top
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 360){
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });
  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('reveal');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});

  document.querySelectorAll('.card, .cover, .final-box').forEach(el => {
    el.classList.add('pre-reveal');
    observer.observe(el);
  });

  // Basic accessibility: close mobile menu on Escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && navList.classList.contains('show')){
      navList.classList.remove('show');
      menuToggle.setAttribute('aria-expanded','false');
    }
  });

});
