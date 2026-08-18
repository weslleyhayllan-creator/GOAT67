/* Interactions: modals, quiz, theme toggle, mobile menu, smooth scroll, back-to-top, reveal */
document.addEventListener('DOMContentLoaded', function(){
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  const themeToggle = document.getElementById('themeToggle');
  const openQuiz = document.getElementById('openQuiz');
  const quizDialog = document.getElementById('quiz');

  // Mobile menu
  menuToggle && menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });

  // Theme toggle (light/dark)
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('jornal-theme');
  if(savedTheme) root.setAttribute('data-theme', savedTheme);
  themeToggle && themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    if(next === 'dark') root.setAttribute('data-theme','dark'); else root.removeAttribute('data-theme');
    localStorage.setItem('jornal-theme', next);
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

  // Modals for cards using <dialog>
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      const dialog = document.getElementById(id);
      if(dialog && typeof dialog.showModal === 'function'){
        dialog.showModal();
        dialog.removeAttribute('aria-hidden');
      }
    });
  });
  // close buttons
  document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', (e) => {
    const dlg = e.target.closest('dialog');
    if(dlg) dlg.close();
  }));

  // Quiz open
  openQuiz && openQuiz.addEventListener('click', () => {
    if(quizDialog && typeof quizDialog.showModal === 'function'){
      quizDialog.showModal();
      quizDialog.removeAttribute('aria-hidden');
    }
  });

  // Quiz submit
  const quizForm = document.getElementById('quizForm');
  const quizResult = document.getElementById('quizResult');
  if(quizForm){
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = new FormData(quizForm);
      let score = 0;
      if(form.get('q1') === '1943') score++;
      if(form.get('q2') === 'normas') score++;
      if(form.get('q3') === 'treinamento') score++;
      quizResult.textContent = `Acertou ${score} de 3`;
    });
  }

  // Reveal on scroll
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('reveal');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});

  document.querySelectorAll('.card, .cover, .final-box, .section-header').forEach(el => {
    el.classList.add('pre-reveal');
    revealObserver.observe(el);
  });

  // Accessibility: close dialogs on Escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      document.querySelectorAll('dialog').forEach(d => { if(d.open) d.close(); });
    }
  });

});
