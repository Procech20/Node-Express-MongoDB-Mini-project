const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// --------------------- Getting all posts------------------------ //
// Method: "GET"
// Route: "/posts"
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// --------------------- Creating a post------------------------ //
// Method: "POST"
// Route: "/posts"
router.post("/posts", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  await post.save();
  res.send(post);
});

// --------------------- Getting single posts------------------------ //
// Method: "GET"
// Route: "/posts/:id"
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

// --------------------- Updating post------------------------ //
// Method: "PATCH"
// Route: "/posts/:id"
router.patch("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

// --------------------- Deleting post------------------------ //
// Method: "DELETE"
// Route: "/posts/:id"
router.delete("/posts/:id", async (req, res) => {
  try {
    const message = 'Post deleted successfully'
    await Post.deleteOne({ _id: req.params.id });
    res.status(204);
    res.send({message});
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

module.exports = router;
