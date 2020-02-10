
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/MyDb'

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}

mongoose.connect(url, options);

// const db = mongoose.connection

// db.on('error', console.error.bind(console, 'mongodb connection error:'));