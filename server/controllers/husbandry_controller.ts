import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { PrismaClient } from "@prisma/client";
import { HusbandryRepository } from "../repositories/husbandry_respository";

export const buildHusbandryController = (db: PrismaClient, husbandryRespository: HusbandryRepository) => {
  const router = Router();

  router.post("/:reptileId", authMiddleware, async (req, res) => {
    if (typeof req.body.length === "number" && typeof req.body.weight === "number" && typeof req.body.temperature === "number" && typeof req.body.humidity === "number") {
        req.body.reptileId = +req.params.reptileId;
        const husbandryRecord = await husbandryRespository.createHusbandry(req.body);
        res.json({husbandryRecord});
    }
    else {
        res.status(400).json({error: "request format is {length: number, weight: number, temperature: number, humidity: number}"});
    }
  });

  return router;
}

