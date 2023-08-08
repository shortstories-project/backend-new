import type { IncomingMessage, ServerResponse } from 'node:http'

import { PrismaClient, Users } from '@prisma/client'

import { authenticateUser } from './auth.js'

const prisma = new PrismaClient()

type ServerContext = {
  req: IncomingMessage
  res: ServerResponse
}

export type GraphQLContext = {
  currentUser: Users | null
  prisma: PrismaClient
} & ServerContext

export async function createContext(
  serverContext: ServerContext,
): Promise<GraphQLContext> {
  return {
    ...serverContext,
    currentUser: await authenticateUser(prisma, serverContext.req),
    prisma,
  }
}
