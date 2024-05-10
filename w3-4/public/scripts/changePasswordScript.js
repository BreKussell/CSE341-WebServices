const form = document.getElementById('change-form')
form.addEventListener('submit', registerUser)

// send data as JSON
async function registerUser(event) {
    const username = document.getElementById('old-pass').value
    const password = document.getElementById('new-pass').value

    const result = await fetch('/api/changePassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newpassword: password,
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())
    
    if (result.status === "Good"){
        console.log('Token received', result.data)
        localStorage.setItem('token', result.data)
        alert ('Password changed successfully')

    }else{
        alert(result.error)
    }
}