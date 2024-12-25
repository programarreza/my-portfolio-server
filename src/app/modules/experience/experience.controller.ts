import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createExperienceIntoDB } from "./experience.services";

const createExperience = catchAsync(async (req, res) => {
  const result = await createExperienceIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Experience created successfully",
    data: result,
  });
});

export { createExperience };
