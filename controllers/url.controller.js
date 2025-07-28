import shortid from "shortid";
import { URL } from "../models/url.model.js";

const handleGenerateNewShortUrl = async (req, res) => {
    const body = req.body;
    if (!body.URL) {
        return res.status(400).json({ error: "URL is required" });
    }
    const generatedid= shortid.generate()
    await URL.create({
        shortUrl: generatedid,
        originalUrl: body.URL,
        visitHistory: [],
        createdBy: req.user._id // Assuming req.user is set by the restrictToLoggedInUserOnly middleware
    });
    return res.render("home.ejs", {
        id : generatedid,
        host:req.headers.host,
    })
}

const handleGetAnalytics = async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const result = await URL.findOne({ shortUrl });
    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        visitHistory: result.visitHistory
    });
}

export { handleGenerateNewShortUrl, handleGetAnalytics };

