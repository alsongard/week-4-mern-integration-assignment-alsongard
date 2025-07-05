const mongoose = require("mongoose");

const userSchema  = new mongoose.Schema(
    {
        email: {
            type:String, 
            required:true,
            unique:true,
            trim:true
        },
        password: {
            type:String,
            required:true,
            trim:true
        }
    }
)

const User = mongoose.model("User", userSchema)
module.exports = User;
// the first argument passed to model() method is the name of the collection. This will be
// pluralized in the mongoDB database.
// the second argument is the schemaVariable which defines the structure of the documents(rows) in the collection(table)
// one can also add a third argment which will prevent the pluralization of the first_arugment and mongoDB will
// use this argument