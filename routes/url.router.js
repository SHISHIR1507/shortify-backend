import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { handleGenerateNewShortUrl, handleGetAnalytics } from '../controllers/url.controller.js';
import { restrictTo } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 👥 Only NORMAL users can access this
router.post('/', restrictTo(['NORMAL']), handleGenerateNewShortUrl);

// 🤖 Discord Bot can access this with secret key
router.post(
  '/public',
  async (req, res, next) => {
    if (req.headers.authorization !== `Bearer ${process.env.BOT_SECRET_KEY}`) {
      return res.status(403).send(" Forbidden");
    }
    next(); 
  },
  handleGenerateNewShortUrl
);

router.get('/analytics/:shortUrl', handleGetAnalytics);

export { router };
