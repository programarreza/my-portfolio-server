import  StatusCodes  from "http-status-codes";
import { TUserRole } from "../modules/user/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import AppError from "../error/AppError";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Extract token from header
    const token = authHeader;

    // check token validity
    const decoded = jwt.verify(
      token as string,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { email, role } = decoded;

    // checking user exist
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
    }

    // check if the role is permitted
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;