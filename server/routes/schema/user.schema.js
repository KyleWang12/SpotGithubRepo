const Schema = require('mongoose').Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    collection: 'users',
})

UserSchema.pre("save", function (next) {
    const user = this;
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }
                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (error, isMatch) {
        if (error) {
            return callback(error)
        } else {
            callback(null, isMatch)
        }
    })
}


module.exports = UserSchema;