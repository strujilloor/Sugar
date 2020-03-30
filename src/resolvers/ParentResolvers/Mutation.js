const { createOneParent, updateOneParent, deleteOneParent } = require('../../services/ParentService');
// const { readOneParent } = require('../../services/ParentService');

const createParent = async (_, { data }) => {
    const baby = await createOneParent( data );
    return baby;
};

const updateParent = async (_, { id, data }) => {
    const baby = await updateOneParent( id, data );
    return baby;
};

const deleteParent = async (_, { id }) => {
    const baby = await deleteOneParent( id );
    return baby;
};

module.exports = {
    createParent,
    updateParent,
    deleteParent,
}; 