import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: String,
  caption: String,
});

export const postModel = mongoose.model("Post", postSchema);
