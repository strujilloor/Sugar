const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // BIBLIOTECA PARA ENCRIPTAR

const Schema = mongoose.Schema;

const BabySchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password:{ type: String, required: true }, // CAMPO QUE VAMOS A ENCRIPTAR
    cellphone: {type: String, required: true, unique: true},
    birth_date: Date,
    profile_pic: String,
    score: {type: Number, enum: [1, 2, 3, 4, 5]}, // en schema esta como ONE TWO THREE FOUR FIVE
    gender: {type: String, enum: ['M', 'F', 'O']},
    liked_by: {type: [Schema.Types.ObjectId], ref: 'parents'},
    is_active: {type: Boolean, default: true},
    description: String,
}, { timestamps: true });

// NO QUEREMOS QUE SE PUEDA VER LAS CONTRASEÑAS EN LA BASE DE DATOS POR ESO VAMOS A ENCRIPTARLAS
/*
    PRE: es un hook, ejecuta algo antes de que se ejecute una acción, en este caso un save.
*/
BabySchema.pre('save', function(next) {
    const baby = this;
    const SALT_FACTOR = 13; // cantidad de veces que se va a repetir el proceso de encriptación .

    // solamente cuando se modifique el atributo de contraseña es que este debe dispararse:
    if (!baby.isModified('password')) { return next(); } // si no se esta modificando el campo de contraseña salgase!
    // next() salta al flujo normal que se estaba ejecutando.

    // genSalt: nos ayuda a generar las iteraciones para cifrarlo.
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        // primero revisamos si no se generó algún error
        if(err) return next(err); // llamamos a next y le pasamos como parametro el error.

        // recibe el valor a encriptar, salt y recibe otra función que va a tener el error en caso de que exista un problema.
        bcrypt.hash(baby.password, salt, function(error, hash) {
            if(error) return next(error); // mandamos el error y no seguimos con el flujo.

            // autor.password ya no puede ser igual a la contraseña, si no la clave de numeros encriptada que es hash.
            baby.password = hash;
            next(); // siga con el flujo y guarde mi modelo.
        });
    });

});

module.exports = mongoose.model('babies', BabySchema);