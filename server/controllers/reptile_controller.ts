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
    if (typeof(req.body.sex) === "string" && typeof(req.body.species) === "string" && typeof(req.body.name) === "string") {
        if (req.body.sex.toLowerCase() === 'm' || req.body.sex.toLowerCase() === 'f') {
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
  });
  
  router.put("/:id", authMiddleware, async (req, res) => {
    const reptileToUpdate = await db.reptile.findUnique({
        where: {
            id: +req.params.id,
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
    if (typeof(req.body.sex) === "string" && typeof(req.body.species) === "string" && typeof(req.body.name) === "string") {
        if (req.body.sex.toLowerCase() === "m" || req.body.sex.toLowerCase() === "f") {
            req.body.id = +req.params.id;
            const reptile = await reptilesRepository.updateReptile(req.body);
    
            res.json({reptile: reptile});
        }
        else {
            res.status(400).json({error: req.body.sex + " is not a valid sex"});
        }
    }
    else {
        res.status(400).json({error: "request format is {sex: string, species: string, name: string}"});
    }
    
  });

  router.delete("/:id", authMiddleware, async (req, res) => {

    const reptileId = +req.params.id;

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
}});

  return router;
}

