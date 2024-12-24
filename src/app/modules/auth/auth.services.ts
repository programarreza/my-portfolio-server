import statusCode from "http-status-codes";
import config from "../../config";
import AppError from "../../error/AppError";
import { verifyToken } from "../../utils/auth.utils";
import { sendEmail } from "../../utils/sendEmail";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";

const signup = async (payload: TUser) => {
  // create a user
  const user = await User.isUserExistsByEmail(payload?.email);
  if (user) {
    throw new AppError(statusCode.CONFLICT, "This user already exists");
  }

  const newUser = await User.create(payload);
  return newUser;
};

const login = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);
  if (!user) {
    throw new AppError(statusCode.NOT_FOUND, "user is not found!");
  }

  // checking  password
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(statusCode.FORBIDDEN, "Password do not matched!!");
  }

  const jwtPayload = {
    id: user?._id,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    image: user?.image,
    role: user?.role,
    address: user?.address,
  };

  // create access token & send
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  // create refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // check if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(statusCode.NOT_FOUND, "This user is not found!");
  }

  const jwtPayload = {
    id: user?._id,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    image: user?.image,
    role: user?.role,
    address: user?.address,
  };

  // create token and send to the client
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

const forgetPasswordIntoDB = async (email: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(statusCode.NOT_FOUND, "This user is not found!");
  }

  // checked if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(statusCode.FORBIDDEN, "This user is deleted! ");
  }

  const jwtPayload = {
    id: user?._id,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    image: user?.image,
    role: user?.role,
    address: user?.address,
  };

  // create token and send to the client
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );

  const resetUILink = `${config.reset_password_ui_link}?email=${user.email}&token=${resetToken}`;
  sendEmail(user.email, resetUILink);
};

export const AuthServices = {
  signup,
  login,
  refreshToken,
  forgetPasswordIntoDB,
};
