import { Op } from 'sequelize'
import { DISLIKE } from '../constants'

export const batchDislikes = async (keys, models) => {
  const dislikes = await models.Reaction.findAll({
    where: {
      state: DISLIKE,
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

  return keys.map(key => dislikes.find(dislike => dislike.storyId === key))
}
