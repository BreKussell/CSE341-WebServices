const express = require('express');
const bodyParser = require('body-parser');
const host = 'localhost'
const port = 3000;
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "dj@ie1p3o1!*i4uxjflwe9e2pqqeiqbvvvc#$#lyqzcwi$ouer#&tymizq"
const User = require('./models/user');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use(express.static('public'));

app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {
    res.json({ status: "Good" })
})




mongoose.connect('mongodb+srv://rus17008:KOdFQhioxprW8DyD@cluster0.jnkg9pl.mongodb.net/users',{ //Connect mongoDB
    useNewURLParser: true,
    useUnifiedTopology: true
})


/******************************************
 ****Register User
*******************************************/

app.post('/api/register', async (req, res) =>{
    const { username, password: plainTextPassword } = req.body
    if(!username || typeof username !== 'string' ) {
        return res.json({ status: 'error', error: 'Invalid username'  })
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string' ) {
        return res.json({ status: 'error', error: 'Invalid password'  })
    }

    if (plainTextPassword.length  < 8) {
        return res.json({ status: 'error', error: 'Password is too short. Make your password at least 8 characters long'  })
    }

    // hashing passwords
    const password = await bcrypt.hash(plainTextPassword, 10)
   // console.log(bcrypt.hash('password', 10))

 
   try {
    const response = await User.create({
        username,
        password
    });
    console.log('User created successfully:', response);
    res.json({status: 'Good'});
} catch (error) {
    if (error.code === 11000) { //duplicate key/username
        return res.json({ status: "error", error: "This username is already in use"});
    }
    console.error(error);
    throw error; 
}
res.json({status: 'Good'})
})



/******************************************
 ****Delete User
*******************************************/
app.delete('/api/delete-user', async (req, res) => {
    const { username } = req.body;
    
    // Authentication and authorization checks should be performed here

    try {
        const result = await User.deleteOne({ username });
        if (result.deletedCount === 0) {
            return res.json({ status: 'error', error: 'User not found' });
        }
        res.json({ status: 'Good' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
});



/******************************************
 ****Change User Password
*******************************************/

app.post('/api/change-password', async (req, res) => {
    const { token, newpassword } = req.body;

    try {
        // Verify the JWT token and get the user data
        const decoded = jwt.verify(token, JWT_SECRET);
        const _id = decoded.id;  // Get user id from token payload

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newpassword, 10);  // It's recommended to use salt rounds, e.g., 10

        // Use the User model to update the password in the database
        await User.updateOne({ _id }, {
            $set: { password: hashedPassword }
        });

        res.json({ status: "Good", message: "Password successfully updated" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ status: 'error', error: 'Something bad is happening' });
    }
});




/******************************************
 ****Login User
*******************************************/
const loginAttempts = {};

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Initialize login attempts for the user if not already done
    if (!loginAttempts[username]) {
        loginAttempts[username] = 0;
    }

    // Check if the login attempts are greater than or equal to 5
    if (loginAttempts[username] >= 5) {
        return res.json({ status: 'error', error: 'Get thee hense hacker!' });
    }

    // Find user by username only
    const user = await User.findOne({ username }).lean();
    if (!user) {
        loginAttempts[username] += 1;
        return res.json({ status: 'error', error: 'Invalid username/password' });
    }

    // Compare hashed password
    if (await bcrypt.compare(password, user.password)) {
        loginAttempts[username] = 0; // Reset attempts on successful login
        const token = jwt.sign({
            id: user._id,
            username: user.username,
        }, JWT_SECRET);

        return res.json({ status: 'Good', data: token, message: 'Welcome obviously not suspicious person' });
    } else {
        loginAttempts[username] += 1;
        return res.json({ status: 'error', error: 'Invalid username/password' });
    }
});





// Initialize database and start server

app.listen(port, () => {
     console.log(`Database and app listening on ${host}:${port}`)
})


