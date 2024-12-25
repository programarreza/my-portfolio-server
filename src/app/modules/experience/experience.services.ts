import StatusCodes from "http-status-codes";
import AppError from "../../error/AppError";
import { TExperience } from "./experience.interface";
import { Experience } from "./experience.model";

const createExperienceIntoDB = async (payload: TExperience) => {
  const project = await Experience.findOne({ content: payload?.content });
  if (project) {
    throw new AppError(StatusCodes.CONFLICT, "This experience already exists");
  }

  const result = await Experience.create(payload);
  return result;
};

export { createExperienceIntoDB };
