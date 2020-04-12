const Parents = require('../models/Parents');

const createOneParent = ( data ) => Parents.create( data );

const readAllParents = () => Parents
    .find( { is_active: true } )
    .populate({
        path: 'liked_by',
        model: 'babies'
    });

const readOneParent = ( id ) => Parents
    .findOne( { _id: id, is_active: true } )
    .populate({
        path: 'liked_by',
        model: 'babies'
    });

const updateOneParent = ( id, data ) => Parents
    .findByIdAndUpdate(
        { _id: id, is_active: true },
        { ...data },
        { new: true }
    );

const deleteOneParent = ( id ) => Parents
    .findByIdAndUpdate(
        { _id: id, is_active: true},
        { is_active: false }
    );

const readOneParentByEmail = ( email ) => Parents
    .findOne({ 
        email, 
        is_active: true
    })
    .populate({
        path: 'liked_by',
        model: 'babies'
    });

module.exports = {
    createOneParent,
    readAllParents,
    readOneParent,
    updateOneParent,
    deleteOneParent,
    readOneParentByEmail
};