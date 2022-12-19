"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _LoginController = require('../controllers/LoginController'); var _LoginController2 = _interopRequireDefault(_LoginController);

const route = new (0, _express.Router)();

route.post('/', _LoginController2.default.index);

exports. default = route;
