import Video from "../Models/video.model.js";

export const getVideos = async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;

  try {
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const videos = await Video.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalVideos = await Video.countDocuments(query);

    res.status(200).json({
      videos,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalVideos / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos", error });
  }
};

export const getVideoBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const video = await Video.findOne({ slug });
    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video", error });
  }
};

export const createVideo = async (req, res) => {
  const { title, videoURL, description, authorName } = req.body;

  if (!title || !videoURL) {
    return res
      .status(400)
      .json({ message: "Title and Video URL are required" });
  }

  try {
    const slug =
      title.replace(" ", "-").replace(/[^a-zA-Z0-9-]/g, "-") +
      new Date()
        .toLocaleString()
        .replace(" ", "-")
        .replace(/[^a-zA-Z0-9-]/g, "-") +
      authorName.replace(" ", "-").replace(/[^a-zA-Z0-9-]/g, "-");
    const newVideo = new Video({
      title,
      slug,
      videoURL,
      description,
      authorName,
    });

    await newVideo.save();

    res
      .status(201)
      .json({ message: "Video created successfully", video: newVideo });
  } catch (error) {
    res.status(500).json({ message: "Error creating video", error });
  }
};
