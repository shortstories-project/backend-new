import Sequelize from 'sequelize'
import logger from '../utils/logger'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: msg => logger.info(msg),
})

const models = {
  User: sequelize.import('./user'),
  Story: sequelize.import('./story'),
  Reaction: sequelize.import('./reaction'),
  View: sequelize.import('./view'),
  Comment: sequelize.import('./comment'),
  Genre: sequelize.import('./genre'),
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize }

export default models
