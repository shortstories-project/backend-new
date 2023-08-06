module.exports = {
  up: queryInterface => {
    return queryInterface.changeColumn('comments', 'body', {
      allowNull: true,
    })
  },

  down: queryInterface => {
    return queryInterface.changeColumn('comments', 'body')
  },
}
