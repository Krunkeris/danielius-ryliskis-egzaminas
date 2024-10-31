const Post = require("../models/Posts");

const getAllPosts = async (req, res) => {
  console.log("Fetching all posts...");
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

const getPostById = async (req, res) => {
  console.log(`Fetching post with ID: ${req.params.id}`);
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};

const createPost = async (req, res) => {
  console.log("Creating a new post...");
  try {
    const { userId, name, category, description, price, imageUrl } = req.body;
    const newPost = new Post({
      userId,
      name,
      category,
      description,
      price,
      imageUrl,
      authorId: req.user.id,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

const updatePost = async (req, res) => {
  console.log(`Updating post with ID: ${req.params.id}`);
  try {
    const { name, category, description, price, imageUrl, status } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { name, category, description, price, imageUrl, status },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

const deletePost = async (req, res) => {
  console.log(`Deleting post with ID: ${req.params.id}`);
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    console.log("postid", postId);
    console.log("userId", userId);

    const post = await Post.findById(postId);
    console.log("Post found:", post);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userIndex = post.likes.indexOf(userId);

    if (userIndex !== -1) {
      post.likes.splice(userIndex, 1);
      await post.save();
      return res.status(200).json({ message: "Post unliked", post });
    }

    post.likes.push(userId);

    await post.save();

    res.status(200).json({ message: "Post liked", post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error liking/unliking post", error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
