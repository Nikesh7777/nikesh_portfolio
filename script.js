document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('interestForm');
  const input = document.getElementById('interestInput');
  const errorMsg = document.getElementById('errorMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const value = input.value.trim().toLowerCase();

    if (value === 'hired') {
      Swal.fire({
        title: "Are you sure about hiring me?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Really sure?Think twice!",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No"
          }).then((finalResult) => {
            if (finalResult.isConfirmed) {
              // Fade-out and redirect to profile.html
              document.body.style.transition = 'opacity 0.8s ease';
              document.body.style.opacity = 0;
              setTimeout(() => {
                window.location.href = 'profile.html';
              }, 800);
            } else {
              // If second prompt "No" → show 100 alerts
              for (let i = 0; i < 1; i++) {
                alert("Thank you for your consideration.");
              }
            }
          });
        } else {
          // If first prompt "No" → show 50 alerts
          for (let i = 0; i < 1; i++) {
            alert("Thank you for your consideration.");
          }
        }
      });
    } else {
      // Validation message
      errorMsg.textContent = "Please type 'hired' to proceed.";
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 500);
    }
  });
});
