
import jwt from "jsonwebtoken";

export async function tokenValidator(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    const secretKey = process.env.JWT_SECRET;

    if (!token) {
        res.status(401).send("unauthorized")
    }

    const user = jwt.verify(token, secretKey);
    if (!user) {
        res.status(404).send("User not found")
    }

    res.locals.user = (user);
    next();
}