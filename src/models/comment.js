const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    body: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })

  Comment.associate = models => {
    Comment.belongsTo(models.User)
    Comment.belongsTo(models.Story)
    Comment.belongsTo(models.Comment)
  }

  return Comment
}

export default comment
