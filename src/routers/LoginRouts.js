import { Router } from 'express';

import loginController from '../controllers/LoginController';

const route = new Router();

route.post('/', loginController.index);

export default route;
