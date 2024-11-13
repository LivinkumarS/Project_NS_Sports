import jwt from "jsonwebtoken";

export default function authenticateToken(req, res, next) {
  if (!req.headers) return res.status(401).json({ message: "No token provided" });
  const token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}
