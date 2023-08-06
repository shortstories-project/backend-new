import { Op } from 'sequelize'

export const batchGenres = async (keys, models) => {
  const genres = await models.Genre.findAll({
    where: {
      id: {
        [Op.in]: keys,
      },
    },
  })

  return keys.map(key => genres.find(genre => genre.id === key))
}
