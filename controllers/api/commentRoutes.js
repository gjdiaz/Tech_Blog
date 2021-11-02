const router = require("express").Router();
const { Comment } = require("../../models");

// The `/api/comment` endpoint

// get all comments
router.get("/", (req, res) => {
  // find all comments
  Comment.findAll({
    include: [{ model: Comment }],
  }).then((commentData) => {
    res.json(commentData);
  });
  // be sure to include its associated data from other routes/tables
});

// get one comment
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  Comment.findByPk(req.params.id).then((commentData) => {
    res.json(commentData);
    // be sure to include its associated Category and Tag data
  });
});

// create new comment
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Comment.create({
    contents: req.body.contents,
    creator: req.body.creator,
    date: req.body.date,
  })
    .then((comment) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(blog);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });

  // update comment
  router.put("/:id", (req, res) => {
    // update blog data
    Comment.update(
      {
        // probably take out id since those don't get updated
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
      .then((blog) => {
        // find all associated tags from ProductTag
        return ProductTag.findAll({ where: { product_id: req.params.id } });
      })
      .then((productTags) => {
        // get list of current tag_ids
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        // create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id: req.params.tag_id,
            };
          });
        // figure out which ones to remove
        const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);

        // run both actions
        return Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags),
        ]);
      })
      .then((updatedProductTags) => res.json(updatedProductTags))
      .catch((err) => {
        // console.log(err);
        console.log(err);
        res.status(400).json(err);
      });
  });

  router.delete("/:id", (req, res) => {
    // delete one blog by its `id` value
    Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedComment) => {
        res.json(deletedComment);
      })
      .catch((err) => res.json(err));
  });
});

module.exports = router;
