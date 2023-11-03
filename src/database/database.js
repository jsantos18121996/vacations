const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect('mongodb+srv://root:xPxUx1X7Vbu1PYu6@jhorlyncluster.cy5of.mongodb.net/workshop_backend');
        console.log('DB MONGO Online ...');
    } catch (error) {
        console.log('error', error);
        throw new Error('Error a la hora de inicializar DB MONGO ...');
    }
}

module.exports = {
    dbConnection
}
