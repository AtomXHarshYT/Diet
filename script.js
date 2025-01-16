document.addEventListener('DOMContentLoaded', function () {
  const journeyButton = document.querySelector('.journey-button');
  const boxesContainer = document.querySelector('.boxes-container');
  const boxContent = document.querySelector('.box-content');
  const begin_Gym = document.querySelector('#begin-button');

  begin_Gym.addEventListener('click', function () {
    window.location.href = 'begin_Gym.html';
  });

  journeyButton.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
      document.body.classList.add('show-overlay');
      boxContent.style.display = 'none';

      // Trigger reflow to ensure the transition works
      boxesContainer.offsetHeight;

      boxesContainer.classList.add('show-boxes-mobile');

      // Set opacity to 1 after a short delay to ensure the transition is visible
      setTimeout(() => {
        boxesContainer.style.opacity = '1';
      }, 50);
    }
  });

  // Close pop-up when clicking outside
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('show-overlay')) {
      closePopup();
    }
  });

  function closePopup() {
    boxesContainer.style.opacity = '0';
    boxesContainer.style.transform = 'translate(-50%, -50%) scale(0.9)';

    setTimeout(() => {
      boxesContainer.classList.remove('show-boxes-mobile');
      document.body.classList.remove('show-overlay');
      boxContent.style.display = 'block';

      // Reset transform after transition
      boxesContainer.style.transform = '';
    }, 300); // Match this delay with the CSS transition duration
  }

  const contactButton = document.querySelector('.contact-button');
  const contactPopup = document.createElement('div');
  contactPopup.className = 'contact-popup';
  contactPopup.innerHTML = `
        <div class="contact-popup-content">
            <button class="close-popup">&times;</button>
            <h2>Contact Us</h2>
            <p>Call us at:</p>
            <a href="tel:+919737505508" class="phone-number">+91 97375 05508</a><br>
            <a href="tel:+919662825285" class="phone-number">+91 96628 25285</a>
        </div>
    `;
  document.body.appendChild(contactPopup);

  contactButton.addEventListener('click', function () {
    contactPopup.classList.add('show-popup');
    document.body.classList.add('show-overlay');
  });

  const closePopupButton = contactPopup.querySelector('.close-popup');
  closePopupButton.addEventListener('click', function () {
    closeContactPopup();
  });

  function closeContactPopup() {
    contactPopup.classList.remove('show-popup');
    document.body.classList.remove('show-overlay');
  }

  // Close pop-up when clicking outside
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('show-overlay')) {
      closePopup();
      closeContactPopup();
    }
  });
});