require("./config/database").connect();
const User = require('./model/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const register = async function(req, res, next){
    //console.log(req.body);
    try {
    let { first_name, last_name, email, password } = req.body;

    if(!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
    }
    email = email.toLowerCase();
    const oldUser = await User.findOne({ email });
    console.log(oldUser);
    if(oldUser){
        return res.status(409).send("Email already exist. Please try again or login");
    }
    // if(oldUser && oldUser.token){
    //     res.status(409).send("User already exist. Please login");
    // }else if(oldUser && !oldUser.token) {
    //     console.log("Existing Users token not found");
    //     User.remove({'email': email}, (err) => {
    //        if(!err){
    //            console.log("Deleted....")
    //        } 
    //     });
    //     console.log("Token not found");

    // }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);

    const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword
    });

    const token = jwt.sign(
        {userid: user._id, email},
        process.env.TOKEN_KEY,
        { 
            expiresIn: "1h"
        }
     );
     console.log(token);
     user.token = token;
     
     if(!token){
         User.delete({user});
         res.status(500).send("Token not generated. Please retry");
     }
     res.status(201).json(user);

    }
    catch (err) {
        console.log(err);
    }
}

const login = async function(req, res, next){
    console.log(req.body);
    try{
    const { email, password } = req.body;
    
    if(!(email && password)){
        res.status(400).send("All inputs required");
    }

    const user = await User.findOne({ email });

    if( user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign(
            {userid: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            }
        );

        user.token = token;
        res.status(200).json(user);
    } else {
        res.status(209).send("Invaild login details");
    }
}
catch(err) {
    console.log(error);

}
}

const homePage = async function(req, res, next){
    res.status(200).send("Welcome to home page")
}

module.exports = {register, login, homePage};