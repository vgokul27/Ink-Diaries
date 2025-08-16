import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        image: { type: String, default: "" },
        authorUid: { type: String, required: true },
        favorites: [{ type: String }],
    },
    { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);