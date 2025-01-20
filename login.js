// Replace this with your published Google Sheet CSV URL
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTve9ZbasB4diM4_nErmaP6E2hngZNaZqrKbhi1nEEPxidRXS9503UYhkMlcTkZxxwZqiaW-DHONFnv/pub?output=csv";

// Attach event listener to the login form
document.getElementById("loginForm").addEventListener("submit", function (event) {
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
            const rows = csvData.split("\n").map(row => row.split(","));
            console.log("Parsed CSV Rows:", rows); // Debugging: Log the parsed rows
            const header = rows[0];
            const data = rows.slice(1);

            const user = data.find(row => row[0].trim() === username);
            console.log("Matched User Row:", user); // Debugging: Log the matched user row

            if (!user) {
                alert("User not found. Please check your username.");
                return;
            }

            const storedPassword = user[1]?.trim();
            if (storedPassword === password) {
                const name = user[2]?.trim();
                const expiryDate = user[3]?.trim();
                console.log("User Details:", { name, expiryDate }); // Debugging: Log user details

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