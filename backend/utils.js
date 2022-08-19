import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET || 'somesecret',
    {
        expiresIn: '30d',
    })
}
// Getting info about the user that placed an order for our orderRouter logic
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7, authorization.length)
//the above line implies that we will cut out the bearer part of the token and only return the token which starts from the 7th index
// the next line will be using jwt to decrypt the token..
        jwt.verify(token, process.env.JWT_SECRET || 'somesecret', (err, decode) => {
            if(err){
                req.status(401).send({message: 'Invalid Token'})
            } else{
// here i will use the 'decode parameter'which gives me access to the data stored up there  in the jwt.sign obj
// about the user(will be stored in variable req.user below) and right after that we will call te 3rd parameter which is next 
                req.user = decode;
                next()
            }
        })
    } else {
        req.status(401).send({ message: 'There is no Token' })

    }
}