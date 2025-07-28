import mongoose from 'mongoose'; // 1. Importing mongoose to interact with MongoDB.
import dotenv from 'dotenv'; // 2. Importing dotenv to load environment variables.
dotenv.config(); // 3. Loading environment variables from .env file.

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'url_shortener'; // 4. Getting the database name from environment variables or defaulting to 'url_shortener'.

const connectDB = async(req,res) => {
    try {
        const connectionInstance=await mongoose.connect(`${dbURI}/${dbName}`)
        console.log(`Connected to MongoDB at ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // 5. Exiting the process if the connection fails.
    }
}
export { connectDB }