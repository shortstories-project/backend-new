import { Resolvers } from '@/__generated__/resolvers-types.js'
import { validatePassword } from '@/features/users/usersUtils.js'
import { type GraphQLContext } from '@/services/context.js'
import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'

type Mutation = Resolvers<GraphQLContext>['Mutation']

type UsersMutations = {
  checkUserExists: Mutation['checkUserExists']
  postPhoto: Mutation['postPhoto']
  requestReset: Mutation['requestReset']
  resetPassword: Mutation['resetPassword']
  signIn: Mutation['signIn']
  signOut: Mutation['signOut']
  signUp: Mutation['signUp']
  updateUser: Mutation['updateUser']
  verifyUser: Mutation['verifyUser']
}

export const usersMutations: Partial<UsersMutations> = {
  checkUserExists: async (_, { login }, ctx) => {
    const user = await ctx.prisma.users.findFirst({
      where: {
        OR: [
          {
            email: login,
          },
          {
            username: login,
          },
        ],
      },
    })

    return !!user
  },
  signIn: async (_, { login, password }, ctx) => {
    const user = await ctx.prisma.users.findFirst({
      where: {
        OR: [{ email: login }, { username: login }],
      },
    })

    if (!user) {
      throw new GraphQLError(`User ${login} doesn't exit`, {
        extensions: {
          code: 'NOT_FOUND',
          http: {
            status: 404,
          },
          message: `User ${login} doesn't exit`,
        },
      })
    }

    const isValid = validatePassword(password, user.password)

    if (!isValid) {
      throw new GraphQLError(`Unauthorized`, {
        extensions: {
          code: 'UNAUTHORIZED',
          http: {
            status: 401,
          },
          message: 'Invalid password',
        },
      })
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET)

    ctx.res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Max-Age=${100 * 60 * 60 * 24 * 365}`,
    )

    return user
  },
  signOut: async (_, __, ctx) => {
    ctx.res.setHeader('Set-Cookie', 'token=; HttpOnly; Max-Age=0')

    return {
      message: 'Success',
    }
  },
}
