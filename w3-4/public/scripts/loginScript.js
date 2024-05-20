// animation
const lockIcon = document.getElementById('lockIcon');
setInterval(() => {
  lockIcon.classList.add('shake');
  setTimeout(() => {
    lockIcon.classList.remove('shake');
  }, 850); // same duration as the shake and rotate animation
}, 12000); // every 10 seconds



const mongoose = require('mongoose');

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', loginUser);
});

async function loginUser(event) {
    event.preventDefault();  // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const result = await response.json();

        if (result.status === "Good") {
            console.log('token received:', result.data);
            window.location.href = 'animation.html';  // Redirect to animation.html
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to login. Please try again later.');
    }
}
