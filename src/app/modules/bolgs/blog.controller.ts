import statusCode from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createBlogIntoDB,
  deleteBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
} from "./blog.services";

const createBlog = catchAsync(async (req, res) => {
  const result = await createBlogIntoDB({
    ...req.body,
    image: req.file?.path,
  });

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await getAllBlogsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Blogs is retrieved successfully",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await getSingleBlogFromDB(blogId);

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Blog is retrieved successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await updateBlogIntoDB(blogId, {
    ...req.body,
    image: req.file?.path,
  });

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Blogs is updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  await deleteBlogIntoDB(blogId);

  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Blogs is deleted successfully",
    data: null,
  });
});

export { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog };
