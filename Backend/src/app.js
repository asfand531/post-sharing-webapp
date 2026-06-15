import express from "express";

// CORS (Cross-Origin Resource Sharing) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. In this case, we are allowing requests from "http://localhost:5173", which is where our frontend will be running.
import cors from "cors";

// Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. In this case, we will use it to handle image uploads for posts.
import multer from "multer";
import { uploadFile } from "./service/storage.service.js";
import { postModel } from "./models/post.model.js";

export const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/create-post", upload.single("image"), async (req, res) => {
  const result = await uploadFile(req.file.buffer);

  const post = await postModel.create({
    image: result.url,
    caption: req.body.caption,
  });

  return res.status(201).json({
    message: "Post created successfully",
    post,
  });
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find();

  return res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
});
