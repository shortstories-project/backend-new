import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedGenres() {
  const genresData = [
    {
      name: 'Detectives',
    },
    {
      name: 'SciFi',
    },
    {
      name: 'Action',
    },
    {
      name: 'Fantasy',
    },
    {
      name: 'Adventure',
    },
    {
      name: 'Comedy',
    },
    {
      name: 'Horror',
    },
    {
      name: 'Life',
    },
    {
      name: 'ForAdult',
    },
  ] as const

  for (const genreData of genresData) {
    await prisma.genres.create({
      data: genreData,
    })
  }

  console.log('Genres seeded successfully!')
}

async function main() {
  try {
    await seedGenres()
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
