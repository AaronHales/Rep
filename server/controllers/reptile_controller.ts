import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { ReptilesRepository } from "../repositories/reptiles_respository";

// /reptile/...
export const buildReptileController = (db: PrismaClient, reptilesRepository: ReptilesRepository) => {
  const router = Router();

  router.get("/", authMiddleware, async (req, res) => {
    const reptiles = await db.reptile.findMany({
        where: {userId: req.user?.id}
    });
    res.json({ reptiles });
  });

  router.get("/:id", authMiddleware, async (req, res) => {
    const reptile = await db.reptile.findUnique({
        where: {userId: req.user?.id, id: +req.params.id},
        include: {
          schedules: true,
          feedings: true,
          husbandryRecords: true
        }
    });
    res.json({ reptile});
  });

  router.post("/", authMiddleware, async (req, res) => {
    if (typeof req.body.sex === "string" && typeof req.body.species === "string" && typeof req.body.name === "string") {
        if (req.body.sex == 'm' || req.body.sex == 'M' || req.body.sex == 'f' || req.body.sex == 'F') {
            req.body.userId = req.user?.id;
            const reptile = await reptilesRepository.createReptile(req.body);
            
            res.json({reptile: reptile});
            
        }
        else {
            res.status(400).json({error: req.body.sex + " is not a valid sex"});
        }
    }
    else {
        res.status(400).json({error: "request format is {sex: string, species: string, nane: string}"});
    }
  })

  return router;
}

