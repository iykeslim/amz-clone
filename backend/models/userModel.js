import mongoose from 'mongoose';

// creating the schema for user
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false, required: true}
},
{
    timestamps: true,
}
)

// creating the user model
const User = mongoose.model('User', userSchema)

export default User