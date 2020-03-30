const { readAllBabies, readOneBaby } = require('../../services/BabyService');

const getBabies = async () => {
    const babies = await readAllBabies();
    return babies;
};

const getBabyById = async (_, { id }) => {
    const baby = await readOneBaby( id );
    return baby; 
}

module.exports = {
    getBabies,
    getBabyById,
};