import { USER } from "../models/user.model.js";
import {v4 as uuidv4} from 'uuid'; // Importing uuid for generating unique IDs    
import { setUser } from '../service/auth.service.js'; // Importing the setUser function


const registerUser = async (req, res) => {
    console.log("Login route hit");

    const {userName , email , password}= req.body
    if (!userName || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const allUsers= await USER.create({userName, email, password});
    return res.redirect("/");

}

const loginUser = async (req, res) => {
    const {email,password}=req.body
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const user = await USER.findOne({ email, password });
    if (!user) {
        return res.render("login", {
            error: "Invalid email or password"
        });
    }
    
    const token = setUser(user); // Generate the access token using the setUser function
    res.cookie("token", token);
    return res.redirect("/");
    console.log("Generated token:", token);

}
export { registerUser, loginUser };