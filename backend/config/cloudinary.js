const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fashion-rental-cloud',
  api_key: process.env.CLOUDINARY_API_KEY || '987654321098765',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo_cloudinary_secret_key_here',
  secure: true
});

module.exports = cloudinary;
