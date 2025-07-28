import dotenv from 'dotenv';
dotenv.config();           // 1. Imports the dotenv package to load environment variables from a .env file.

const config={
    PORT : process.env.PORT || 3000, // 2. Sets the port: uses the PORT from environment variables if available, otherwise defaults to 3000.
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'url_shortener',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret',
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || '1d',
    BOT_SECRET_KEY: process.env.BOT_SECRET_KEY

}

export {config}; // 3. Exports the config object so it can be imported elsewhere (like in index.js).