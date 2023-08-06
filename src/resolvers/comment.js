import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isCommentOwner } from './authorization'

export default {
  Query: {
    comments: async (parent, { storyId }, { models }) =>
      await models.Comment.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          storyId,
        },
      }),
  },

  Mutation: {
    createComment: combineResolvers(
      isAuthenticated,
      async (parent, { body, id, commentId }, ctx) =>
        await ctx.models.Comment.create({
          userId: ctx.request.userId,
          storyId: id,
          commentId,
          body,
        })
    ),

    updateComment: combineResolvers(
      isAuthenticated,
      isCommentOwner,
      async (parent, { id, body }, ctx) => {
        const comment = await ctx.models.Comment.findByPk(id)
        return await comment.update({ body })
      }
    ),

    deleteComment: combineResolvers(
      isAuthenticated,
      isCommentOwner,
      async (parent, { id, hasChildren, commentId }, ctx) => {
        const comment = await ctx.models.Comment.findByPk(id)

        if (commentId) {
          const parent = await ctx.models.Comment.findByPk(commentId)

          if (parent.body === null) {
            await ctx.models.Comment.destroy({
              where: {
                id: [commentId, comment.id],
              },
            })
            return comment
          }
        }

        if (hasChildren) {
          return await comment.update({ body: null })
        }

        await ctx.models.Comment.destroy({
          where: {
            id,
          },
        })
        return comment
      }
    ),
  },

  Comment: {
    user: async (comment, args, { loaders }) =>
      await loaders.user.load(comment.userId),
  },
}
