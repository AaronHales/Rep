import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authentication";

// /users/...
export const buildReptileController = (db: PrismaClient) => {
  const router = Router();

  router.get("/", authMiddleware, async (req, res) => {
    const reptiles = await db.reptile.findMany({
        where: {userId: req.user?.id}
    });
    res.json({ reptiles });
  });

  return router;
}

