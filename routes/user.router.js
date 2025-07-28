import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/', registerUser); // Route for user registration
router.post('/login', loginUser); // Route for user login 
router.get("/ping", (req, res) => {
  res.send("✅ User router is working");
});

export { router };