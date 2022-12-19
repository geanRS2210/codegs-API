"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      user: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'Usuário já existe, favor cadastra outro nome de usuário!',
        },
        validate: {
          len: {
            args: [4, 250],
            msg: 'Usuario incorreto',
          },
        },
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [4, 25],
            msg: 'Senha deve conter entre 4 e 25 caracteres.',
          },
        },
      },
      state: {
        type: _sequelize2.default.STRING,
        defaultValue: 'valid',
      },
      level: {
        type: _sequelize2.default.STRING,
        defaultValue: 'user',
      },
      password_hash: _sequelize2.default.STRING,
    }, {
      sequelize,
      tabelName: 'users',
    });
    this.addHook('beforeSave', async (user) => {
      if (user.id) return;
      // eslint-disable-next-line no-param-reassign
      user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
    });
    this.passwordIsValid = (password, user) => _bcryptjs2.default.compare(password, user.password_hash);
    return this;
  }
} exports.default = User;
