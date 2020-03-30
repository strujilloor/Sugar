const { createOneBaby, updateOneBaby, deleteOneBaby } = require('../../services/BabyService');
// const { readOneParent } = require('../../services/ParentService');

const createBaby = async (_, { data }) => {
    const baby = await createOneBaby( data );
    return baby;
};

const updateBaby = async (_, { id, data }) => {
    const baby = await updateOneBaby( id, data );
    return baby;
};

const deleteBaby = async (_, { id }) => {
    const baby = await deleteOneBaby( id );
    return baby;
};

module.exports = {
    createBaby,
    updateBaby,
    deleteBaby,
}; 