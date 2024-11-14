import Post from "../Models/news.model.js";
import { errorHandler } from "../Utils/error.js";

export const createNews = async (req, res, next) => {
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

export const getAllNews = async (req, res, next) => {
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
      ...(req.query.dateRange && {
        updatedAt: {
          $gte: getDateRange(req.query.dateRange),
        },
      }),
    };

    const posts = await Post.find(filterQuery)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments(filterQuery);
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      posts,
      totalPosts,
      totalPages,
    });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

const getDateRange = (range) => {
  const today = new Date();
  switch (range) {
    case "today":
      return new Date(today.setHours(0, 0, 0, 0));
    case "this-week":
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      return startOfWeek;
    case "this-month":
      return new Date(today.getFullYear(), today.getMonth(), 1);
    default:
      return new Date(0);
  }
};


export const deleteNews = async (req, res, next) => {
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

export const getNews = async (req, res, next) => {
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
