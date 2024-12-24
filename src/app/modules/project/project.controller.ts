import statusCode from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createProjectIntoDB,
  deleteProjectIntoDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  updateProjectIntoDB,
} from "./project.services";

const createProject = catchAsync(async (req, res) => {
  const result = await createProjectIntoDB({
    ...req.body,
    image: req.file?.path,
  });

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await getAllProjectsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Projects is retrieved successfully",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await getSingleProjectFromDB(projectId);

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Projects is retrieved successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await updateProjectIntoDB(projectId, {
    ...req.body,
    image: req.file?.path,
  });

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Projects is updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  await deleteProjectIntoDB(projectId);

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Projects is deleted successfully",
    data: null,
  });
});

export {
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
};
