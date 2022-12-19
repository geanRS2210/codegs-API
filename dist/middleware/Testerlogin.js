"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

 async function Authorization(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ errorAuth: 'Operador não logado' });
  }
  const token = authorization.split(' ');
  try {
    const dados = _jsonwebtoken2.default.verify(token[1], process.env.TOKEN_SECRET);
    const { id, user } = dados;
    req.userId = id;
    req.userName = user;
    const userModify = await _User2.default.findOne({
      where: {
        id,
        user,
      },
    });
    if (!userModify) {
      return res.json({ errorAuth: 'Usuário modificado!!' });
    }
  } catch (e) {
    return res.json([e]);
  }
  next();
} exports.default = Authorization;
