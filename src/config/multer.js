import multer from 'multer';
import { extname, resolve } from 'path';

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arqivo inválido'));
    }
    return cb(null, true);
  },
  dest: resolve(__dirname, '..', '..', 'uploads/'),
  Storage: multer.diskStorage({
    filename(req, file, cb) {
      cb(null, `${Date.now()} ${extname(file.originalname)}`);
    },
  }),
};
