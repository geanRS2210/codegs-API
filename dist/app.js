"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config();

require('./database');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _UserRouts = require('./routers/UserRouts'); var _UserRouts2 = _interopRequireDefault(_UserRouts);
var _LoginRouts = require('./routers/LoginRouts'); var _LoginRouts2 = _interopRequireDefault(_LoginRouts);

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true,
  maxAge: 3600,
};

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_cors2.default.call(void 0, corsOptions));
  }

  routes() {
    this.app.use('/operator/', _UserRouts2.default);
    this.app.use('/login', _LoginRouts2.default);
  }
}

exports. default = new App().app;
