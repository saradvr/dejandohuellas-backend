require('dotenv').config();
const Busboy = require('busboy');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.formData = (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  req.body = {};

  let uploadingFile = false;
  let uploadingCount = 0;

  function done() {
    if (uploadingFile) return;
    if (uploadingCount > 0) return;
    next();
  }

  busboy.on('field', (key, value) => {
    req.body[key] = value;
  });

  busboy.on('file', (key, file) => {
    uploadingFile = true;
    uploadingFile++;
    const stream = cloudinary.uploader.upload_stream(
      {
        upload_preset: 'DHProfilePicture',
      },
      (err, res) => {
        if (err) throw new Error('Algo salió mal');
        req.body[key] = res.secure_url;
        uploadingFile = false;
        uploadingCount--;
        done();
      }
    );
    file.on('data', (data) => {
      stream.write(data);
    });
    file.on('end', () => {
      stream.end();
    });
  });

  busboy.on('finish', () => {
    done();
  });

  req.pipe(busboy);
};
