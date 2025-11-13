import { customError } from "../middleware/errorHandler.js";
import { UserModel } from "../models/User.js";
import bcrypt from "bcryptjs";
import isValidEmail from "../utils/isValidEmail.js";
import { createJWTToken } from "../utils/createJWTToken.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const isEmailExist = await UserModel.findOne({
      email: email,
    });

    if (isEmailExist) {
      return next(customError(409, "Email already exist, please login"));
    }

    if (!isValidEmail(email)) {
      return next(customError(400, "Must be a valid email address"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(customError(422, "All fields are required"));
    }
    const isUserExist = await UserModel.findOne({ email: email });

    if (!isUserExist) {
      return next(customError(400, "Invalid credentials"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordCorrect) {
      return next(customError(400, "Invalid credentials"));
    }

    const token = createJWTToken(isUserExist);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    const { password: _, ...user } = isUserExist._doc;
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(200).json({
        message: "User is not logged in",
        success: true,
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
