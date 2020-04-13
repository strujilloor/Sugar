const { createOneParent, updateOneParent, deleteOneParent, readOneParent } = require('../../services/ParentService');
const authenticate = require('../../utils/authenticate'); // importamos el método
// const { readOneParent } = require('../../services/ParentService');

const createParent = async (_, { data }) => {
    const parent = await createOneParent( data );
    return parent;
};

const updateParent = async (_, { data }, { userAuth }) => {
    const parent = await updateOneParent( userAuth._id, data );
    return parent;
};

const deleteParent = async (_, __, { userAuth }) => {
    const parent = await deleteOneParent( userAuth._id );
    if ( !parent ) return 'Parent not exits';
    return 'Parent deleted';
};

const addBaby = async (_, { idBaby }, { userAuth }) => {
    const parent = await readOneParent( userAuth.id );
    if ( parent ) {
        parent.liked_by.push( idBaby );
        parent.save();
    } else {
        return 'Parent not exits';
    }
    // console.log({baby});
    return 'Like to Baby';
};

// login
const loginParent = async (_, params ) => {
    const token = authenticate(params)
        .catch( e => { throw e; });
    
    return {
        token: token,
        message: 'Login Parent Success'
    };
};

module.exports = {
    createParent,
    updateParent,
    deleteParent,
    addBaby,
    loginParent,
}; 