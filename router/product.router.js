const express = require('express');

const router = express.Router();
const connection = require('../connection');
const productScheme = require('../model/product.schema');
const categorySchema = require('../model/category.schema');
const multer = require('multer')

//path
const path = './assets/images/products';
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path)
    },
    filename: function(req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single('picture');


router.post('/add', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                msg: err.message,
            })
        }
        let { name, brand, category, price, discount, inStock, rating, review, description, richDescription, isFeatured } = req.body;
        var picture = req.file.filename;
        categorySchema.findById({ _id: category }, (err, data) => {
            if (!err) {
                let productData = new productScheme({ name: name, brand: brand, category: category, price: price, discount: discount, inStock: inStock, rating: rating, review: review, description: description, richDescription: richDescription, image: picture, isFeatured: isFeatured });
                productData.save((errr, result) => {
                    if (!errr) {
                        return res.status(200).json({
                            msg: 'Data successfully inserted',
                            status: true
                        })
                    } else if (!result) {
                        return res.status(500).json({
                            msg: 'Data is not saved',
                            error: errr.message
                        })
                    } else {
                        return res.status(500).json({
                            msg: errr.message
                        })
                    }
                })
            } else {
                return res.status(400).json({
                    msg: "Category not found"
                })
            }
        });
    });

})

router.get('/list', (req, res) => {
    productScheme.find({}, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                return res.status(200).json({
                    msg: 'Data found',
                    result: data,
                    status: true
                })
            } else {
                return res.status(501).json({
                    msg: 'Data not found'
                })
            }
        } else {
            return res.status(500).json({
                msg: err.message
            })
        }
    })
})


router.get("/list/:id", (req, res) => {
    let id = req.params.id;
    productScheme.findById({ _id: id }, (err, data) => {
        if (!err) {
            return res.status(200).json({
                msg: 'Data found',
                result: data
            })
        } else {
            return res.status(500).json({
                msg: err.message
            })
        }
    }).populate('category')
})


//update without image
router.put("/update/:id", (req, res) => {
    let id = req.params.id;
    let { name, brand, category, price, discount, inStock, rating, review, description, richDescription, isFeatured } = req.body;
    categorySchema.findById({ _id: category }, (err, data) => {
        if (!err) {
            productScheme.findByIdAndUpdate({ _id: id }, { name: name, brand: brand, category: category, price: price, discount: discount, inStock: inStock, rating: rating, review: review, description: description, richDescription: richDescription, isFeatured: isFeatured }, (errr, result) => {
                if (!errr) {
                    return res.status(200).json({
                        msg: 'Data updated  successfully ',
                        status: true
                    })
                } else if (!result) {
                    return res.status(500).json({
                        msg: 'Data  not updated',
                        error: errr.message
                    })
                } else {
                    return res.status(500).json({
                        msg: errr.message
                    })
                }
            })
        } else {
            return res.status(400).json({
                msg: "Category not found"
            })
        }
    });
});


//update without image
router.put("/updatewithimage/:id", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                msg: err.message,
            })
        }
        let id = req.params.id;
        var picture = req.file.filename;
        let { name, brand, category, price, discount, inStock, rating, review, description, richDescription, isFeatured } = req.body;
        categorySchema.findById({ _id: category }, (err, data) => {
            if (!err) {
                productScheme.findByIdAndUpdate({ _id: id }, { name: name, brand: brand, category: category, price: price, discount: discount, inStock: inStock, rating: rating, review: review, description: description, richDescription: richDescription, image: picture, isFeatured: isFeatured }, (errr, result) => {
                    if (!errr) {
                        return res.status(200).json({
                            msg: 'Data updated  successfully ',
                            status: true
                        })
                    } else if (!result) {
                        return res.status(500).json({
                            msg: 'Data  not updated',
                            error: errr.message
                        })
                    } else {
                        return res.status(500).json({
                            msg: errr.message
                        })
                    }
                })
            } else {
                return res.status(400).json({
                    msg: "Category not found"
                })
            }
        });
    });
});



router.delete("/delete/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    productScheme.findByIdAndRemove({ _id: id }, (err, data) => {
        if (!err) {
            return res.status(200).json({
                msg: 'Data delete successfully',
                status: true
            })
        } else {
            return res.status(500).json({
                msg: err.message
            })
        }
    })
})





module.exports = router;