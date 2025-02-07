// Function to handle donor registration form submission
function submitDonorForm(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get the form data
    const donorData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value,
        bloodGroup: document.getElementById('bloodGroup').value,
        location: document.getElementById('location').value
    };
    // const API_URL = "http://3.110.194.68:5000/api/register";  // Change if needed

    // const res = await fetch(API_URL, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(user),
    // });

    // Send data to the backend (POST request to /donate route)
    fetch('/donate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(donorData)
    })
    .then(response => response.text())
    .then(data => {
        // Display the server response
        alert(data);
        // Optionally, reset the form
        document.getElementById('donorForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error registering the donor.');
    });
}
// Function to handle donor search form submission
function searchDonors(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get search criteria
    const searchCriteria = {
        bloodGroup: document.getElementById('searchBloodGroup').value,
        location: document.getElementById('searchLocation').value
    };
    

    // Send search data to the backend (POST request to /search-donors route)
    fetch('/search-donors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchCriteria)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the search results
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = ''; // Clear previous results

        if (data.length === 0) {
            resultsContainer.innerHTML = '<p>No donors found.</p>';
        } else {
            // Create a list of matching donors
            const donorList = data.map(donor => {
                return `<div class="donor-item">
                        <p><strong>Name:</strong> ${donor.name}</p>
                        <p><strong>Age:</strong> ${donor.age}</p>
                        <p><strong>Gender:</strong> ${donor.gender}</p>
                        <p><strong>Phone:</strong> ${donor.phone}</p>
                        <p><strong>Date of Birth:</strong> ${donor.dob}</p>
                        <p><strong>Blood Group:</strong> ${donor.blood_group}</p>
                        <p><strong>Location:</strong> ${donor.location}</p>
                        </div>`;
            }).join('');
            resultsContainer.innerHTML = donorList;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error searching for donors.');
    });
}

// Signup form submission
document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission

            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirmPassword').value;

            // Check if any fields are empty
            if (name === "" || email === "" || password === "" || confirmPassword === "") {
                alert("Please fill in all the fields.");
                return;
            }

            // Check if passwords match
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Store user details in localStorage
            const userDetails = {
                name: name,
                email: email,
                password: password
            };
            localStorage.setItem('userDetails', JSON.stringify(userDetails));

            alert("Signup successful!");
            window.location.href = "login.html";  // Redirect to login page
        });
    } else {
        console.error("signupForm element not found");
    }
});

// Login form submission
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission

            var loginEmail = document.getElementById('loginEmail').value;
            var loginPassword = document.getElementById('loginPassword').value;

            // Get stored user details from localStorage
            var storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

            // Check if user is found in localStorage
            if (storedUserDetails) {
                // Validate the email and password
                if (loginEmail === storedUserDetails.email && loginPassword === storedUserDetails.password) {
                    alert("Login successful!");
                    // Redirect to home page or another page (e.g., index.html)
                    window.location.href = "home.html"; // Replace with your actual home page URL
                } else {
                    alert("Invalid email or password.");
                }
            } else {
                alert("No user found. Please sign up first.");
            }
        });
    } else {
        console.error("loginForm element not found");
    }
});