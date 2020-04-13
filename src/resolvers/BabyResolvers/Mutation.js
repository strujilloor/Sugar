const { createOneBaby, updateOneBaby, deleteOneBaby, readOneBaby } = require('../../services/BabyService');
const authenticate = require('../../utils/authenticate'); // importamos el método
// const { readOneParent } = require('../../services/ParentService');

const createBaby = async (_, { data }) => {
    const baby = await createOneBaby( data );
    return baby;
};

const updateBaby = async (_, { data }, { userAuth }) => {
    const baby = await updateOneBaby( userAuth._id, data );
    return baby;
};

const addParent = async (_, { idParent }, { userAuth }) => {
    const baby = await readOneBaby( userAuth._id );
    if ( baby ) {
        baby.liked_by.push( idParent );
        baby.save();
    } else {
        return 'Baby not exits';
    }
    // console.log({baby});
    return 'Like to Parent';
}

const deleteBaby = async (_, __, { userAuth }) => { // por que se usa dos __?
    const baby = await deleteOneBaby( userAuth._id );
    if ( !baby ) return 'Baby not exits';
    return 'Baby deleted';
};

// login
const loginBaby = async (_, params ) => {
    const token = authenticate(params)
        .catch( e => { throw e; });
    
    return {
        token: token,
        message: 'Login Baby Success'
    };
};

module.exports = {
    createBaby,
    updateBaby,
    deleteBaby,
    addParent,
    loginBaby
}; 