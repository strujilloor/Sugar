const { createOneBaby, updateOneBaby, deleteOneBaby, readOneBaby } = require('../../services/BabyService');
// const { readOneParent } = require('../../services/ParentService');

const createBaby = async (_, { data }) => {
    const baby = await createOneBaby( data );
    return baby;
};

const updateBaby = async (_, { id, data }) => {
    const baby = await updateOneBaby( id, data );
    return baby;
};

const addParent = async (_, { idBaby, idParent }) => {
    const baby = await readOneBaby( idBaby );
    if ( baby ) {
        baby.liked_by.push( idParent );
        baby.save();
    } else {
        return 'Baby not exits';
    }
    // console.log({baby});
    return 'Like to Parent';
}

const deleteBaby = async (_, { id }) => {
    const baby = await deleteOneBaby( id );
    if ( !baby ) return 'Baby not exits';
    return 'Baby deleted';
};

module.exports = {
    createBaby,
    updateBaby,
    deleteBaby,
    addParent
}; 