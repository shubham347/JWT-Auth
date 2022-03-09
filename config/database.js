const mongoose = require("mongoose");
const {MONGO_URI} = process.env;
//console.log(MONGO_URI);

exports.connect = () => {
    mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to databases")
    })
    .catch((error) => {
        console.log("Database connection failed. exiting now");
        console.error(error);
        process.exit(1);
    });
}