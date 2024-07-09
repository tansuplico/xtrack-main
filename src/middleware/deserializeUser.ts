import { NextFunction, Request, Response } from "express";
import { getSession } from "../db/index.js";
import { signJWT, verifyJWT } from "../utils/jwt.utils.js";
import { User } from "../models/userSchema.js";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) {
    return next();
  }

  const { payload } = verifyJWT(accessToken);

  if (payload) {
    //@ts-ignore
    req.user = payload;
    return next();
  }

  if (payload === null && refreshToken) {
    const { payload: refresh, expired: refreshExpired } =
      verifyJWT(refreshToken);

    if (!refresh || refreshExpired) {
      return next();
    }

    //@ts-ignore
    const session = getSession(refresh.sessionId);

    if (!session) {
      return next();
    }

    const findUser = await User.findOne({ email: session.email });

    const newAccessToken = signJWT(
      { id: findUser?._id, sessionId: session.sessionId },
      "15m"
    );

    res.cookie("accessToken", newAccessToken, {
      maxAge: 900000,
      httpOnly: true,
      sameSite: "strict",
    });

    //@ts-ignore
    req.user = verifyJWT(newAccessToken).payload;

    return next();
  }

  return next();
};

export default deserializeUser;
