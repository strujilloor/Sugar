const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
    // vamos a sobreescribir este método visitFieldDefinition.
    // este método es el que funciona como el intermediario.
    visitFieldDefinition( field ) { // recibe un campo. (el campo que tiene la directiva en el schema)
        const { resolve = defaultFieldResolver } = field;
        // antes de que le lleguen estos valores a mi operación, yo los estoy recibiendo aquí en mi directiva.
        field.resolve = async function ( ...args ) { // función asincrona que me permita validar el contexto.
            // ese contexto debe tener toda la infomación de la autenticación de mi usuario.
            const [,,context] = args; // root, params, context (el unico que vamos a utilizar).
            if(context.userAuth._id) { 
                return await resolve.apply(this, args); // va a continuar con el flujo.
            } else {
                throw new Error('You must be authenticate. :/'); // si tienes un error quiere decir que nunca te autenticaste.
            }
        };
    }
}

module.exports = AuthDirective;