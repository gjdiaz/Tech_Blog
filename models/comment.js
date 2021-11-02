// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// const { Comment } = require('.');
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Comment model (table) by extending off Sequelize's Model class
class Comment extends Model {}

// set up fields and rules for Product model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blog",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
