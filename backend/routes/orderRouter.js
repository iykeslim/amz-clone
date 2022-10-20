import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router()

//creating an API for post request to 'api/orders'
orderRouter.post('/', 
// isAuth will be the middleware created in utils.js and it will fill in the user info needed below
isAuth,
expressAsyncHandler(async(req, res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({message: 'Your cart is empty'})
    } else {
        // this block of code will run being that everything is ok so we can create an order
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            // here we need the user that made this order but we dont have that info so I will go to utils.js and create a middleware to access it
            user: req.user._id,
            //here we now only need the id to access the user
        })
        // at this point there is no order in the db so we need to save the order to the database
        const createdOrder = await order.save();
        res.status(201).send({message: 'New Order Created', order: createdOrder})
    }
}))

orderRouter.get(
    // implies /api/orders/:id a prefix from server.js
    '/:id',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const order = await Order.findById(req.params.id)
        if(order){
            res.send(order)
        }else{
            res.status(404).send({message: 'Order Not Found'})
        }
    })
)

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            // these fields shoud be added to the orderModel. That is TODO after this
        id: req.body.id, 
        status: req.body.status, 
        update_time: req.body.update_time,
        email_address: req.body.email_address,
        }
        const updatedOrder = await order.save()
        // send response message and then send the order itself to the frontend
        res.send({message: 'Order is Paid', order: updatedOrder })
    } else {
        res.status(404).send({message: 'Order Not Found'})
    }
    // now we can directlty use this in the order screen in the successPaymentHandler funct
}))

export default orderRouter