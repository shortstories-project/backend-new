import { Op } from 'sequelize'
import { LIKE } from '../constants'

export const batchLikes = async (keys, models) => {
  const likes = await models.Reaction.findAll({
    where: {
      state: LIKE,
      storyId: {
        [Op.in]: keys,
      },
    },
    include: [
      {
        model: models.User,
      },
    ],
  })

  return keys.map(key => likes.find(like => like.storyId === key))
}
