import { PrismaClient} from "@prisma/client";

export type CreateReptilePayload = {
  species: string,
  name: string,
  sex: string,
  userId: number,
}

export type updateReptilePayload = {
    species: string,
    name: string,
    sex: string,
    id: number,

}

export class ReptilesRepository {
  private db: PrismaClient
  private static instance: ReptilesRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): ReptilesRepository {
    if (!this.instance) {
      this.instance = new ReptilesRepository(db!!);
    }
    return this.instance;
  }


  async createReptile({species, name, sex, userId}: CreateReptilePayload) {
    return this.db.reptile.create({
      data: {
        species: species,
        name: name,
        sex: sex,
        userId: userId,
      }
    });
  }

  async updateReptile({species, name, sex, id}: updateReptilePayload) {
    return this.db.reptile.update({
        where: {
            id: id,
        },
        data: {
            species: species,
            name: name,
            sex: sex,
        }
    });
  }

  async getReptileById(id: number) {
    return this.db.reptile.findUnique({
      where: {
        id: id
      },
    });
  }
}