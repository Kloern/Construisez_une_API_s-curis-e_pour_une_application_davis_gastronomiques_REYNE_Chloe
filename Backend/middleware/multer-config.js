//Imports
const multer = require('multer');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration de multer
const storage = multer.diskStorage({
    // Destination du fichier
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    // Nom du fichier
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        console.log('Nom du fichier : ' + name);
        callback(null, name + Date.now() + '.' + extension);
    }
});

//Export
module.exports = multer({storage: storage}).single('image');