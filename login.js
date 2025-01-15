document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example credentials (replace with your own validation logic)
    const validUsername = 'user';
    const validPassword = 'pass';

    if (username === validUsername && password === validPassword) {
        localStorage.setItem('loggedIn', 'true'); // Store login state
        window.location.href = 'index.html'; // Redirect to the main page
    } else {
        alert('Invalid username or password. Please try again.'); // Show error message
    }
});