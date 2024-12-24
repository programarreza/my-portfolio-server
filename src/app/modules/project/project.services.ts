import statusCode from "http-status-codes";
import AppError from "../../error/AppError";
import { TProject } from "./project.interface";
import { Project } from "./project.model";

const createProjectIntoDB = async (payload: TProject) => {
  const project = await Project.findOne({ title: payload?.title });
  if (project) {
    throw new AppError(statusCode.CONFLICT, "This project already exists");
  }

  const result = await Project.create(payload);
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await Project.find({ isDeleted: false });

  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Projects not found!");
  }

  return result;
};

const getSingleProjectFromDB = async (projectId: string) => {
  const result = await Project.findById(projectId);

  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Projects not found!");
  }

  return result;
};

const updateProjectIntoDB = async (id: string, payload: Partial<TProject>) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new AppError(statusCode.NOT_FOUND, "Project not found !");
  }

  // find project and update
  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Failed to update project ");
  }

  return result;
};

const deleteProjectIntoDB = async (projectId: string) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError(statusCode.NOT_FOUND, "Project not found !");
  }

  const result = await Project.findByIdAndUpdate(
    projectId,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Failed to delete project ");
  }

  return result;
};

export {
  createProjectIntoDB,
  deleteProjectIntoDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  updateProjectIntoDB,
};
