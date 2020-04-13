const bcrypt = require('bcrypt'); // para desencriptar
const { readOneBabyByEmail } = require('../services/BabyService');
const { readOneParentByEmail } = require('../services/ParentService');
const createToken = require('./createToken'); // generar el token para devolverselo a quien este haciendo la petición

const authenticate = ( {email, password} ) => {
    return new Promise((resolve, reject)=>{
        readOneBabyByEmail(email)
            .then(userAuth => {
                if( !userAuth ) {
                    readOneParentByEmail(email).then(userAuth => {
                        if( !userAuth ) reject( new Error('User not exist') );
                        bcrypt.compare(password, userAuth.password, (err, isValid) => { // compara el password con el valor almacenado encriptado
                            if(err) reject(new Error('Error comparing'));
                            isValid // es valida la contraseña ?
                                ? resolve(createToken(userAuth)) // creame el token con el usuario a authenticar
                                : reject(new Error('Incorrect Password'));
                        });
                    });
                }
                bcrypt.compare(password, userAuth.password, (err, isValid) => { // compara el password con el valor almacenado encriptado
                    if(err) reject(new Error('Error comparing'));
                    isValid // es valida la contraseña ?
                        ? resolve(createToken(userAuth)) // creame el token con el usuario a authenticar
                        : reject(new Error('Incorrect Password'));
                });
            });
    });
};

module.exports = authenticate;