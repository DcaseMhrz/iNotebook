const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://dcasemhrz:afc77sm4wa@cluster0.4ihzvag.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo=()=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongooseDB...");
    });
}

module.exports = connectToMongo;