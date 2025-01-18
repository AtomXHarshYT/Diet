// Replace this with your published Google Sheet CSV URL
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTve9ZbasB4diM4_nErmaP6E2hngZNaZqrKbhi1nEEPxidRXS9503UYhkMlcTkZxxwZqiaW-DHONFnv/pub?output=csv";

// Attach event listener to the login form
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value.trim(); // Get entered username
    const password = document.getElementById("password").value.trim(); // Get entered password

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    // Fetch the CSV data from Google Sheets
    fetch(sheetUrl)
        .then(response => response.text())
        .then(csvData => {
            // Parse CSV data using PapaParse or a custom parser
            const rows = csvData.split("\n").map(row => row.split(","));
            const header = rows[0]; // Extract header row
            const data = rows.slice(1); // Extract data rows

            // Find the user by Enrollment No. (assumes Enrollment is in the first column)
            const user = data.find(row => row[0].trim() === username);

            if (!user) {
                alert("User not found. Please check your username.");
                return;
            }

            // Check if the password matches (assumes Password is in the second column)
            const storedPassword = user[1]?.trim();
            if (storedPassword === password) {
                const name = user[2]?.trim(); // Get Name from the third column
                const expiryDate = user[3]?.trim(); // Get Expiry Date from the fourth column

                // Redirect to the main page or display success
                alert(`Welcome, ${name}! Your account is valid until ${expiryDate}.`);
                window.location.href = `main.html?name=${name}&expiry=${expiryDate}`;
            } else {
                alert("Incorrect password. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error fetching or parsing the CSV:", error);
            alert("An error occurred while processing your login. Please try again later.");
        });
});