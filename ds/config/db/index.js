const mongoose = require('mongoose');
const connect = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/ds", {
            authSource: "admin",
            user: "root",
            pass: "example",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect successully')
    }catch(error){
        console.log('connect failure: '+error)
    }
}
module.exports = connect