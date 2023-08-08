import type { IncomingMessage } from 'node:http'

import { PrismaClient, Users } from '@prisma/client'
import jwt, { type JwtPayload } from 'jsonwebtoken'

export const APP_SECRET = 'this is my secret'

export async function authenticateUser(
  prisma: PrismaClient,
  req: IncomingMessage,
): Promise<Users | null> {
  const cookiesHeader = req.headers.cookie
  const cookies = cookiesHeader ? cookiesHeader.split('; ') : []
  const cookiesObject: Record<string, string> = {}

  cookies.forEach(cookie => {
    const [name, value] = cookie.split('=')
    cookiesObject[name] = value
  })

  if (!cookiesObject.token) return null

  const { userId } = jwt.verify(
    cookiesObject.token,
    process.env.SECRET,
  ) as JwtPayload

  if (!userId) return null

  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) return null

  return user
}
