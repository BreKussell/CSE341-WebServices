const form = document.getElementById('reg-form')
form.addEventListener('submit', registerUser)

// send data as JSON
async function registerUser(event) {
    const username = document.getElementById('reg-username').value
    const password = document.getElementById('reg-password').value

    const result = await fetch('/api/register', {
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
        alert ('User created successfully')

    }else{
        alert(result.error)
    }
}