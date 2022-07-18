const express = require('express');

const router = express.Router();
const connection = require('../connection');



//User schema
const categorySchema = require('../model/category.schema');

router.post('/add', (req, res) => {
    let { name, icon } = req.body;
    let categoryData = new categorySchema({ name, icon });
    categoryData.save((err, data) => {
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
})
router.get('/list', (req, res) => {
    categorySchema.find({}, (err, data) => {
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

router.get('/list/:id', (req, res) => {
    let id = req.params.id;
    categorySchema.findById({ _id: id }, (err, data) => {
        if (!err) {
            if (data) {
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
            return res.status(400).json({
                msg: err.message
            })
        }
    })
})
router.put('/update/:id', (req, res) => {
    let { name, icon } = req.body;
    let id = req.params.id;

    categorySchema.findByIdAndUpdate({ _id: id }, { name, icon }, (err, data) => {
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
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    categorySchema.findByIdAndDelete({ _id: id }, (err, data) => {
        if (!err) {
            return res.status(200).json({
                msg: 'Data deleted',
                status: true,
            })
        } else {
            return res.status(500).json({
                msg: 'Data not deleted'
            })
        }
    })
})


module.exports = router;