import statusCode from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
  const blog = await Blog.findOne({ content: payload?.content });
  if (blog) {
    throw new AppError(statusCode.CONFLICT, "This blog already exists");
  }

  const result = await Blog.create(payload);
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const itemQuery = new QueryBuilder(Blog.find(), query)
    .search(["content"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await itemQuery.modelQuery;
  const meta = await itemQuery.countTotal();

  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Content not found!");
  }

  return { result, meta };
};

const getSingleBlogFromDB = async (BlogId: string) => {
  const result = await Blog.findById(BlogId);

  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Blogs not found!");
  }

  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(statusCode.NOT_FOUND, "Blog not found !");
  }

  // find Blog and update
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Failed to update Blog ");
  }

  return result;
};

const deleteBlogIntoDB = async (BlogId: string) => {
  const blog = await Blog.findById(BlogId);
  if (!blog) {
    throw new AppError(statusCode.NOT_FOUND, "Blog not found !");
  }

  const result = await Blog.findByIdAndUpdate(
    BlogId,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw new AppError(statusCode.NOT_FOUND, "Failed to delete Blog ");
  }

  return result;
};

export {
  createBlogIntoDB,
  deleteBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
};
