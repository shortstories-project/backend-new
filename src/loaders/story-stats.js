import { Op } from 'sequelize'

export const batchStoryStats = async (keys, models) => {
  const stories = await models.Story.findAll({
    where: {
      id: {
        [Op.in]: keys,
      },
    },
    include: [
      {
        model: models.Reaction,
        include: [
          {
            model: models.User,
            duplicating: false,
          },
        ],
        duplicating: false,
      },
      {
        model: models.View,
        include: [
          {
            model: models.User,
            duplicating: false,
          },
        ],
        duplicating: false,
      },
      {
        model: models.Comment,
        include: [
          {
            model: models.User,
            duplicating: false,
          },
        ],
        duplicating: false,
      },
    ],
  })

  return keys.map(key => stories.find(story => story.id === key))
}
