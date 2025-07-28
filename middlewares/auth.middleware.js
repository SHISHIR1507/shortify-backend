import { get } from "mongoose";
import { getUser } from "../service/auth.service.js";

function checkForAuthentication(req, res, next) {
    const tokenCookie=req.cookies?.token;
    req.user=null

    if (!tokenCookie ) return next(); 
    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles=[]){
    return function   (req, res, next) {
        console.log("RestrictTo: user =", req.user);
        console.log("Allowed roles =", roles);

        if (!req.user) return res.redirect("/login");
        if (!roles.includes(req.user.role)) {
            console.log("Role MISMATCH: user role =", req.user.role);
            return res.end("You are not authorized to perform this action");
        }
        return next();
    }
}


export { checkForAuthentication, restrictTo };