import { GraphQLServer } from 'graphql-yoga'
import DataLoader from 'dataloader'
import resolvers from './resolvers'
import models from './models'
import loaders from './loaders'

const userLoader = new DataLoader(
  keys => loaders.user.batchUsers(keys, models),
  { cache: false }
)
const genreLoader = new DataLoader(keys =>
  loaders.genre.batchGenres(keys, models)
)
const storyLoader = new DataLoader(
  keys => loaders.story.batchStories(keys, models),
  { cache: false }
)
const storyStatsLoader = new DataLoader(
  keys => loaders.storyStats.batchStoryStats(keys, models),
  { cache: false }
)
const likeLoader = new DataLoader(
  keys => loaders.like.batchLikes(keys, models),
  { cache: false }
)
const dislikeLoader = new DataLoader(
  keys => loaders.dislike.batchDislikes(keys, models),
  { cache: false }
)
const viewLoader = new DataLoader(
  keys => loaders.view.batchViews(keys, models),
  { cache: false }
)

const commentLoader = new DataLoader(
  keys => loaders.comment.batchComments(keys, models),
  { cache: false }
)

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({
      ...req,
      models,
      loaders: {
        user: userLoader,
        story: storyLoader,
        storyStats: storyStatsLoader,
        genre: genreLoader,
        like: likeLoader,
        dislike: dislikeLoader,
        view: viewLoader,
        comment: commentLoader,
      },
    }),
  })
}

export default createServer
