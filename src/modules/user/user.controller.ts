import asyncHandler from "../../utils/asyncHandler";
import errorHandler from "../../utils/errorHandler";
import responseHandler from "../../utils/responseHandler";
import { userService } from "./user.service";
import { userRegistrationValidation } from "./user.validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

const generateAccessToken = (
  _id: Types.ObjectId,
  email: String,
  role: String | undefined
) => {
  return jwt.sign(
    {
      _id,
      email,
      role,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, image, password } = req.body;

  if ([name, email, image, password].some((input) => input?.trim() === "")) {
    throw new errorHandler(400, "Input field is empty");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userInfo = { name, email, image, password: hashedPassword };

  const validatedData = userRegistrationValidation.parse(userInfo);

  const matchUser = await userService.findUserInDb(validatedData.email);

  if (matchUser) {
    throw new errorHandler(409, "Username or email already exits.");
  }

  const createUser = await userService.createUserInDb(validatedData);

  res
    .status(200)
    .json(
      new responseHandler(
        200,
        true,
        createUser,
        "User registered successfully!"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const matchedUser = await userService.findUserInDb(email);

  if (!matchedUser) {
    throw new errorHandler(404, "User do not exist.");
  }

  const encryptedPassword = matchedUser?.password as string;
  const isPasswordCorrect = await bcrypt.compare(password, encryptedPassword);
  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new errorHandler(401, "Password is incorrect.");
  }
  console.log("yes");
  const accessToken = generateAccessToken(
    matchedUser?._id,
    matchedUser?.email,
    matchedUser?.role
  );

  const loginUserInfo = await userService.findUserByIdInDb(matchedUser?._id);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new responseHandler(
        200,
        true,
        loginUserInfo,
        "User logedin successfully!"
      )
    );
});

const logOutUser = asyncHandler(async (req: any, res) => {
  const userId = req.user._id;
  await userService.logOutUserFromDb(userId);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new responseHandler(200, true, {}, "User logged out successfully"));
});

export const userController = { registerUser, loginUser, logOutUser };
