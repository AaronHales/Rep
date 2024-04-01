import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { config } from "dotenv";
import * as bcrypt from "bcryptjs";
config();

async function main() {
  await prisma.user.upsert({
    where: {
      id: 1,
    },
    create: {
      firstName: "SITE",
      lastName: "ADMIN",
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
      reptiles: {
        create: [
          {
            species: "Ball Python",
            name: "Monty",
            sex: "m",
            feedings: {
              create: [
                {
                  foodItem: "chicken"
                },
                {
                  foodItem: "pork"
                },
              ]
            },
            husbandryRecords: {
              create: [
                {
                  length: 1.0,
                  weight: 1.0,
                  temperature: 1.0,
                  humidity: 1.0,
                },
                {
                  length: 1.1,
                  weight: 1.1,
                  temperature: 2.0,
                  humidity: 1.5,
                },
              ]
            },
            schedules: {
              create: [
                {
                  userId: 1,
                  type: "feed",
                  description: "example",
                  monday: true,
                  tuesday: true,
                  wednesday: true,
                  thursday: true,
                  friday: true,
                  saturday: true,
                  sunday: true
                },
                {
                  userId: 1,
                  type: "clean",
                  description: "example",
                  monday: true,
                  tuesday: true,
                  wednesday: true,
                  thursday: true,
                  friday: true,
                  saturday: true,
                  sunday: true
                },
              ]
            }

          },
          {
            species: "King Snake",
            name: "Monty",
            sex: "f",
            feedings: {
              create: [
                {
                  foodItem: "chicken"
                },
                {
                  foodItem: "pork"
                },
              ]
            },
            husbandryRecords: {
              create: [
                {
                  length: 1.0,
                  weight: 1.0,
                  temperature: 1.0,
                  humidity: 1.0,
                },
                {
                  length: 1.1,
                  weight: 1.1,
                  temperature: 2.0,
                  humidity: 1.5,
                },
              ]
            },
            schedules: {
              create: [
                {
                  userId: 1,
                  type: "feed",
                  description: "example",
                  monday: true,
                  tuesday: false,
                  wednesday: true,
                  thursday: false,
                  friday: true,
                  saturday: false,
                  sunday: true
                },
                {
                  userId: 1,
                  type: "clean",
                  description: "example",
                  monday: false,
                  tuesday: true,
                  wednesday: false,
                  thursday: true,
                  friday: false,
                  saturday: true,
                  sunday: true
                },
              ]
            },
          },
        ]

        
      }
    },
    update: {
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
    }
  })
  // TODO: put default data in the database
  console.log(process.env);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })