
// Simple JS for smooth scrolling and future enhancements
document.addEventListener('DOMContentLoaded', () => {
  const tbtn = document.getElementById('themeToggle');
  if (!tbtn) return;

  // initialize text
  tbtn.textContent = document.body.classList.contains('light-mode') ? 'Dark' : 'Light';
  tbtn.setAttribute('aria-pressed', String(document.body.classList.contains('light-mode')));

  tbtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    tbtn.textContent = isLight ? 'Dark' : 'Light';
    tbtn.setAttribute('aria-pressed', String(isLight));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // project expand/collapse
  const toggles = document.querySelectorAll('.project-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const job = btn.closest('.job');
      const details = job.querySelector('.project-details');

      // toggle open class
      const willOpen = !job.classList.contains('open');
      job.classList.toggle('open', willOpen);

      // accessibility attrs
      btn.setAttribute('aria-expanded', String(willOpen));
      details.setAttribute('aria-hidden', String(!willOpen));
    });

    // allow keyboard toggle (Enter/Space) since button handles it by default; no extra required
  });
});
