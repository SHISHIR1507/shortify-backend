import express from 'express';
import { URL } from '../models/url.model.js';
import { restrictTo } from '../middlewares/auth.middleware.js'; // Importing the restrictTo middleware
const router = express.Router();


router.get("/",restrictTo(["NORMAL"]),async(req,res)=>{

    const allUrls=await URL.find({createdBy: req.user._id});
    return res.render ("home.ejs",{
        urls: allUrls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup.ejs");
});

router.get("/login", (req, res) => {
    return res.render("login.ejs");
});
export { router };
