document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('interestForm');
  const input = document.getElementById('interestInput');
  const errorMsg = document.getElementById('errorMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const value = input.value.trim().toLowerCase();

    if (value === 'hired') {
      document.body.style.transition = 'opacity 0.8s ease';
      document.body.style.opacity = 0;

      setTimeout(() => {
        window.location.href = 'profile.html';
      }, 800);
    } else {
      errorMsg.textContent = "Please type 'hired' to proceed.";
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 500);
    }
  });
});
