const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // BIBLIOTECA PARA ENCRIPTAR

const Schema = mongoose.Schema;

const ParentSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password:{ type: String, required: true }, // CAMPO QUE VAMOS A ENCRIPTAR
    cellphone: {type: String, required: true, unique: true},
    birth_date: Date,
    profile_pic: String,
    score: {type: Number, enum: [1, 2, 3, 4, 5]}, // en schema esta como ONE TWO THREE FOUR FIVE
    gender: {type: String, enum: ['M', 'F', 'O']},
    liked_by: {type: [Schema.Types.ObjectId], ref: 'babies'},
    is_active: {type: Boolean, default: true},
    description: String,
}, { timestamps: true });

ParentSchema.pre('save', function(next) {
    const parent = this;
    const SALT_FACTOR = 13;

    if (!parent.isModified('password')) { return next(); }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(parent.password, salt, function(error, hash) {
            if(error) return next(error);
            parent.password = hash;
            next();
        });
    });

});

module.exports = mongoose.model('parents', ParentSchema);