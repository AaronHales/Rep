import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";
import { PrismaClient } from "@prisma/client";

export const buildUsersController = (db: PrismaClient, usersRepository: UsersRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const user = await usersRepository.createUser(req.body);

    const token = jwt.sign({
      userId: user.id,
    }, process.env.ENCRYPTION_KEY as string);

    res.json({ user, token });
  });

  router.get("/me", authMiddleware, async (req, res) => {
    const user = await db.user.findUnique({
      where: {
        id: req.user?.id,
      },
      include: {
        reptiles: true,
      }
    })
    res.json(user);
  });

  return router;
}

