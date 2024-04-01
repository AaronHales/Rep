import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { PrismaClient } from "@prisma/client";
import { FeedingRepository } from "../repositories/feeding_respository";

export const buildFeedingController = (db: PrismaClient, feedingRespository : FeedingRepository) => {
  const router = Router();

  router.post("/:reptileId", authMiddleware, async (req, res) => {
    if (req.body.foodItem !== null) {
        try {
            req.body.reptileId = +req.params.reptileId;
            const feeding = await feedingRespository.createFeeding(req.body);
            res.json({feeding});
        }
        catch (error) {
            res.status(500).json({error: "encountered an while while trying to crate foodItem " + error});
        }
    }
    else {
        res.status(400).json({error: "request format is {foodItem: string}"});
    }
  });

  router.put("/:feedingId", authMiddleware, async (req, res) => {
    try {
        const id = +req.params.feedingId;
        const feeding = await db.feeding.findUniqueOrThrow({
            where: {
                id: id,
            }
        });
        if (!(req.body.foodItem === null) && typeof(req.body.foodItem) === "string") { 
            const newFeeding = await db.feeding.update({
                where: {
                    id: id,
                },
                data: {
                    foodItem: req.body.foodItem
                }
            });
            res.json({feeding: newFeeding});
        }
        else {
            res.status(400).json({error: "request format is {foodItem: string}"});
        }

    }
    catch (error) {
        console.error("Error updating feeding:", error);
        return res.status(500).json({ error: "An unexpected error occurred" + error });
    }
  });

  router.delete("/:feedingId", authMiddleware, async (req, res) => {
    try {
        const feedingDeleted = await db.feeding.delete({
            where: {
                id: +req.params.feedingId,
            }
        });
        res.json({feeding: feedingDeleted});
    }
    catch (error) {
        console.error("Error deleting feeding:", error);
        return res.status(500).json({ error: "An unexpected error occurred" + error });
    }
  });

  return router;
}

