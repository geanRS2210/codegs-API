"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

 async function administrator(req, res, next) {
  try {
    const id = req.userId;
    const user = await _User2.default.findByPk(id);
    const { level } = user;
    if (typeof level !== 'string') {
      return res.json('Operador inválido');
    }
    if (level !== 'administrator') {
      return res.json('Você não pode executar essa tarefa, favor conectar como administrador');
    }
  } catch (e) {
    res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
  next();
} exports.default = administrator;
