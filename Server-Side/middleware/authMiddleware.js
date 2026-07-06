import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.accessToken;

        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};
