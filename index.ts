import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import { buildUsersController } from "./server/controllers/users_controller";
import { buildSessionsController } from "./server/controllers/sessions_controller";
import { buildHomeController } from "./server/controllers/home_controller";
import { UsersRepository } from "./server/repositories/users_respository";
import { buildReptileController } from "./server/controllers/reptile_controller";
import { ReptilesRepository } from "./server/repositories/reptiles_respository";
import { buildScheduleController } from "./server/controllers/schedule_controller";
import { ScheduleRepository } from "./server/repositories/schedule_respository";
import { HusbandryRepository } from "./server/repositories/husbandry_respository";
import { buildHusbandryController } from "./server/controllers/husbandry_controller";

const db = new PrismaClient();
const usersRepository = UsersRepository.getInstance(db);
const reptileReposity = ReptilesRepository.getInstance(db);
const scheduleRepository = ScheduleRepository.getInstance(db);
const husbandryRespository = HusbandryRepository.getInstance(db);

dotenv.config();

export const DEBUG = process.env.NODE_ENV !== "production";
export const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
    } else {
      next();
    }
  });
}

app.use("/", buildHomeController());
app.use("/users", buildUsersController(db, usersRepository));
app.use("/sessions", buildSessionsController(db));
app.use("/reptile", buildReptileController(db, reptileReposity));
app.use("/schedule", buildScheduleController(db, scheduleRepository));
app.use("/husbandry", buildHusbandryController(db, husbandryRespository))

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


