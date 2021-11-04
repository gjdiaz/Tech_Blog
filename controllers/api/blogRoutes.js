const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");

// The `/api/blogs` endpoint

// get all blogs
router.get("/", (req, res) => {
  // find all blogs
  Blog.findAll({
    include: [{ model: User, model: Comment }],
  }).then((blogData) => {
    res.json(blogData);
    console.log(blogData);
  });
  // be sure to include its associated data from other routes/tables
});

// get one blog
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  Blog.findByPk(req.params.id).then((blogData) => {
    res.json(blogData);
    console.log(blogData);
  });
});

// create new blog
router.post("/", async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

  try {
    const newBlog = await Blog.create({
      blog_title: req.body.blog_title,
      contents: req.body.contents,
      creator: req.body.creator,
      date: req.body.date,
    });
  } catch (err) {
    console.log(err);
  }
  console.log(newBlog.id);
});
// update blog
router.put("/:id", (req, res) => {
  // update blog data
  Blog.update(
    {
      // probably take out id since those don't get updated
      blog_title: req.body.blog_title,
      contents: req.body.contents,
      creator: req.body.creator,
      date: req.body.date,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    // async await try/catch
    .catch((err) => {
      // console.log(err);
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete one blog by its `id` value
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedBlog) => {
      res.json(deletedBlog);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
