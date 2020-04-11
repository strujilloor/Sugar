const { readAllParents, readOneParent } = require('../../services/ParentService');

const getParents = async () => {
    const parents = await readAllParents();
    return parents;
};

const getParentById = async (_, { id }) => {
    const parent = await readOneParent( id );
    return parent; 
};

module.exports = {
    getParents,
    getParentById
};