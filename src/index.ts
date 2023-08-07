import { createSchema, createYoga } from 'graphql-yoga'
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import pc from 'picocolors'

import { Resolvers } from './__generated__/resolvers-types.js'

const typeDefs = readFileSync('./schema.graphql', 'utf8')

const resolvers: Resolvers = {
  Query: {
    // typed resolvers
  },
}

const schema = createSchema({ resolvers, typeDefs })
const yoga = createYoga({ schema })
const server = createServer(yoga)

server.listen(4444, () => {
  console.log(
    `\n🔥 Server is now running on ${pc.yellow(
      `http://localhost:4444/graphql`,
    )} 🔥`,
  )
})
