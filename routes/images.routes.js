import { Router } from 'express';
import { ImageController } from '../controllers';
import { setDefaultQueryParameters } from '../middlewares';
import multer from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (
      ext !== '.jpg' &&
      ext !== '.jpeg' &&
      ext !== '.png' &&
      ext !== '.webp'
    ) {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

export const imagesRoutes = Router();

imagesRoutes
  .route('/')
  .get([setDefaultQueryParameters], ImageController.getImages)
  .post(upload.array('images', 7), ImageController.createImage);

imagesRoutes
  .route('/:id')
  .get(ImageController.getImage)
  .put(ImageController.updateImage)
  .delete(ImageController.deleteImage);
