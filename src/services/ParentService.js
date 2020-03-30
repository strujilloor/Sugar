const Parents = require('../models/Parents');

const createOneParent = ( data ) => Parents.create( data );

const readAllParents = () => Parents.find( { is_active: true } );

const readOneParent = ( id ) => Parents.findById(
    { _id: id, is_active: true } 
);

const updateOneParent = ( id, data ) => Parents
    .findByIdAndUpdate(
        { _id: id, is_active: true },
        { ...data },
        { new: true }
    );

const deleteOneParent = ( id ) => Parents
    .findByIdAndDelete(
        { _id: id, is_active: true},
        { is_active: false }
    );

module.exports = {
    createOneParent,
    readAllParents,
    readOneParent,
    updateOneParent,
    deleteOneParent
};