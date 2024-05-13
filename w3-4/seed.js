const mongoose = require('mongoose');
const User = require('./models/user');  // Ensure this path correctly points to your User model
const { connectDB, closeDB } = require('./database');  // Verify these functions handle connections properly

const users = [
    { username: "john_doe", password: "$2a$10$zBIY2M1p.hVH2VzVR3I6seJZ5UCVJPDnjQdGQzT31PdEdYYx9BFli" },
    { username: "jane_doe", password: "$2a$10$kmFzlA7RqDylZcO5aU4R8OXQyqjFMQI0H1XjYoYomZS1Cf5s9Bf0G" },
    { username: "alice_jones", password: "$2a$10$e6RfgRwhbom60tc4m8ybJO8mXu6ydudfomHQ6Vx.UC76mZOP9Q1mO" },
    { username: "bob_smith", password: "$2a$10$Dcl0aCZID5LunKlFGTZz3eQdGgyW4ihrnT.aB1yNwW3vxV5X.pDbK" },
    { username: "charlie_brown", password: "$2a$10$E39YZKq5HRANUPR7F9lJH.DK.PKF4bwt8MpqJdIOMtFj.P6Qid5mG" }
];

async function seedDatabase() {
    try {
        await connectDB();
        console.log("Connected to database. Beginning to seed...");
        const response = await User.insertMany(users);
        console.log('Users added successfully:', response);
    } catch (err) {
        console.error('Error inserting users into database:', err);
    } finally {
        await closeDB();  // Close the database connection when done
        console.log("Database connection closed.");
    }
}

seedDatabase();
