import { Resolvers } from '@/__generated__/resolvers-types.js'
import { usersMutations } from '@/features/users/usersMutations.js'
import { usersQueries } from '@/features/users/usersQueries.js'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { createSchema, createYoga } from 'graphql-yoga'
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import pc from 'picocolors'

import { type GraphQLContext, createContext } from './services/context.js'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const typeDefs = readFileSync('./schema.graphql', 'utf8')

export const prisma = new PrismaClient()

// const resolvers: Resolvers<GraphQLContext> = {
//   Mutation: {
//     signIn: async (_, { login, password }, { res }) => {
//       const user = await prisma.users.findFirst({
//         where: {
//           OR: [{ email: login }, { username: login }],
//         },
//       })

//       if (!user) {
//         throw new Error(`Такого юзера не существует ${login}`)
//       }

//       const isValid = validatePassword(password, user.password)

//       if (!isValid) {
//         throw new Error('Неправильный пароль')
//       }

//       const token = jwt.sign({ userId: user.id }, process.env.SECRET)

//       res.setHeader(
//         'Set-Cookie',
//         `token=${token}; HttpOnly; Max-Age=${100 * 60 * 60 * 24 * 365}`,
//       )

//       return {
//         ...user,
//         id: user.id.toString(),
//       }
//     },
//     signOut: async (_, __, { res }) => {
//       res.setHeader('Set-Cookie', 'token=; HttpOnly; Max-Age=0')
//       return {
//         message: 'Пока!',
//       }
//     },
//     signUp: async (_, args, { res }) => {
//       const verifyToken = nanoid(20)

//       const user = await prisma.users.create({
//         data: {
//           ...args,
//           email: args.email.toLowerCase().trim(),
//           password: await generatePasswordHash(args.password),
//           verifyToken,
//           verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour from now
//         },
//       })

//       const token = jwt.sign({ userId: user.id }, process.env.SECRET)

//       res.setHeader(
//         'Set-Cookie',
//         `token=${token}; HttpOnly; Max-Age=${100 * 60 * 60 * 24 * 365}`,
//       )

//       await transport.sendMail({
//         from: `Shortstories <no-reply@shortstories.im>`,
//         html: makeANiceEmail(`Добро пожаловать на Shortstories! Подтвердите электронную почту, кликнув по ссылке ниже:
//         \n\n
//         <br />
//         <a href="${process.env.FRONTEND_URL}/verify?verifyToken=${verifyToken}">Кликни для подтверждения</a>`),
//         subject: 'Подтвердите аккаунт',
//         to: user.email,
//       })

//       return {
//         ...user,
//         id: user.id.toString(),
//       }
//     },
//     verifyUser: async (_, { token }) => {
//       const now = Date.now()

//       const user = await prisma.users.findFirst({
//         where: {
//           verifyToken: token,
//           verifyTokenExpiry: {
//             gte: new Date(now - 3600000),
//           },
//         },
//       })

//       if (!user) {
//         throw new Error('Токен не действителен!')
//       }

//       const verifiedUser = await prisma.users.update({
//         data: {
//           isVerified: true,
//           verifyToken: null,
//           verifyTokenExpiry: null,
//         },
//         where: { id: user.id },
//       })

//       return {
//         ...verifiedUser,
//         id: verifiedUser.id.toString(),
//       }
//     },
//   },
//   Query: {
//     genres: async () => {
//       const genres = await prisma.genres.findMany()

//       return genres.map(genre => ({
//         id: genre.id.toString(),
//         name: genre.name,
//       }))
//     },
//     stories: async (
//       _,
//       {
//         genres,
//         isLiked,
//         length,
//         limit = 20,
//         mostCommented,
//         mostLiked,
//         mostViewed,
//         offset = 0,
//         userId,
//       },
//     ) => {
//       return {
//         edges: [],
//         pageInfo: {
//           limit,
//           offset,
//         },
//       }
//     },
//     ...usersQueries,
//   },
// }

const resolvers: Resolvers<GraphQLContext> = {
  Mutation: {
    ...usersMutations,
  },
  Query: {
    ...usersQueries,
  },
}

const schema = createSchema({ resolvers, typeDefs })
const yoga = createYoga({
  context: createContext,
  schema,
})
const server = createServer(yoga)

server.listen(4444, () => {
  console.log(
    `\n🔥 Server is now running on ${pc.yellow(
      `http://localhost:4444/graphql`,
    )} 🔥`,
  )
})
