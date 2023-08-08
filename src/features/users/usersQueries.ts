import type { GraphQLContext } from '@/services/context.js'

import { Resolvers } from '@/__generated__/resolvers-types.js'

type UsersQueries = {
  me: Resolvers<GraphQLContext>['Query']['me']
  user: Resolvers<GraphQLContext>['Query']['user']
}

export const usersQueries: UsersQueries = {
  me: async (_, __, ctx) => {
    return ctx.currentUser
  },
  user: async (_, { id }, ctx) => {
    const user = await ctx.prisma.users.findUnique({
      where: {
        id,
      },
    })

    if (!user) return null

    return user
  },
}
