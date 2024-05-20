const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);

async function registerUser(event) {
    event.preventDefault();  // Stop the form from submitting in the traditional way

    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json());

    if (result.status === "Good") {
        alert('User created successfully');
        window.location.href = '../login.html'; //redirect to login
    } else {
        alert(result.error);
    }
}