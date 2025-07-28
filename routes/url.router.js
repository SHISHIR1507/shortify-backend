import  express from 'express';
import { handleGenerateNewShortUrl, handleGetAnalytics } from '../controllers/url.controller.js'; // Importing the controller function
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
router.get("/analytics/:shortUrl", handleGetAnalytics);


export { router };