// script.js — interatividade leve

document.addEventListener('DOMContentLoaded',function(){
  // Back to top button
  const btn = document.getElementById('btnTop');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300) btn.style.display = 'flex';
    else btn.style.display = 'none';
  });
  btn.addEventListener('click', (e)=>{ e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Simple menu toggle for small screens
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menuBtn && menuBtn.addEventListener('click', ()=>{
    if(nav.style.display === 'flex') nav.style.display = 'none';
    else nav.style.display = 'flex';
  });

  // Hover effect for cards (subtle)
  document.querySelectorAll('.card.small').forEach(c=>{
    c.addEventListener('mouseenter', ()=> c.style.transform='translateY(-6px)');
    c.addEventListener('mouseleave', ()=> c.style.transform='translateY(0)');
    c.style.transition = 'transform 220ms ease';
  });
});
