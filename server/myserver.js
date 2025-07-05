const User = require("./models/user.model.js");
const bcrypt = require("bcrypt");
const cors = require('cors');
const express = require("express");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const app = express();
// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res)=>{
    res.status(200).send("<h1>Welcome back Sir</h1>")
})
const saltRounds=10;

// register ==== working successfully
app.post("/register", async (req,res)=>{
    const {userEmail, userPassword} = req.body;
    if (!userEmail || !userPassword)
    {
        return res.status(400).json({success: false, msg:"Client Error!"})
    }
    // hash password
    // console.log(`Email: ${userEmail} and Password: ${userPassword}`); testing

    try
    {
        // check if user email exists    
        const foundEmail = await User.findOne({email:userEmail});

        // if at anytime a user tries to register with a used email send
        if (foundEmail)
        {
            // console.log(foundEmail);  testing
            console.log(`A user has been found with the email: ${userEmail}`);
            return res.status(409).json({success:false, msg:'Email already exist, try another one'});
        }
        // hash the password
        const hash = await bcrypt.hash(userPassword,saltRounds);
        // console.log(`Hash : ${hash}`); testing
        // create user in database
        const user_created = await User.create({email:userEmail, password:hash});
        console.log(`user_created is :\n ${user_created}`);
        return res.status(200).json({success:true, msg:'Successfully created user', user:user_created._id});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).send("<h1>Server Error</h1>")
    }
})


// login ==== working successfully
app.post("/login", async (req,res)=>{
    const {userEmail, userPassword, userId} = req.body;
    if (!userEmail || !userPassword)
    {
        console.log("Email or password undefined");
        return res.status(400).json({success:false, msg:"Credentials failed!"});
    }
    try
    {
        console.log(`userEmail: ${userEmail} and userPassword: ${userPassword}`)
        // check if user Exist
        const foundUser = await User.findOne({email:userEmail}); 
        // const foundUser = await User.findById(userId); testing
        // console.log(foundUser); testing
        if (!foundUser)
        {
            // return res.status(401).json({success:false, msg:'Invalid credentials! No email or password'}) testing
            return res.status(401).json({success:false, msg:'Invalid credentials!'})
        }
        // console.log(foundUser); testing
        const result = await bcrypt.compare(userPassword, foundUser.password)
        if (result)
        {
            const userObject = {user:foundUser.email};
            const token = jwt.sign(userObject,process.env.JWT_SECRET);
            // console.log(`Token: ${token}`) testing
            return res.status(200).json({success:true, msg:'User found', data:token})
        }
        else 
        {
            return res.status(401).json({success:false, msg:'Invalid Credentials'})
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).send("<h1>Server Error</h1>")
    }
})

const PORT_NUMBER = 6000;

const uri_string = process.env.CONNECT_STRING;
// console.log(uri_string); testing

mongoose.connect("mongodb+srv://alsongadizo:IbewQtMvIiDH7xB1@cluster0.9mxopa5.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
    console.log('Connected to Database');
    app.listen(PORT_NUMBER, ()=>{console.log(`Listening to port ${PORT_NUMBER}`)});
    })
    .catch((err)=>{console.log(`Error: ${err}`);})
    




//mongodb+srv://alsongadizo:IbewQtMvIiDH7xB1@cluster0.9mxopa5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0