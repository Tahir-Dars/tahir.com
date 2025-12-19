document.addEventListener('DOMContentLoaded',function(){
  const navToggle=document.getElementById('navToggle');
  const siteNav=document.getElementById('siteNav');
  navToggle.addEventListener('click',()=>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });
});
