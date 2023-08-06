module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'info', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        len: [8, 255],
      },
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'info')
  },
};
