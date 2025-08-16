import admin from "../firebase.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email || null
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
};
