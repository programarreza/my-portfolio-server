import statusCode from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createSkillIntoDB,
  deleteSkillIntoDB,
  getAllSkillsFromDB,
  updateSkillIntoDB,
} from "./skill.services";

const createSkill = catchAsync(async (req, res) => {
  const result = await createSkillIntoDB({
    ...req.body,
    icon: req.file?.path,
  });

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Skill created successfully",
    data: result,
  });
});

const getAllSkills = catchAsync(async (req, res) => {
  const result = await getAllSkillsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Skills is retrieved successfully",
    data: result,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const { skillId } = req.params;
  const result = await updateSkillIntoDB(skillId, {
    ...req.body,
    icon: req.file?.path,
  });

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Skills is updated successfully",
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const { skillId } = req.params;
  await deleteSkillIntoDB(skillId);

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Skills is deleted successfully",
    data: null,
  });
});

export { createSkill, deleteSkill, getAllSkills, updateSkill };
