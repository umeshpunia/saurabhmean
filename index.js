const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
//env file
require('dotenv').config();
//connection
require('./connection');

//router
const userRouter = require('./router/user.router');
const categoryRouter = require('./router/category.router');
const productRouter = require('./router/product.router');
//json read middleware
app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use("/",express.static('public'))

app.use('/assets', express.static(path.join(__dirname, 'assets/images/')))

app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

app.use("/api/front/",require('./router/front.router'))


app.get('*', (req, res) => {
    res.send("Wrong URL");
})



app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
})