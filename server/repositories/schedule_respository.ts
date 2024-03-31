import { PrismaClient} from "@prisma/client";

export type CreateSchedulePayload = {
  type: string,
  description: string,
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
  sunday: boolean,
  reptileId: number,
  userId: number,
}

export class ScheduleRepository {
  private db: PrismaClient
  private static instance: ScheduleRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): ScheduleRepository {
    if (!this.instance) {
      this.instance = new ScheduleRepository(db!!);
    }
    return this.instance;
  }


  async createSchedule({type, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday, reptileId, userId}: CreateSchedulePayload) {
    return this.db.schedule.create({
      data: {
        type: type,
        description: description,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday,
        sunday: sunday,
        reptileId: reptileId,
        userId: userId
      }
    });
  }

  async getScheduleById(id: number) {
    return this.db.schedule.findUnique({
      where: {
        id: id
      },
    });
  }
}