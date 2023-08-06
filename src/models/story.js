const story = (sequelize, DataTypes) => {
  const Story = sequelize.define('story', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1800, 40000],
      },
    },
    length: {
      type: DataTypes.INTEGER,
    },
  })

  Story.associate = models => {
    Story.belongsTo(models.User)
    Story.belongsTo(models.Genre)
    Story.hasMany(models.Comment, { onDelete: 'cascade', hooks: true })
    Story.hasMany(models.Reaction, { onDelete: 'cascade', hooks: true })
    Story.hasMany(models.View, { onDelete: 'cascade', hooks: true })
  }

  Story.beforeCreate(async story => {
    story.length = story.body.length
  })

  return Story
}

export default story
