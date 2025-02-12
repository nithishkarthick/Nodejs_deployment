function submitDonorForm(event) {
    event.preventDefault(); // Prevent page refresh

    const donorData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value,
        bloodGroup: document.getElementById('bloodGroup').value,
        location: document.getElementById('location').value
    };

    fetch('http://localhost:3000/api/donor/register', {  // Use API Gateway
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donorData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Donor registered successfully!');
        document.getElementById('donorForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error registering donor.');
    });
}

// Function to handle donor search form submission
function searchDonors(event) {
    event.preventDefault();

    const searchCriteria = {
        bloodGroup: document.getElementById('searchBloodGroup').value,
        location: document.getElementById('searchLocation').value
    };

    fetch('http://localhost:3000/api/donor/search', {  // Use API Gateway
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchCriteria)
    })
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';

        if (data.length === 0) {
            resultsContainer.innerHTML = '<p>No donors found.</p>';
        } else {
            const donorList = data.map(donor => `
                <div class="donor-item">
                    <p><strong>Name:</strong> ${donor.name}</p>
                    <p><strong>Age:</strong> ${donor.age}</p>
                    <p><strong>Gender:</strong> ${donor.gender}</p>
                    <p><strong>Phone:</strong> ${donor.phone}</p>
                    <p><strong>Date of Birth:</strong> ${donor.dob}</p>
                    <p><strong>Blood Group:</strong> ${donor.blood_group}</p>
                    <p><strong>Location:</strong> ${donor.location}</p>
                </div>
            `).join('');
            resultsContainer.innerHTML = donorList;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error searching for donors.');
    });
}


document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent form refresh

            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirmPassword').value;

            if (name === "" || email === "" || password === "" || confirmPassword === "") {
                alert("Please fill in all fields.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Signup successful!");
                    window.location.href = "login.html";
                } else {
                    alert(result.message || "Signup failed.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("Error registering user.");
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            var email = document.getElementById('loginEmail').value;
            var password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Login successful!");
                    localStorage.setItem("token", result.token);  // Store JWT token for authentication
                    window.location.href = "home.html";
                } else {
                    alert(result.message || "Invalid credentials.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("Error logging in.");
            }
        });
    }
});
