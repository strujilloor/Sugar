const Babies = require('../models/Babies');

const createOneBaby = ( data ) => Babies.create(data);

const readAllBabies = () => Babies
    .find( { is_active: true } )
    .populate({
        path: 'parents',
        model: 'parents'
    });

const readOneBaby = ( id ) => Babies
    .findById({
        _id: id,
        is_active: true
    })
    .populate({
        path: 'parents',
        model: 'parents'
    });

const updateOneBaby = ( id, data ) => Babies
    .findByIdAndUpdate(
        { _id: id, is_active: true},
        { ...data },
        {new: true}
    );

const deleteOneBaby = ( id ) => Babies
    .findByIdAndDelete(
        { _id: id, is_active: true },
        { is_active: false }
    );

module.exports = {
    createOneBaby,
    readAllBabies,
    readOneBaby,
    updateOneBaby,
    deleteOneBaby
};