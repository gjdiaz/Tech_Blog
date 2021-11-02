const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    blog_title: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    timestamps: false,
    // freezeTableName enforces the table name to be equal to the model name
    freezeTableName: true,
    underscored: true,
    modelName: "blog",
  }
);

// below keeps console logging as false - why?
console.log(Blog === sequelize.models.Blog);
//console.log(Blog.id());
//console.log(Blog.blog_title());
module.exports = Blog;
