import { PrismaClient} from "@prisma/client";

export type CreateHusbandryPayload = {
  length: number,
  weight: number,
  temperature: number,
  humidity: number,
  reptileId: number
}

export class HusbandryRepository {
  private db: PrismaClient
  private static instance: HusbandryRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): HusbandryRepository {
    if (!this.instance) {
      this.instance = new HusbandryRepository(db!!);
    }
    return this.instance;
  }


  async createHusbandry({length, weight, temperature, humidity, reptileId}: CreateHusbandryPayload) {
    return this.db.husbandryRecord.create({
      data: {
        length: length,
        weight: weight,
        temperature: temperature,
        humidity: humidity,
        reptileId: reptileId,
      }
    });
  }

  async getHusbandryById(id: number) {
    return this.db.husbandryRecord.findUnique({
      where: {
        id: id
      },
    });
  }
}