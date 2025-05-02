import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const main = async () => {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@mail.com",
      games: {
        create: [
          {
            assignedBy: "Bob",
            game: {
              create: {
                title: "Seed test",
                description: "A classic board game",
              },
            }
          }
        ],
      },
    },
  });
  console.log(user);
  return user;
}

main();
