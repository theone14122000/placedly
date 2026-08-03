// One-time data migration:
//   TECHNICAL -> INTERVIEW
//   MANAGER    -> OFFER
//   OFFER      -> PLACED
// Run after deploying the schema change:  node scripts/migrate-ats-stages.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const STAGE_MAP = { TECHNICAL: 'INTERVIEW', MANAGER: 'OFFER', OFFER: 'PLACED' };

async function main() {
  for (const [from, to] of Object.entries(STAGE_MAP)) {
    const moved = await prisma.jobApplication.updateMany({
      where: { currentStage: from },
      data: { currentStage: to },
    });
    console.log(`JobApplication ${from} -> ${to}: ${moved.count} updated`);

    const history = await prisma.stageHistory.updateMany({
      where: { stage: from },
      data: { stage: to },
    });
    console.log(`StageHistory   ${from} -> ${to}: ${history.count} updated`);
  }
}

main()
  .then(() => console.log('✅ ATS stage migration complete'))
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
