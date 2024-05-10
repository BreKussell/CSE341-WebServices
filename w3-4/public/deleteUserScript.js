document.getElementById('delete-user-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;

    try {
        const response = await fetch('/api/delete-user', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
        const result = await response.json();

        if (result.status === "Good") {
            alert('User deleted successfully');
            // Optionally redirect or update the UI here
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Error deleting user');
    }
});
