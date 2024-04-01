import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { PrismaClient } from "@prisma/client";
import { ScheduleRepository } from "../repositories/schedule_respository";

export const buildScheduleController = (db: PrismaClient, scheduleRepository: ScheduleRepository) => {
  const router = Router();

  router.get("/:reptileId", authMiddleware, async (req, res) => {
    const schedule = await db.schedule.findFirstOrThrow({
        where: {
            userId: req.user?.id,
            reptileId: +req.params?.reptileId,
        }
    });
    res.json({schedule});
  });

  router.post("/:reptileId", authMiddleware, async (req, res) => {
    if (req.body.type === null || req.body.description === null || req.body.monday === null || req.body.tuesday === null || req.body.wednesday === null || 
        req.body.thursday === null || req.body.friday === null || req.body.saturday === null || req.body.sunday === null) {
            res.status(400).json({error: "request format is {type: string, description: string, monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean, saturday: boolean, sunday: boolean}"})
    }
    try {
        if (req.body.type.toLowerCase() === "clean" || req.body.type.toLowerCase() === "feed" || req.body.type.toLowerCase() === "record") {
            req.body.userId = req.user?.id;
            req.body.reptileId = +req.params.reptileId;
            const schedule = await scheduleRepository.createSchedule(req.body);  
            res.json({schedule: schedule});
        }
        else {
            res.status(400).json({error: req.body.type + " is not a valid schedule type"});
        }
    }
    catch (error) {
        res.status(500).json({error: "encountered an error when creating schedule" + error});

    }
  });

    router.put("/:scheduleId", authMiddleware, async (req, res) => {
        try {
            const id = +req.params.scheduleId;
            req.body.id = id;
            const schedule = await db.schedule.findUniqueOrThrow({
                where: {
                    id: id,
                }
            });
            if (req.body.type === null) {
                req.body.type = schedule.type;
            }
            if (req.body.description === null) {
                req.body.description = schedule.description;
            }
            if (req.body.monday === null) {
                req.body.monday = schedule.monday;
            }
            if (req.body.tuesday === null) {
                req.body.tuesday = schedule.tuesday;
            }
            if (req.body.wednesday === null) {
                req.body.wednesday = schedule.wednesday;
            }
            if (req.body.thursday === null) {
                req.body.thursday = schedule.thursday;
            }
            if (req.body.friday === null) {
                req.body.friday = schedule.friday;
            }
            if (req.body.saturday === null) {
                req.body.saturday = schedule.saturday;
            }
            if (req.body.sunday === null) {
                req.body.sunday = schedule.sunday;
            }
            if (req.body.type.toLowerCase() === "clean" || req.body.type.toLowerCase() === "feed" || req.body.type.toLowerCase() === "record") {
                const newSchedule = await scheduleRepository.updateSchedule(req.body);  
                res.json({schedule: newSchedule});
            }
            else {
                res.status(400).json({error: req.body.type + " is not a valid schedule type"});
            }
        }
        catch (error) {
            console.error("Error updating schedule:", error);
            return res.status(500).json({ error: "An unexpected error occurred" + error });
        }
    });

    router.delete("/:scheduleId", authMiddleware, async (req, res) => {
        try {
            const scheduleDelete = await db.schedule.delete({
                where: {
                    id: +req.params.scheduleId,
                }
            });
            res.json({schedule: scheduleDelete});
        }
        catch (error) {
            console.error("Error deleting schedule:", error);
            return res.status(500).json({ error: "An unexpected error occurred" + error })
        }
    });


  return router;
}

