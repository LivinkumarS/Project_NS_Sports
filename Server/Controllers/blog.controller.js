import Post from "../Models/blog.model.js";
import { errorHandler } from "../Utils/error.js";

export const createBlog = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(401, "Admin Only Can Post..!"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(401, "All Fields Are Required..1"));
  }
  const slug = req.body.title.replace(" ", "-").replace(/[^a-zA-Z0-9-]/g, "-");
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
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const startIndex = req.query.startIndex || 0;
    const limit = req.query.limit || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const lastMonthDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      updatedAt: { $gte: lastMonthDate },
    });

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
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
  if (!req.user) {
    return next(400, "You Are Not Verified!");
  }

  try {
    const post = await Post.findById(req.params.postId);

    res.status(200).json({ hi: "post" });
  } catch (error) {
    console.log(error.message);
  }
};
