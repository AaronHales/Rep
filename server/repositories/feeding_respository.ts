import { PrismaClient} from "@prisma/client";

export type CreateFeedingPayload = {
  foodItem: string,
  reptileId: number
}

export class FeedingRepository {
  private db: PrismaClient
  private static instance: FeedingRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): FeedingRepository {
    if (!this.instance) {
      this.instance = new FeedingRepository(db!!);
    }
    return this.instance;
  }


  async createFeeding({foodItem, reptileId}: CreateFeedingPayload) {
    return this.db.feeding.create({
      data: {
        foodItem: foodItem,
        reptileId: reptileId,
      }
    });
  }

  async getFeedingById(id: number) {
    return this.db.feeding.findUnique({
      where: {
        id: id
      },
    });
  }
}