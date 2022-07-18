const express = require("express");
const categorySchema = require("../model/category.schema");
const productScheme = require("../model/product.schema");

const router = express.Router();

// products
router.get("/products", (req, res) => {
  productScheme.find({}, (err, data) => {
    if (!err) {
      if (data.length > 0) {
        return res.status(200).json({
          msg: "Data found",
          result: data,
          status: true,
        });
      } else {
        return res.status(501).json({
          msg: "Data not found",
        });
      }
    } else {
      return res.status(500).json({
        msg: err.message,
      });
    }
  });
});


router.get("/products/:category", (req, res) => {
    let {category}=req.params
    console.log('category')
    productScheme.find({category}, (err, data) => {
      if (!err) {
        if (data.length > 0) {
          return res.status(200).json({
            msg: "Data found ",
            result: data,
            status: true,
          });
        } else {
          return res.status(501).json({
            msg: "Data not found",
          });
        }
      } else {
        return res.status(500).json({
          msg: err.message,
        });
      }
    });
  });

router.get("/product/:id", (req, res) => {
  let id = req.params.id;
  productScheme
    .findById({ _id: id }, (err, data) => {
      if (!err) {
        return res.status(200).json({
          msg: "Data found",
          result: data,
        });
      } else {
        return res.status(500).json({
          msg: err.message,
        });
      }
    })
    .populate("category");
});

// categories
router.get("/categories", (req, res) => {
  categorySchema.find({}, (err, data) => {
    if (!err) {
      if (data.length > 0) {
        return res.status(200).json({
          msg: "Data found",
          result: data,
          status: true,
        });
      } else {
        return res.status(501).json({
          msg: "Data not found",
        });
      }
    } else {
      return res.status(500).json({
        msg: err.message,
      });
    }
  });
});

router.get("/category/:id", (req, res) => {
  let id = req.params.id;
  categorySchema.findById({ _id: id }, (err, data) => {
    if (!err) {
      if (data) {
        return res.status(200).json({
          msg: "Data found",
          result: data,
          status: true,
        });
      } else {
        return res.status(501).json({
          msg: "Data not found",
        });
      }
    } else {
      return res.status(400).json({
        msg: err.message,
      });
    }
  });
});

module.exports = router;
