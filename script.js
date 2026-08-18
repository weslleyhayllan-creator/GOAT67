// Script simples: menu mobile, smooth scroll, back-to-top
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
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile menu
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
    if(window.scrollY > 400){
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });
  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // Small reveal on scroll (cards)
  const reveal = (entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
        obs.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(reveal, {threshold:0.12});
  document.querySelectorAll('.card').forEach(c => {
    c.style.transform = 'translateY(18px)';
    c.style.opacity = '0';
    c.style.transition = 'all .6s cubic-bezier(.2,.9,.2,1)';
    observer.observe(c);
  });
});
