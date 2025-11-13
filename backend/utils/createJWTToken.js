import jwt from "jsonwebtoken";

export const createJWTToken = (user) => {
  const sign = {
    id: user._id,
    role: user.role,
  };
  return jwt.sign(sign, process.env.JWT_SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
