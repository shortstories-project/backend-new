import { Op } from 'sequelize'

export const batchViews = async (keys, models) => {
  const views = await models.View.findAll({
    where: {
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

  return keys.map(key => views.find(view => view.storyId === key))
}
