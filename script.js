document.addEventListener('DOMContentLoaded', function () {
  const journeyButton = document.querySelector('.journey-button');
  const boxesContainer = document.querySelector('.boxes-container');
  const boxContent = document.querySelector('.box-content');
  const begin_Gym = document.querySelector('#begin-button');
  const inter_Gym = document.querySelector('#inter-button');
  const weight_Gain = document.querySelector('#weight-gain-button');
  const weight_Loss = document.querySelector('#weight-loss-button');

  begin_Gym.addEventListener('click', function () {
    window.location.href = 'begin_Gym.html';
  });
  inter_Gym.addEventListener('click', function () {
    window.location.href = 'inter_Gym.html';
  });
  weight_Gain.addEventListener('click', function () {
    window.location.href = 'weight_Gain.html';
  });
  weight_Loss.addEventListener('click', function () {
    window.location.href = 'weight_Loss.html';
  });

  // Function to get query parameters from the URL
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      name: params.get("name"),
      expiry: params.get("expiry"),
    };
  }

  // Retrieve user details from the URL
  const { name, expiry } = getQueryParams();

  // Update the content on the page
  if (name && expiry) {
    document.getElementById("welcomeMessage").textContent = `Hello, ${name}!`;
    document.getElementById("expiryDetails").textContent = `Your account is valid until ${expiry}.`;
  } else {
    // Fallback if details are missing
    document.getElementById("welcomeMessage").textContent = "Welcome to FitFlex!";
    document.getElementById("expiryDetails").textContent = "Log in to view your account details.";
  }


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