const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true,trim:true },
    lastName: { type: String, required: true,trim:true },
    email: { type: String, required: true, unique: true,trim:true },
    password: { type: String,minlength:7,trim:true, required: true },
    organizations: [{ type: Schema.Types.ObjectId, ref: 'Organization' }], // Reference to the organizations the user belongs to
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {  
        user.password = await bcrypt.hash(user.password,8);  // Hashes the password with the generated salt
        next();
    } catch (err) {
        next(err);
    }
});


userSchema.statics.findByCredentials = async function (email, password) {  // Note: using a regular function, not an arrow function
    const user = await this.findOne({ email });  // 'this' refers to the User model in this context
    if (!user) {
        throw new Error('Unable to login');  // User not found
    }

    const isMatch = bcrypt.compare(password, user.password);  // Compare the provided password with the hashed one
    if (!isMatch) {
        throw new Error('Unable to login');  // Password does not match
    }

    return user;  // Return the user if the credentials are valid
};


const User = mongoose.model('User', userSchema);
module.exports = User;
