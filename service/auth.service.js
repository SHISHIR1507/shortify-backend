import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import dotenv from 'dotenv';

dotenv.config();

function setUser(user) {
    return jwt.sign(
        { id: user._id, email: user.email },
        config.ACCESS_TOKEN_SECRET,
        { expiresIn: config.ACCESS_TOKEN_EXPIRY }
    );
}

function getUser(token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, config.ACCESS_TOKEN_SECRET);

    }catch (error) {
        return null;
    }

}
console.log("🛡 ACCESS_TOKEN_SECRET:", config.ACCESS_TOKEN_SECRET);

export { setUser, getUser };