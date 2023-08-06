module.exports = {
  up: async queryInterface => {
    const [stories] = await queryInterface.sequelize.query(
      'SELECT * FROM stories'
    )
    const promises = stories.map(s =>
      queryInterface.sequelize.query(
        `UPDATE stories SET length = ${s.body.length} WHERE id = ${s.id};`
      )
    )
    return await Promise.all(promises)
  },

  down: queryInterface => {
    return queryInterface.removeColumn('stories', 'length')
  },
}
