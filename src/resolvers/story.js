import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isStoryOwner } from './authorization'
import { LIKE, DISLIKE } from '../constants'

const betweenLength = lengthType => {
  switch (lengthType) {
    case 'short':
      return [1800, 8000]
    case 'middle':
      return [8000, 25000]
    case 'long':
      return [25000, 40000]
    default:
      return [1800, 40000]
  }
}

export default {
  Query: {
    stories: async (
      parens,
      {
        offset = 0,
        limit = 20,
        userId,
        isLiked,
        length,
        genres,
        mostLiked,
        mostViewed,
        mostCommented,
      },
      { models, request }
    ) => {
      const getOrder = () => {
        if (mostLiked) return [[Sequelize.literal('likes'), 'DESC']]
        if (mostViewed) return [[Sequelize.literal('views'), 'DESC']]
        if (mostCommented) return [[Sequelize.literal('comments'), 'DESC']]
        return [['createdAt', 'DESC']]
      }
      const getInclude = () => {
        if (mostLiked)
          return [
            {
              model: models.Reaction,
              where: { state: LIKE },
              required: true,
              attributes: [],
              duplicating: false,
            },
          ]
        if (mostViewed)
          return [
            {
              model: models.View,
              required: true,
              attributes: [],
              duplicating: false,
            },
          ]
        if (mostCommented)
          return [
            {
              model: models.Comment,
              required: true,
              attributes: [],
              duplicating: false,
            },
          ]
      }
      const getCounts = () => {
        if (mostLiked)
          return [
            [Sequelize.fn('COUNT', Sequelize.col('reactions.id')), 'likes'],
          ]
        if (mostViewed)
          return [[Sequelize.fn('COUNT', Sequelize.col('views.id')), 'views']]
        if (mostCommented)
          return [
            [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'comments'],
          ]
      }
      const defaultOptions = {
        order: getOrder(),
        limit,
        offset,
      }
      const likes = isLiked
        ? await models.Reaction.findAll({
            where: {
              userId: request.userId,
              state: LIKE,
            },
          })
        : undefined

      const stories = await models.Story.findAll({
        ...defaultOptions,
        where: {
          [Sequelize.Op.and]: [
            userId ? { userId } : undefined,
            genres && genres.length > 0
              ? {
                  genreId: {
                    [Sequelize.Op.in]: genres,
                  },
                }
              : undefined,
            length
              ? {
                  length: {
                    [Sequelize.Op.between]: betweenLength(length),
                  },
                }
              : undefined,
            likes
              ? {
                  id: {
                    [Sequelize.Op.in]: likes.map(i => i.storyId),
                  },
                }
              : undefined,
          ],
        },
        include: getInclude(),
        attributes: {
          include: getCounts(),
        },
        group: ['story.id'],
      })
      const hasNextPage = stories.length > limit
      const edges = hasNextPage ? stories.slice(0, -1) : stories
      return {
        edges,
        pageInfo: {
          limit,
          offset,
        },
      }
    },

    reactions: async (parent, { storyId }, { models }) =>
      await models.Reaction.findAll({
        where: {
          storyId,
        },
      }),

    story: async (parent, { id }, { models }) =>
      await models.Story.findByPk(id),

    genres: async (parent, args, { models }) => await models.Genre.findAll(),
  },

  Mutation: {
    createStory: combineResolvers(
      isAuthenticated,
      async (parent, args, ctx) =>
        await ctx.models.Story.create({
          ...args,
          userId: ctx.request.userId,
        })
    ),

    updateStory: combineResolvers(
      isAuthenticated,
      isStoryOwner,
      async (parent, { id, title, body, genreId }, ctx) => {
        const story = await ctx.models.Story.findByPk(id)
        return await story.update({ title, body, genreId })
      }
    ),

    likeStory: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      const reaction = await ctx.models.Reaction.findOne({
        where: {
          userId: ctx.request.userId,
          storyId: args.id,
        },
      })
      if (reaction) {
        const state = reaction.get('state')
        if (state === LIKE) {
          await ctx.models.Reaction.destroy({
            where: {
              id: reaction.id,
              state: LIKE,
            },
          })
          return reaction
        }
        if (state === DISLIKE) {
          return await reaction.update({
            state: LIKE,
          })
        }
      }
      return await ctx.models.Reaction.create({
        userId: ctx.request.userId,
        storyId: args.id,
        state: LIKE,
      })
    }),

    dislikeStory: combineResolvers(
      isAuthenticated,
      async (parent, args, ctx) => {
        const reaction = await ctx.models.Reaction.findOne({
          where: {
            userId: ctx.request.userId,
            storyId: args.id,
          },
        })
        if (reaction) {
          const state = reaction.get('state')
          if (state === LIKE) {
            return await reaction.update({
              state: DISLIKE,
            })
          }
          await ctx.models.Reaction.destroy({
            where: {
              id: reaction.id,
              state: DISLIKE,
            },
          })
          return reaction
        }
        return await ctx.models.Reaction.create({
          userId: ctx.request.userId,
          storyId: args.id,
          state: DISLIKE,
        })
      }
    ),

    viewStory: async (parent, args, ctx) => {
      const view = await ctx.models.View.create({
        userId: ctx.request.userId,
        storyId: args.id,
      })
      return view
    },

    deleteStory: combineResolvers(
      isAuthenticated,
      isStoryOwner,
      async (parent, args, ctx) => {
        const story = await ctx.models.Story.findByPk(args.id)
        await ctx.models.Story.destroy({
          where: {
            id: args.id,
          },
        })
        return story
      }
    ),
  },

  Story: {
    user: async (story, args, { loaders }) => {
      const user = await loaders.user.load(story.userId)
      return user
    },

    genre: async (story, args, { loaders }) => {
      const genre = await loaders.genre.load(story.genreId)
      return genre
    },

    stats: async (parent, args, { loaders }) => {
      const story = await loaders.storyStats.load(parent.id)
      const likes = story.reactions.filter(r => r.state === LIKE).map(r => r.user)
      const dislikes = story.reactions.filter(r => r.state === DISLIKE).map(r => r.user)
      const views = story.views.map(r => r.user)

      const stats = {
        likes,
        dislikes,
        views,
        comments: story.comments.length,
      }
      return stats
    },
  },
}
