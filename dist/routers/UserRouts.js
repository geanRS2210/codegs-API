"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

const routs = new (0, _express.Router)();

routs.post('/', _UserController2.default.store);
routs.get('/', _UserController2.default.index);
routs.get('/:id', _UserController2.default.show);
routs.put('/:id', _UserController2.default.update);
routs.delete('/:id', _UserController2.default.delete);
exports. default = routs;
