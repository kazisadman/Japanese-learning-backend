import errorHandler from "../../utils/errorHandler";
import { generateAccessToken } from "./user.controller";
import { TRegisterUser } from "./user.interface";
import User from "./user.model";

const findUserInDb = async (payload: string) => {
  const result = await User.findOne({ payload });
  return result;
};

const createUserInDb = async (payload: TRegisterUser) => {
  const result = await User.create(payload);
  if (result) {
    const token = generateAccessToken(result._id, result.email);
    result.accessToken = token;
    await result.save();
    const userInfo = await User.findById(result._id).select("-password ");

    return userInfo;
  } else {
    throw new errorHandler(500, "Something went wrong while registering user");
  }
};

export const userService = { findUserInDb, createUserInDb };
