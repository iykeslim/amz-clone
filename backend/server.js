import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';

dotenv.config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazon-mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
})

// commenting out cos i will start calling data dynamically

// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find((x) => x._id === req.params.id);
//     if(product){
//         res.send(product);
//     }else{
//         res.status(404).send({message: 'Product not Found'});
//     }
// }); 

// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// })
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
app.get('/', (req, res) => {
    res.send('Server is running');
})

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Served at http://localhost:5000`);
}) 