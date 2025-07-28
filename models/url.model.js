import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        trim: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    visitHistory: [{timestamp:{type:Number}}],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
},
{
    timestamps: true,
});

const URL = mongoose.model("url", urlSchema);
export { URL };