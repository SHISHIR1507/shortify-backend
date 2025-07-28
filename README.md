# shortify-backend

# 🔗 Shortify – Scalable URL Shortening API & Discord Bot Integration

**Shortify** is a modular, API‑first URL‑shortening service designed for multi‑platform consumption.  
This repository (`shortify-backend`) houses the **backend API** and EJS‑powered web dashboard.  

It is consumed by two clients:

- 🖥️ **Web Client** (EJS views)  
- 🤖 **Discord Bot**: [`shortify-discord-bot`](https://github.com/your-username/shortify-discord-bot)  

---

## 🔌 Quickstart: How to Consume the API

Use any HTTP client (browser, `fetch`, Discord bot, mobile) against:

```js
const BASE = "https://your-backend.onrender.com";

// 1. Shorten a URL
fetch(`${BASE}/url`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ URL: "https://example.com" })
})
  .then(res => res.text())
  .then(shortUrl => console.log("Short URL:", shortUrl));

// 2. View analytics
fetch(`${BASE}/url/analytics/SHORTCODE`)
  .then(res => res.json())
  .then(data => console.log("Analytics:", data));
```

## 🚀 Key Features

- **Secure Authentication**  
  - JWT tokens in HTTP‑only cookies  
  - Role‑based access control (`NORMAL`, `ADMIN`)
- **URL Shortening**  
  - Generates unique 6‑char codes via `shortid`  
  - Stores original & short URL pairs in MongoDB
- **Analytics & Tracking**  
  - Logs timestamped visits  
  - Retrieve total click count and history
- **Multi‑Client API**  
  - REST endpoints usable by web, bots, mobile, CLI, etc.
- **EJS‑Backed Web UI**  
  - Signup / Login  
  - Dashboard for URL management
- **Discord Bot Integration**  
  - `/create <longURL>` → returns a short link  
  - Consumes the same REST API endpoints

---

## 📁 Project Structure
```
shortify-backend/
├── controllers/
│ ├── url.controller.js
│ └── user.controller.js
├── middlewares/
│ └── auth.middleware.js
├── models/
│ ├── url.model.js
│ └── user.model.js
├── routes/
│ ├── staticRouter.js
│ ├── url.router.js
│ └── user.router.js
├── service/
│ └── auth.service.js
├── views/
│ ├── home.ejs
│ ├── login.ejs
│ └── signup.ejs
├── connection.js
├── config.js
├── index.js
├── package.json
└── .env # (gitignored)
```





---

## 🔧 Local Development

1.Clone & install
```
git clone https://github.com/your-username/shortify-backend.git
cd shortify-backend
npm install
```

2.Create a .env
```
PORT=3001
MONGODB_URI=<your_mongo_URI>
DB_NAME=shortify
ACCESS_TOKEN_SECRET=<strong_jwt_secret>
ACCESS_TOKEN_EXPIRY=1d
```

3.Run
```
npm run dev    # for development (nodemon)
npm start      # for production
```

4.Register Discord commands (once, from your bot folder):
```
node ../shortify-discord-bot/command.js
```

## 📦 Deployment on Render
Push this repo to GitHub (shortify-backend).

On Render.com, create a Web Service:

     -Build Command: npm install

     -Start Command: npm start
   
Add your Environment Variables in the Render dashboard (same keys as your local .env).

Deploy and note your live URL:
```
https://shortify-backend.onrender.com
```

## 🤝 Related Projects

- **Discord Bot**: [shortify-discord-bot](https://github.com/SHISHIR1507/shortify-discord-bot)  
  Connects to this backend to shorten URLs directly in Discord.
