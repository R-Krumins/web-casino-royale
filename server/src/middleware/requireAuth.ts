import jwt from "jsonwebtoken";
const log = require("../lib/logger")();
const { User } = require("../models/userModel");
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
}

if (!process.env.SECRET) {
  throw new Error("Secret not set in .env !");
}

const secret = String(process.env.SECRET);

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const { id } = jwt.verify(token, secret) as JwtPayload;
      req.body.user = await User.findOne({ _id: id });
      next();
      return;
    } catch (err) {
      log.warn(err);
    }
  }
  res.status(403).send({ error: "Access forbiden." });
}

module.exports = requireAuth;
