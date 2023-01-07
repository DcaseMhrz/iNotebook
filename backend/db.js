const mongoose = require("mongoose");
const mongoURI="mongodb://localhost:27017/inotebook";

const connectToMongo=()=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongooseDB...");
    });
}

module.exports = connectToMongo;