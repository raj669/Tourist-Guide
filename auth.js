// auth.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    const userDataDiv = document.getElementById('user-data');
    const displayNameSpan = document.getElementById('display-name');
    const displayEmailSpan = document.getElementById('display-email');
    const updateUserButton = document.getElementById('update-user');
    const deleteUserButton = document.getElementById('delete-user');
    const signupSection = document.getElementById('signup-form'); // Correct ID
    let loginSection = document.getElementById('login-form'); //Get this element and fix hide/show

    // Function to show/hide sections
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.auth-form');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        document.getElementById(sectionId).style.display = 'block';
    }

    // Event listeners to toggle between login and signup forms
    showSignupLink.addEventListener('click', function(event) {
        event.preventDefault();
        showSection('signup-form');
    });

    showLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        showSection('login-form');
    });

    // Dummy user data (replace with actual user data from your backend)
    let currentUser = null;

    // Login Form Submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        //Replace the following with actual authentication logic (AJAX request to your backend)
        if (email === 'test@example.com' && password === 'password') {
            currentUser = { name: 'Test User', email: email }; // Mock user data
            displayNameSpan.textContent = currentUser.name;
            displayEmailSpan.textContent = currentUser.email;
            userDataDiv.style.display = 'block';
            showSection('');//Hide Login and Signup
            loginSection.style.display = 'none';
            signupSection.style.display = 'none';

        } else {
            alert('Invalid credentials');
        }
    });

    // Signup Form Submission
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        //Replace the following with actual signup logic (AJAX request to your backend)
        currentUser = { name: name, email: email }; // Mock user data
        displayNameSpan.textContent = currentUser.name;
        displayEmailSpan.textContent = currentUser.email;
        userDataDiv.style.display = 'block';
        showSection(''); //Hide Login and Signup
        loginSection.style.display = 'none';
        signupSection.style.display = 'none';

        //Consider adding validation to prevent creating a duplicate account
    });

    // Update User (Dummy implementation - replace with AJAX to backend)
    updateUserButton.addEventListener('click', function() {
        if (currentUser) {
            const newName = prompt('Enter new name:', currentUser.name);
            if (newName) {
                currentUser.name = newName;
                displayNameSpan.textContent = currentUser.name;
                alert('User updated successfully!');
            }
        } else {
            alert('No user logged in.');
        }
    });

    // Delete User (Dummy implementation - replace with AJAX to backend)
    deleteUserButton.addEventListener('click', function() {
        if (currentUser) {
            const confirmDelete = confirm('Are you sure you want to delete this user?');
            if (confirmDelete) {
                currentUser = null;
                displayNameSpan.textContent = '';
                displayEmailSpan.textContent = '';
                userDataDiv.style.display = 'none';
                loginSection.style.display = 'block';
                signupSection.style.display = 'block';//Show login/signup
                alert('User deleted successfully!');
            }
        } else {
            alert('No user logged in.');
        }
    });
});