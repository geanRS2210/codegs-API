"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class LoginController {
  async index(req, res) {
    try {
      const { user, password } = req.body;
      const userLogin = await _User2.default.findOne({
        where: { user },
      });
      console.log(userLogin);
      if (!userLogin) {
        return res.status(400).json({ errors: 'Usuario inválido' });
      }
      if (!(await _User2.default.passwordIsValid(password, userLogin))) {
        return res.status(400).json({ errors: 'Senha inválida' });
      }
      const { id, level } = userLogin;
      const token = _jsonwebtoken2.default.sign({ id, user }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      if (token) {
        console.log(token);
        return res.json({
          token,
          user,
          level,
          id,
        });
      }
    } catch (e) {
      return res.status(400).json({ e });
    }
  }
}

exports. default = new LoginController();
