import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const programmes = [
    {
      name: "CAP — Basic",
      description:
        "Career Assistance Programme (Basic tier). Resume rebuild + 3 mock interviews + job matching.",
      cycleDays: 90,
    },
    {
      name: "CAP — Standard",
      description:
        "Standard CAP with employer connect, salary negotiation coaching, and 30-day post-joining support.",
      cycleDays: 180,
    },
    {
      name: "CAP — Premium",
      description:
        "Full CAP suite including priority placement, dedicated advisor, and 6-month follow-up.",
      cycleDays: 365,
    },
    {
      name: "Study Visa",
      description:
        "Study abroad guidance — university shortlisting, application support, and visa assistance.",
      cycleDays: 180,
    },
  ];

  for (const programme of programmes) {
    await prisma.programme.upsert({
      where: {
        name: programme.name,
      },
      update: {
        description: programme.description,
        cycleDays: programme.cycleDays,
        isActive: true,
      },
      create: programme,
    });
  }

  console.log("✅ Programmes seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });