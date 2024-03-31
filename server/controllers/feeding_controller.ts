import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { PrismaClient } from "@prisma/client";
import { FeedingRepository } from "../repositories/feeding_respository";

export const buildFeedingController = (db: PrismaClient, feedingRespository : FeedingRepository) => {
  const router = Router();

  router.post("/:reptileId", authMiddleware, async (req, res) => {
    if (req.body.foodItem == null) {
        if (typeof req.body.foodItem === "string") {
            req.body.reptileId = +req.params.reptileId;
            const feeding = await feedingRespository.createFeeding(req.body);
            res.json({feeding});
        }
        else {
            res.status(400).json({error: "request format is {foodItem: string}"});
        }
    }
    else {
        res.status(400).json({error: "request format is {foodItem: string}"});
    }
  });

  return router;
}

