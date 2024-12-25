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

const getAllExperienceFromDB = async () => {
  const result = await Experience.find({ isDeleted: false });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Experience not found!");
  }

  return result;
};

const updateExperienceIntoDB = async (id: string, payload: Partial<TExperience>) => {
  const project = await Experience.findById(id);
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, "Experiences not found !");
  }

  // find Experience and update
  const result = await Experience.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Failed to update experience ");
  }

  return result;
};

export { createExperienceIntoDB, getAllExperienceFromDB , updateExperienceIntoDB};
