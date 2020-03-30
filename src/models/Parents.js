const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ParentSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    cellphone: {type: String, required: true, unique: true},
    birth_date: Date,
    profile_pic: String,
    // score: {type: Number, enum: [1, 2, 3, 4, 5]},
    gender: {type: String, enum: ['M', 'F', 'O']},
    // liked_by: {type: [Schema.Types.ObjectId], ref: 'posts'},
    is_active: {type: Boolean, default: true},
}, { timestamps: true });

module.exports = mongoose.model('parents', ParentSchema);