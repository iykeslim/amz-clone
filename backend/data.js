import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Iykeslim',
            email: 'iykeslim@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
         {
            name: 'Nnena',
            email: 'nnenna@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'Red fitted T-shirt',
            category: 'Wears',
            image: '/images/product-1.jpg',
            price: 3500,
            countInStock: 40,
            brand: 'Iykes',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality products',
        },
        {
            name: 'Smart Wrist Watch',
            category: 'Wrist Watch',
            image: '/images/product-7.jpg',
            price: 2000,
            countInStock: 16,
            brand: 'Stellas',
            rating: 4.0,
            numReviews: 7,
            description: 'high quality products',
        },
        {
            name: 'Summer Wears',
            category: 'Footwears',
            image: '/images/product-3.jpg',
            price: 3500,
            countInStock: 47,
            brand: 'Slimz',
            rating: 4.5,
            numReviews: 8,
            description: 'high quality products',
        },
        { 
            name: 'Skin-Tight',
            category: 'Sports Wears',
            image: '/images/product-6.jpg',
            price: 4000,
            countInStock: 0,
            brand: 'Nennies',
            rating: 5.0,
            numReviews: 8,
            description: 'high quality products',
        },
        {
            name: 'Blue Bow-Tie',
            category: 'Neck-ties',
            image: '/images/product-8.jpg',
            price: 1500,
            countInStock: 30,
            brand: 'Slimiykes',
            rating: 5,
            numReviews: 9,
            description: 'high quality products',
        },
        {
            name: 'Couple-wears',
            category: 'Couple',
            image: '/images/product-5.jpg',
            price: 7300,
            countInStock: 9,
            brand: 'Iykeslimz',
            rating: 5,
            numReviews: 10,
            description: 'high quality products',
        },
    ]
}

export default data;