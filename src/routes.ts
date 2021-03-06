import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/itemsController';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

const upload = multer(multerConfig);

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.put('/points/:id', pointsController.edit);
routes.delete('/points/:id', pointsController.delete);

routes.post('/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      whatsapp: Joi.string(),
      city: Joi.string().required(),
      uf: Joi.string().required(),
      items: Joi.string().required()
    })
  }),
  pointsController.create);

export default routes;