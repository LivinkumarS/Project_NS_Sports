import Post from "../Models/blog.model.js";
import { RequestBlog } from "../Models/blog.model.js";
import { errorHandler } from "../Utils/error.js";

export const createBlog = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(401, "All Fields Are Required..1"));
  }
  const slug =
    req.body.title.replace(" ", "-").replace(/[^a-zA-Z0-9-]/g, "-") +
    new Date()
      .toLocaleString()
      .replace(" ", "-")
      .replace(/[^a-zA-Z0-9-]/g, "-") +
    req.body.authorName.replace(" ", "-").replace(/[^a-zA-Z0-9-]/g, "-");
  if (req.user.isAdmin) {
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (error) {
      next(errorHandler(402, error.message));
    }
  } else {
    const newPost = new RequestBlog({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    try {
      const savedPost = await newPost.save();
      res
        .status(200)
        .json({ message: "Request Sent Successfully!", ...savedPost });
    } catch (error) {
      next(errorHandler(402, error.message));
    }
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = (currentPage - 1) * limit;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const filterQuery = {
      ...(req.query.search && {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { content: { $regex: req.query.search, $options: "i" } },
        ],
      }),
      ...(req.query.author && {
        authorName: { $regex: req.query.author, $options: "i" },
      }),
    };

    const posts = await Post.find(filterQuery)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments(filterQuery);

    const lastMonthDate = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    );
    const lastMonthPosts = await Post.countDocuments({
      updatedAt: { $gte: lastMonthDate },
    });

    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      posts,
      totalPosts,
      totalPages,
      lastMonthPosts,
    });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    console.log(req.user.isAdmin, req.user.id, req.params.userId);

    return next(
      errorHandler(400, "You Are Not Allowed To Delete this Post...!")
    );
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Delete Success...!" });
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};

export const getBlog = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOne({ slug });

    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    next(errorHandler(400, "You Are Not Verified!"));
  }
};

//Request Blog Controllers.

export const getRequestBlogs = async (req, res, next) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = (currentPage - 1) * limit;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const filterQuery = {
      ...(req.query.search && {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { content: { $regex: req.query.search, $options: "i" } },
        ],
      }),
      ...(req.query.author && {
        authorName: { $regex: req.query.author, $options: "i" },
      }),
    };

    const posts = await RequestBlog.find(filterQuery)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await RequestBlog.countDocuments(filterQuery);

    const lastMonthDate = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    );
    const lastMonthPosts = await RequestBlog.countDocuments({
      updatedAt: { $gte: lastMonthDate },
    });

    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      posts,
      totalPosts,
      totalPages,
      lastMonthPosts,
    });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const deleteRequestBlog = async (req, res, next) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const deletedPost = await RequestBlog.findByIdAndDelete(_id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};


export const getRequestBlog = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const post = await RequestBlog.findOne({ slug });
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    next(errorHandler(400, "You Are Not Verified!"));
  }
};