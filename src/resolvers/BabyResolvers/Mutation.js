const { createOneBaby, updateOneBaby, deleteOneBaby, readOneBaby } = require('../../services/BabyService');
const authenticate = require('../../utils/authenticate'); // importamos el método
const storage = require('../../utils/storage');
// const { readOneParent } = require('../../services/ParentService');

const createBaby = async (_, { data }) => {
    // data: un multipart form data 
    if( data.profile_pic  ) { // profile_pic es donde viene el archivo (file)
        console.log(data.profile_pic , typeof data.profile_pic );
        const { createReadStream } = await data.profile_pic ; // espera a cargar el archivo
        const stream = createReadStream(); // createReadStream nos permite leer el flujo de datos
        const storageInfo = await storage({stream}); // almacenamos lo que nos trae el storage
        data = {
            ...data,
            profile_pic: storageInfo.url, //url image
        }
    }

    const baby = await createOneBaby( data );
    return baby;
};

const updateBaby = async (_, { data }, { userAuth }) => {
    if ( data.profile_pic  ) {
        const { createReadStream } = await data.profile_pic;
        const stream = createReadStream();
        const storageInfo = await storage({stream});
        // console.log(storageInfo);
        data = {
            ...data,
            profile_pic: storageInfo.secure_url, //url image
        };
    }
    const baby = await updateOneBaby( userAuth._id, data );
    return baby;
};

const addParent = async (_, { idParent }, { userAuth }) => {
    const baby = await readOneBaby( userAuth._id );
    if ( baby ) {
        baby.liked_by.push( idParent );
        baby.save();
    } else {
        return 'Baby does not exist';
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