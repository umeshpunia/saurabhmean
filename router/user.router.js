const express = require('express');

const router = express.Router();
const connection = require('../connection');

const bcrypt = require("bcrypt");
const multer = require('multer')

//User schema
const UserSchema = require('../model/user.schema');

//path
const path = './assets/images/users';
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





router.post("/add", (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                msg: err.message,
            })
        }
        let role = 'user';
        const { name, email, password, address } = req.body;
        var picture = req.file.filename;
        if (!name || !email || !password || !address || !role) {
            return res.status(400).json({
                msg: "Please fill the field"
            })
        }
        bcrypt.hash(password, 10, (err, hashPass) => {
            if (err) {
                return res.status(501).json({
                    msg: 'Something went wrong',

                })
            }
            let userData = new UserSchema({ name, email, password: hashPass, address, role, picture });
            userData.save((err, data) => {
                if (!err) {
                    return res.status(200).json({
                        msg: 'Data successfully inserted',
                        status: true

                    })
                } else if (!data) {
                    return res.status(500).json({
                        msg: 'Data is not saved',
                        error: err.message
                    })
                } else {
                    return res.status(500).json({
                        msg: err.message
                    })
                }
            })


        });

    })



});

router.post('/login', (req, res) => {
    let { email, password } = req.body;
    UserSchema.findOne({ email: email }, (err, data) => {
        if (err) {
            return res.status(500).json({
                msg: err.message
            })
        } else {
            if (!data) {
                return res.status(500).json({
                    msg: 'Data not found'
                })
            } else {
                bcrypt.compare(password, data.password, function(err, isMatch) {
                    if (err) {
                        throw err.message
                    } else if (!isMatch) {
                        return res.status(500).json({
                            msg: 'Password incorrect Please try Again'
                        })
                    } else {
                        return res.status(200).json({ msg: "Login Successfull", result: data });
                    }
                })

            }





        }
    })
})

router.get('/list', (req, res) => {
    UserSchema.find({}, (err, data) => {
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
    UserSchema.findOne({ _id: id }, (err, data) => {
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
    })
})
router.patch("/updatewithfile/:id", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                msg: err.message,
            })
        }
        let id = req.params.id;
        var picture = req.file.filename;
        const { name, email, address } = req.body;
        if (!name || !email || !address) {
            return res.status(400).json({
                msg: "Please fill the field"
            })
        }
        UserSchema.findByIdAndUpdate({ _id: id }, { name, email, address, picture }, (err, data) => {
            if (!err) {
                return res.status(200).json({
                    msg: 'Data Updated',
                    status: true
                })
            } else {
                return res.status(500).json({
                    msg: 'Data not updated'
                })
            }
        })
    })
})

router.put("/update/:id", (req, res) => {
    let id = req.params.id;
    const { name, email, address } = req.body;
    UserSchema.findByIdAndUpdate({ _id: id }, { name, email, address }, (err, data) => {
        if (!err) {
            return res.status(200).json({
                msg: 'Data Updated',
                status: true
            })
        } else {
            return res.status(500).json({
                msg: 'Data not updated'
            })
        }
    })
})

router.delete("/delete/:_id", (req, res) => {
    const { _id } = req.params;
    UserSchema.findByIdAndDelete({ _id }, (err, data) => {
        if (!err) {
            return res.status(200).json({
                msg: 'Data deleted',
                status: true
            })
        } else {
            return res.status(500).json({
                msg: 'Data not deleted'
            })
        }
    })
})

module.exports = router;