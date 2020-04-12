const Babies = require('../models/Babies');

const createOneBaby = ( data ) => Babies.create(data);

const readAllBabies = () => Babies
    .find( { is_active: true } )
    .populate({
        path: 'liked_by',
        model: 'parents'
    });

const readOneBaby = ( id ) => Babies
    .findOne({_id: id, is_active: true})
    .populate({
        path: 'liked_by',
        model: 'parents'
    });

const updateOneBaby = ( id, data ) => Babies
    .findByIdAndUpdate(
        { _id: id, is_active: true},
        { ...data },
        {new: true}
    );

const deleteOneBaby = ( id ) => Babies
    .findByIdAndUpdate(
        { _id: id, is_active: true },
        { is_active: false }
    );

const readOneBabyByEmail = ( email ) => Babies
    .findOne({ 
        email, 
        is_active: true
    })
    .populate({
        path: 'liked_by',
        model: 'parents'
    });

module.exports = {
    createOneBaby,
    readAllBabies,
    readOneBaby,
    updateOneBaby,
    deleteOneBaby,
    readOneBabyByEmail
};