const { Comment } = require("../models");
// var date = new Date().toDateString();
const blogData = [
  {
    contents: "I don't agree. iPhones surpass Android in many areas.",
    creator: "Joe Dirt",
    date: "2021-11-02",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
