import { ForbiddenError } from 'apollo-server'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, ctx) =>
  ctx.request.user
    ? skip
    : new ForbiddenError('Доступно только авторизованным пользователям')

export const isStoryOwner = async (parent, args, ctx) => {
  const story = await ctx.models.Story.findByPk(args.id)
  if (story.userId !== ctx.request.userId) {
    throw new ForbiddenError('Вы не являетесь автором рассказа')
  }
  return skip
}

export const isCommentOwner = async (parent, args, ctx) => {
  const comment = await ctx.models.Comment.findByPk(args.id)
  if (comment.userId !== ctx.request.userId) {
    throw new ForbiddenError('Вы не являетесь автором комментария')
  }
  return skip
}
