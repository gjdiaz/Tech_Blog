const { Blog } = require("../models");
// var date = new Date().toDateString();
const blogData = [
  {
    id: 1,
    blog_title: "iPhones versus Androids",
    contents: "Androids are better",
    creator: "Geneva Diaz",
    date: "2021-11-01",
  },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
