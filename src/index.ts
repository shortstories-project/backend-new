import { PrismaClient } from '@prisma/client'

import { add } from './add'

const prisma = new PrismaClient()

async function main() {
  const genres = await prisma.genres.findMany()
  console.log(genres)
  console.log(add(1, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
