import mongoose from "mongoose";
const blogModel = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://www.salesforce.com/content/dam/blogs/ca/Blog%20Posts/anatomy-of-a-blog-post-deconstructed-header.jpg",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const BlogPost = new mongoose.model("BlogPost", blogModel);
export const RequestBlog = new mongoose.model("RequestBlog", blogModel);

export default BlogPost;