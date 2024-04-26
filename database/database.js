const env = require('dotenv')
env.config();

const mongoClient = require('mongo').mongoClient;
let database;

const initDb = (callback) => {
    if(database) {
        console.log('Db is already initialized!');
        return callback(null, database);
    }
    mongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        callback(null, database);
    })
    .catch((err) =>{
        callback(err);
    });
};


const getDatabase = () => {
    if(!database) {
       throw Error('Database not initialized')
    }
        return database;
};

module.exports = {
    initDb,
    getDatabase
};