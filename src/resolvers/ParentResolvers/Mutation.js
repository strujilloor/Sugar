const { createOneParent, updateOneParent, deleteOneParent, readOneParent } = require('../../services/ParentService');
// const { readOneParent } = require('../../services/ParentService');

const createParent = async (_, { data }) => {
    const parent = await createOneParent( data );
    return parent;
};

const updateParent = async (_, { id, data }) => {
    const parent = await updateOneParent( id, data );
    return parent;
};

const deleteParent = async (_, { id }) => {
    const parent = await deleteOneParent( id );
    if ( !parent ) return 'Parent not exits';
    return 'Parent deleted';
};

const addBaby = async (_, { idParent, idBaby }) => {
    const parent = await readOneParent( idParent );
    if ( parent ) {
        parent.liked_by.push( idBaby );
        parent.save();
    } else {
        return 'Parent not exits';
    }
    // console.log({baby});
    return 'Like to Baby';
};

module.exports = {
    createParent,
    updateParent,
    deleteParent,
    addBaby,
}; 