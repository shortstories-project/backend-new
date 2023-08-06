module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('stories', 'length', {
      type: Sequelize.INTEGER,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('stories', 'length')
  },
}
