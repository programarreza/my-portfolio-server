import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createExperienceIntoDB,
  getAllExperienceFromDB,
} from "./experience.services";

const createExperience = catchAsync(async (req, res) => {
  const result = await createExperienceIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Experience created successfully",
    data: result,
  });
});

const getAllExperience = catchAsync(async (req, res) => {
  const result = await getAllExperienceFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Experiences is retrieved successfully",
    data: result,
  });
});

export { createExperience, getAllExperience };
