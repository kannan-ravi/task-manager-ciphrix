import jwt from "jsonwebtoken";
import { customError } from "./errorHandler.js";

export const verifyAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(customError(401, "Token Required, Authentication Failed"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
