import fs from "fs";
import path from "path";

export async function addAuth(projectName) {
  const authMiddleware = `
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
`;
  fs.writeFileSync(
    path.join(process.cwd(), "src", "middlewares", "authMiddleware.js"),
    authMiddleware.trim()
  );
}
