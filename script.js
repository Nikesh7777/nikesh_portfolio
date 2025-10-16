
// Simple JS for smooth scrolling and future enhancements
document.querySelectorAll('.nav a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const href = a.getAttribute('href');
    const target = document.querySelector(href);
    if(target){
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
