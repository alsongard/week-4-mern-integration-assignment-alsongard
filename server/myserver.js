const User = require("./models/user.model.js");
const bcrypt = require("bcrypt");
const cors = require('cors');
const express = require("express");
require("dotenv").config();
const Post = require("./models/post.model.js")
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const app = express();
// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}));
// app.use(cors)
app.get("/", (req,res)=>{
    res.status(200).send("<h1>Welcome back Sir</h1>")
})
const saltRounds=10;

app.get("/", (req, res)=>{
    return res.send("<h1>BackEnd API working</h1>")
})
// register ==== working successfully
app.post("/register", async (req,res)=>{
    // console.log(req.body) // testing== integration success: working correctly
    const {useremail, userpassword} = req.body;
    const userEmail = useremail;
    const userPassword  = userpassword
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
            // console.log(`A user has been found with the email: ${userEmail}`);
            return res.status(409).json({success:false, msg:'Email already exist, try another one'});
        }
        // hash the password
        const hash = await bcrypt.hash(userPassword,saltRounds);
        // console.log(`Hash : ${hash}`); testing
        // create user in database
        const user_created = await User.create({email:userEmail, password:hash});
        // console.log(`user_created is :\n ${user_created}`);
        return res.status(200).json({success:true, msg:'Successfully created user'});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).send("<h1>Server Error</h1>")
    }
})


// login ==== working successfully
app.post("/login", async (req,res)=>{
    // console.log("this is req.body");
    // console.log(req.body);
    
    const {useremail, userpassword} = req.body;
    const userEmail = useremail;
    const userPassword = userpassword;
    if (!userEmail || !userPassword)
    {
        // console.log("Email or password undefined"); testing : working 
        return res.status(400).json({success:false, msg:"Credentials failed!"});
    }
    try
    {
        // console.log(`userEmail: ${userEmail} and userPassword: ${userPassword}`)
        // check if user Exist
        const foundUser = await User.findOne({email:userEmail}); 
        // const foundUser = await User.findById(userId); testing
        // console.log(foundUser); //testing
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
            return res.status(200).json({success:true, msg:'User found', data:token, user_id:foundUser._id, email:foundUser.email});
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

// working===successfully
app.post("/createpost", async (req,res)=>{
    // console.log(req.body);
    const {title, content, excerpt, category, slug, tags, author, published} = req.body;
    try
    {
        if (title)
        {
            const user_created =  await Post.create({title:title, slug:slug, content:content, excerpt:excerpt, author:author, tags:tags, isPublished:published})
            // console.log(user_created);
            return res.status(200).json({success: true, data:user_created});
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`)
        return res.status(400).json({success:false, msg:"Client error! Refresh page and try again"})
    }
});

// working===successfully
app.get("/getpost/:id", async (req, res)=>{
    const {id}= req.params;
    // console.log(`id: ${id} and type:${typeof(id)}`)// id:true type:string
    try
    {   
        // const data = await Post.findById(id); // working successfully with post:Object_id('')
        const data = await Post.find({author:id})
        // console.log(data);// display on terminal:true
        return res.status(200).json({success:true, data:data});
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(401).json({success:false, msg:"No post found with the id"})
    }
})

// admin link working==successfully
app.get("/getAllPost", async (req,res)=>{
    try
    {
        const post_data = await Post.find();
        // console.log(post_data);
        if (post_data)
        {
            return res.status(200).json({success: true, data:post_data});
        }
        else
        {
            return res.status(500).json({success:false, msg:"Server Error"});
        }
    }
    catch(err)
    {
        console.log(`Error ${err}`);
    }
})

app.get("/allusers", async (req, res)=>{
    const user_data = await User.find({}, {email:1, _id: 1});
    if (user_data)
    {
        return res.status(200).json({success:true, data:user_data});
    }
    else
    {
        return res.status(500).json({success:false, msg:"Server Error"});
    }
})

app.delete("post/:id", async (req, res)=>{
    const {id} = req.params;
    try
    {
        const result = await Post.findByIdAndDelete(id);
        console.log(result);
        return res.json(200).json({success:true, data:result});
    }
    catch(err)
    {
        console.log(`Error : ${err}`);
    }
})

const PORT_NUMBER = 5001;

const uri_string = process.env.CONNECT_STRING;
// console.log(uri_string); testing
const user = process.env.POST_USER;
const secret = process.env.POST_SECRET;

mongoose.connect(`mongodb+srv://alsongadizo:${secret}@cluster0.9mxopa5.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0`)
    .then(()=>{
    console.log('Connected to Database');
    app.listen(PORT_NUMBER, ()=>{console.log(`Listening to port ${PORT_NUMBER}`)});
    })
    .catch((err)=>{console.log(`Error: ${err}`);})
    
