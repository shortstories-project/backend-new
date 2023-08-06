import { Op } from 'sequelize'

export const batchComments = async (keys, models) => {
  const comments = await models.Comment.findAll({
    where: {
      commentId: {
        [Op.in]: keys,
      },
    },
  })

  return keys.map(key => comments.find(comment => comment.commentId === key))
}
