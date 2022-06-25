const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/F8_course_dev');

        console.log('Connect successfully!');
    } catch (error) {
        console.log("Error: Can't connect to database!");
    }
}

module.exports = { connect };
