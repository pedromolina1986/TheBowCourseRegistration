import jwt from "jsonwebtoken";


export function verifyToken(req, res, next) {
  let token;

  // Try Authorization header first
  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    
    if (parts.length === 2 && parts[0] === "Bearer") token = parts[1];
  }

  // Fallback to cookie
  if (!token && req.cookies?.token) token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach { id, user_type } to req
    next();
  } catch (err) {
    console.error("verifyToken:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}


// Middleware to check if user is admin
export function authorizeAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.user.user_type.toLowerCase() !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }

  next();
}
