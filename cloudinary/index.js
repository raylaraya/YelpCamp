const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// configuring cloudinary to our account
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// setting up an instance of cloudinary(storage object)
// and we pass this to multer in the campgrounds routes file
const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'YelpCamp',
    allowedFormats: ['jpeg', 'png', 'jpg']
});

module.exports = {
    cloudinary,
    storage
}