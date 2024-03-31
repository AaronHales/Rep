import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { PrismaClient } from "@prisma/client";
import { ScheduleRepository } from "../repositories/schedule_respository";

export const buildScheduleController = (db: PrismaClient, scheduleRepository: ScheduleRepository) => {
  const router = Router();

  router.get("/:id", authMiddleware, async (req, res) => {
    const schedule = await db.schedule.findFirstOrThrow({
        where: {
            userId: req.user?.id,
            reptileId: +req.params?.id,
        }
    });
    res.json({schedule});
  });

  router.post("/:id", authMiddleware, async (req, res) => {
    if (req.body.type === null || req.body.description === null || req.body.monday === null || req.body.tuesday === null || req.body.wednesday === null || 
        req.body.thursday === null || req.body.friday === null || req.body.saturday === null || req.body.sunday === null) {
            res.status(400).json({error: "request format is {type: string, description: string, monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean, saturday: boolean, sunday: boolean}"})
    }
    else if (typeof(req.body.type) === "string" && typeof(req.body.description) === "string" && typeof(req.body.monday) === "boolean" && 
        typeof(req.body.tuesday) === "boolean" && typeof(req.body.wednesday) === "boolean" && typeof(req.body.thursday) === "boolean" && 
        typeof(req.body.friday) === "boolean" && typeof(req.body.saturday) === "boolean" && typeof(req.body.sunday) === "boolean") {
            if (req.body.type.toLowerCase() === "clean" || req.body.type.toLowerCase() === "feed" || req.body.type.toLowerCase() === "record") {
                req.body.userId = req.user?.id;
                req.body.reptileId = +req.params.id;
                const schedule = await scheduleRepository.createSchedule(req.body);  
                res.json({schedule: schedule});
                }
        
                else {
                    res.status(400).json({error: req.body.type + " is not a valid schedule type"});
                }
    }
    else {
        res.status(400).json({error: "request format is {type: string, description: string, monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean, saturday: boolean, sunday: boolean}"})

    }
  });

  router.put("/:id/add_to_reptile", authMiddleware, async(req, res) => {
    const scheduleToUpdate = await db.schedule.findUniqueOrThrow({
        where: {
            id: +req.params.id,
        }
    });
    scheduleToUpdate.reptileId = req.body.reptileId;
    res.json({schedule: scheduleToUpdate});
  });


  return router;
}

