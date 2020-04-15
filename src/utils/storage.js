const cloudinary = require('cloudinary');

const storage = ( {stream} ) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

    return new Promise((resolve, reject) => {
        const buffer = cloudinary.v2.uploader.upload_stream((err, result) => { //subir el archivo
            if(err) reject(err);
            resolve(result); // obj que devuelve cloudinary con información
        });
        stream.pipe(buffer); // stream es el flujo de datos, pipe le pasa el stream al buffer
    });
};

module.exports = storage; 