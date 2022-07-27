import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
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
app.get('/', (req, res) => {
    res.send('Server is running');
})

app.use((err, req, res, next) => {
    res.status(5000).send({message: err.message})
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Served at http://localhost:5000`);
}) 