const mongoose = require("mongoose");


const connectDb = async() =>{
    try{
        const connect = await mongoose.connect('mongodb://localhost:27017/crypto');
        console.log('database connected:', connect.connection.host , connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;