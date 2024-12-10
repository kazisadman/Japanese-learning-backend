import asyncHandler from "../../utils/asyncHandler";
import errorHandler from "../../utils/errorHandler";
import responseHandler from "../../utils/responseHandler";
import { userService } from "./user.service";
import { userRegistrationValidation } from "./user.validator";
import jwt from "jsonwebtoken";
import bcypt from "bcrypt";

export const generateAccessToken = (_id: String, email: String) => {
  return jwt.sign(
    {
      _id,
      email,
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

  const hashedPassword = await bcypt.hash(password, 10);

  const userInfo = { name, email, image, password: hashedPassword };

  const validatedData = userRegistrationValidation.parse(userInfo);

  const matchUser = await userService.findUserInDb(validatedData.email);

  if (matchUser) {
    throw new errorHandler(409, "Username or email already exits.");
  }

  const createUser = await userService.createUserInDb(validatedData);

  const accessToken = createUser?.accessToken;

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
        createUser,
        "User registered successfully!"
      )
    );
});

export const userController = { registerUser };
