// animation
const lockIcon = document.getElementById('lockIcon');
setInterval(() => {
  lockIcon.classList.add('shake');
  setTimeout(() => {
    lockIcon.classList.remove('shake');
  }, 850); // same duration as the shake and rotate animation
}, 12000); // every 10 seconds


const form = document.getElementById('login-form')
form.addEventListener('submit', registerUser)

// send data as JSON
async function registerUser(event) {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json())
    
    if (result.status === "Good"){
        console.log('token received: ', result.data)
        alert ('Welcome obviously not suspicious person.')

    }else{
        alert(result.error)
    }
}