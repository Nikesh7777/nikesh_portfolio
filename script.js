
// Simple JS for smooth scrolling and future enhancements
document.addEventListener('DOMContentLoaded', () => {
  // simple scroll reveal
  const items = document.querySelectorAll('.card, .job, .skills-category');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible','fade-up');
    });
  }, { threshold: 0.12 });
  items.forEach(i => io.observe(i));

  // optional theme toggle if you add a button with id themeToggle
  const tbtn = document.getElementById('themeToggle');
  if (tbtn) {
    tbtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      tbtn.textContent = document.body.classList.contains('light-mode') ? 'Dark' : 'Light';
    });
  }
});
