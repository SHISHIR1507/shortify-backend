import express from 'express';
import dotenv from 'dotenv';
import { config } from './config.js'; // Importing the config object from config.js
import { connectDB } from './Connection.js'; // Importing the URL router
import { URL } from './models/url.model.js'; // Importing the URL model
import path from 'path'; // Importing path to serve static files
import cookieParser from 'cookie-parser';
import { checkForAuthentication,restrictTo } from './middlewares/auth.middleware.js';
import {router as urlRouter} from './routes/url.router.js';
import {router as staticRouter} from './routes/staticRouter.js'; // Importing the static router
import {router as userRouter} from './routes/user.router.js'; // Importing the user router



dotenv.config();

// Initialize the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use (checkForAuthentication); // Middleware to check for authentication



// Connect to the database
connectDB().then(() => {
  console.log('Database connection established');
    }).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);
    });


app.use('/', staticRouter);
app.use('/user', userRouter); // Use the user router for handling requests to the /user endpoint


// Setting EJS as the view engine
app.set('view engine', 'ejs'); 
app.set("views",path.resolve("./views")); // Setting the views directory
app.get("/test",async(req,res)=>{
    const allUrls=await URL.find({});
    res.render("home.ejs");
})
// Use the URL router for handling requests to the /url endpoint

app.get('/url/:shortUrl', async(req, res) => {
    try {
        const shortUrl=req.params.shortUrl;
        const entry= await URL.findOneAndUpdate(
            {
                shortUrl,
    
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        )
        res.redirect(entry.originalUrl);
    
    } catch (error) {
        console.error('Error occurred while redirecting:', error);
        res.status(500).send('Internal Server Error');
    }
})
app.use('/url',restrictTo(["NORMAL"]),urlRouter);


app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});