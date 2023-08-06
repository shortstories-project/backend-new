module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('comments', 'commentId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('comments', 'commentId')
  },
}
