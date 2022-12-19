import dotenv from 'dotenv';

dotenv.config();

import './database';

import express from 'express';
import cors from 'cors';
import userRoutes from './routers/UserRouts';
import loginRoutes from './routers/LoginRouts';

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true,
  maxAge: 3600,
};

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
  }

  routes() {
    this.app.use('/operator/', userRoutes);
    this.app.use('/login', loginRoutes);
  }
}

export default new App().app;
