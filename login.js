// Replace this with your published Google Sheet CSV URL
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTKVVoCHIZyZCAWA5QkhZvnQXJ4QI75ICB9m9jPaeYFTy8QEJO-Sr57q7Wx8_GwWA/pub?gid=1901224667&single=true&output=csv";

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

            // Find the user by username (Column A)
            const user = data.find(row => row[0].trim() === username);
            console.log("Matched User Row:", user); // Debugging: Log the matched user row

            if (!user) {
                alert("User  not found. Please check your username.");
                return;
            }

            const storedPassword = user[6]?.trim(); // Password is now in Column G (index 6)
            const expiryDateStr = user[4]?.trim(); // Expiry date is now in Column E (index 4)

            // Function to convert "dd-mm-yyyy" or "dd/mm/yyyy" to a valid Date object
            function parseDate(dateStr) {
                // Replace `/` with `-` if needed
                const formattedDateStr = dateStr.replace(/\//g, '-'); // Converts dd/mm/yyyy to dd-mm-yyyy
                const [day, month, year] = formattedDateStr.split('-').map(Number); // Extract day, month, year
                return new Date(year, month - 1, day); // Create a Date object (month is zero-based)
            }

            const expiryDate = parseDate(expiryDateStr);
            const currentDate = new Date();

            if (storedPassword === password) {
                if (expiryDate < currentDate) {
                    alert("Your account has expired. Please renew your membership.");
                    return;
                }
            
            const name = user[1]?.trim(); // Name is now in Column B (index 1)
            console.log("User  Details:", { name, expiryDate }); // Debugging: Log user details

            alert(`Welcome, ${name}! Your account is valid until ${expiryDateStr}.`);
            window.location.href = `main.html?name=${name}&expiry=${expiryDateStr}`;
        } else {
            alert("Incorrect password. Please try again.");
        }
        })
    .catch(error => {
        console.error("Error fetching or parsing the CSV:", error);
        alert("An error occurred while processing your login. Please try again later.");
    });
});