import { Router } from 'express';

import userController from '../controllers/UserController';

const routs = new Router();

routs.post('/', userController.store);
routs.get('/', userController.index);
routs.get('/:id', userController.show);
routs.put('/:id', userController.update);
routs.delete('/:id', userController.delete);
export default routs;
