import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export function postUsers(req,res){
    const user=req.body
    const password=req.body.password
    const saltRounds=10

    const passwordHash=bcrypt.hashSync(password,saltRounds);

    user.password=passwordHash
    const newUser = new User(user);

    newUser.save().then( ()=>{
            res.json(
                {
                    message:"User created succesfully"
                } )
             }).catch( 
                ()=> {
            res.json({
                    message:"User creation failed"
                });
            });
        }

export function loginUser(req,res){
    const credentials=req.body
   
    User.findOne({email:credentials.email}).then(
        (user)=>{
            if(user==null){
                res.status(403).json({
                    message:"User not found"
                });
            }else{
                const isPasswordValid=bcrypt.compareSync(credentials.password,user.password);

                if(!isPasswordValid){
                    res.status(403).json({
                        message:"incorrect password"
                    });
                }else{
                const payload={
                     id:user._id,
                     email:user.email,
                     firstName:user.firstName,
                     lastName:user.lastName,
                     type:user.type,
                };
                const token=jwt.sign(payload,process.env.JWT_KEY,{expiresIn:"48h"});

                res.json({
                    message:"User found",
                    user:user,
                    token:token
                })
            }
        }
})
};
export function blockUser(req, res) {
    const { userId } = req.params; // Get user ID from request parameters

    // Check if the requester is an admin
    if (!isAdminValid(req)) {
        return res.status(403).json({ message: "You are not authorized to block users." });
    }

    User.findById(userId) // Find the user by ID
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            user.isBlocked = true; // Set the user as blocked
            return user.save(); // Save changes
        })
        .then(() => {
            res.json({ message: "User account has been blocked successfully." });
        })
        .catch(error => {
            console.error(error); // Log the error for debugging
            res.status(500).json({ message: "Error blocking user account." });
        });
}

// Unblock user function
export function unblockUser(req, res) {
    const { userId } = req.params; 

    if (!isAdminValid(req)) {
        return res.status(403).json({ message: "You are not authorized to unblock users." });
    }

    User.findById(userId).then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            user.isBlocked = false;
            return user.save();
        })
        .then(() => {
            res.json({ message: "User account has been unblocked successfully." });
        })
        .catch(error => {
            console.error(error); 
            res.status(500).json({ message: "Error unblocking user account." });
        });
}

export function isAdminValid(req){
    if(req.user==null){
        return false
}
if(req.user.type!="admin"){
    return false
}
return true;
}
