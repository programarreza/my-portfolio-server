import StatusCodes from "http-status-codes";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";

const signup = catchAsync(async (req, res) => {
  const result = await AuthServices.signup({
    ...req.body,
    image: req.file?.path,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);
  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Refresh token is retrieved Successfully",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await AuthServices.forgetPasswordIntoDB(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reset link is generated Successfully",
    data: result,
  });
});

export { signup, login, refreshToken, forgetPassword };
