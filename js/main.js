document.addEventListener('DOMContentLoaded',function(){
  const navToggle=document.getElementById('navToggle');
  const siteNav=document.getElementById('siteNav');
  const siteHeader=document.querySelector('.site-header');
  const logo=document.querySelector('.logo');
  
  navToggle.addEventListener('click',()=>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });

  // Navbar scroll effect
  window.addEventListener('scroll',function(){
    if(window.scrollY > 100) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // Rotating name in navbar
  const names = ['tahir_dars', 'Muhammad Tahir', 'Dars Ali'];
  let nameIndex = 0;
  
  if(logo) {
    setInterval(function(){
      logo.textContent = names[nameIndex];
      nameIndex = (nameIndex + 1) % names.length;
    }, 1500);
  }

  // Scroll effect for left side details
  const detailsEl = document.getElementById('details');
  const details2El = document.getElementById('details2');
  const heroRight = document.querySelector('.hero-right');
  
  if(detailsEl && heroRight) {
    heroRight.addEventListener('scroll', function() {
      const scrollY = this.scrollTop;
      const maxScroll = 300;
      const progress = Math.min(scrollY / maxScroll, 1);
      
      // Apply effect to first details line
      const translateX = -progress * 40; // Move left max 40px
      const scale = 1 - progress * 0.1; // Shrink by 10%
      const boldIncrease = progress * 200; // Increase font-weight
      
      detailsEl.style.transform = `translateX(${translateX}px) scaleX(${scale})`;
      detailsEl.style.fontWeight = Math.min(400 + boldIncrease, 700);
      detailsEl.style.transformOrigin = 'left center';
      
      // Apply effect to second details line with slight delay
      const delayedProgress = Math.max(0, progress - 0.1);
      const translate2X = -delayedProgress * 50;
      const scale2 = 1 - delayedProgress * 0.15;
      const bold2Increase = delayedProgress * 250;
      
      details2El.style.transform = `translateX(${translate2X}px) scaleX(${scale2})`;
      details2El.style.fontWeight = Math.min(400 + bold2Increase, 700);
      details2El.style.transformOrigin = 'left center';
    });
  }
});

