import statusCode from "http-status-codes";
import AppError from "../../error/AppError";
import { TSkill } from "./skill.interface";
import { Skill } from "./skill.model";

const createSkillIntoDB = async (payload: TSkill) => {
  const skill = await Skill.findOne({ name: payload?.name });
  if (skill) {
    throw new AppError(statusCode.CONFLICT, "This skill already exists");
  }

  const result = await Skill.create(payload);
  return result;
};

const getAllSkillsFromDB = async () => {
  const result = await Skill.find({ isDeleted: false });

  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Skills not found!");
  }

  return result;
};

const updateSkillIntoDB = async (id: string, payload: Partial<TSkill>) => {
  const skill = await Skill.findById(id);
  if (!skill) {
    throw new AppError(statusCode.NOT_FOUND, "Skill not found !");
  }

  // find Skill and update
  const result = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Failed to update Skill ");
  }

  return result;
};

const deleteSkillIntoDB = async (SkillId: string) => {
  const skill = await Skill.findById(SkillId);
  if (!skill) {
    throw new AppError(statusCode.NOT_FOUND, "Skill not found !");
  }

  const result = await Skill.findByIdAndUpdate(
    SkillId,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Failed to delete Skill ");
  }

  return result;
};

export {
  createSkillIntoDB,
  deleteSkillIntoDB,
  getAllSkillsFromDB,
  updateSkillIntoDB,
};
