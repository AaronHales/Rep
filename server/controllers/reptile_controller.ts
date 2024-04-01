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

  router.get("/:reptileId", authMiddleware, async (req, res) => {
    const reptile = await db.reptile.findUnique({
        where: {
            userId: req.user?.id,
            id: +req.params.reptileId
        },
        include: {
          schedules: true,
          feedings: true,
          husbandryRecords: true
        }
    });
    res.json({ reptile});
  });

  router.post("/", authMiddleware, async (req, res) => {
    try {
        if (req.body.sex.toLowerCase() === 'm' || req.body.sex.toLowerCase() === 'f') {
            req.body.userId = req.user?.id;
            const reptile = await reptilesRepository.createReptile(req.body);
            
            res.json({reptile: reptile});
            
        }
        else {
            res.status(400).json({error: req.body.sex + " is not a valid sex"});
        }
    }
    catch (error) {
        res.status(500).json({error: "error encountered while creating reptile " + error});
    }
  });
  
  router.put("/:reptileId", authMiddleware, async (req, res) => {
    const reptileToUpdate = await db.reptile.findUniqueOrThrow({
        where: {
            id: +req.params.reptileId,
        }
    });
    if (req.body.sex === null) {
        req.body.sex = reptileToUpdate?.sex;
    }
    if (req.body.name === null) {
        req.body.name = reptileToUpdate?.name;
    }
    if (req.body.species === null) {
        req.body.species = reptileToUpdate?.sex;
    }
    try {
        if (req.body.sex.toLowerCase() === "m" || req.body.sex.toLowerCase() === "f") {
            req.body.id = +req.params.reptileId;
            const reptile = await reptilesRepository.updateReptile(req.body);
    
            res.json({reptile: reptile});
        }
        else {
            res.status(400).json({error: req.body.sex + " is not a valid sex"});
        }
    }
    catch (error) {
        res.status(500).json({error: "error encountered while updating reptile " + error});
    }
    
  });

  router.delete("/:reptileId", authMiddleware, async (req, res) => {

    const reptileId = +req.params.reptileId;

    try {
        const reptile = await db.reptile.findUnique({
            where: {
                id: reptileId
            }
        });

        if (!reptile) {
            return res.status(404).json({ error: "Reptile not found" });
        }

        // Delete related records first
        await db.schedule.deleteMany({
            where: {
                reptileId: reptileId
            }
        });

        await db.husbandryRecord.deleteMany({
            where: {
                reptileId: reptileId
            }
        });

        await db.feeding.deleteMany({
            where: {
                reptileId: reptileId
            }
        });

        // Then delete the reptile
        const deletedReptile = await db.reptile.delete({
            where: {
                id: reptileId
            }
        });

        return res.json({ deletedReptile: deletedReptile });
    } 
    catch (error) {
        console.error("Error deleting reptile:", error);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
  });

  return router;
}

