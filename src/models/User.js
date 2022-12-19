import Sequelize, { Model } from 'sequelize';

import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      user: {
        type: Sequelize.STRING,
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
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [4, 25],
            msg: 'Senha deve conter entre 4 e 25 caracteres.',
          },
        },
      },
      state: {
        type: Sequelize.STRING,
        defaultValue: 'valid',
      },
      level: {
        type: Sequelize.STRING,
        defaultValue: 'user',
      },
      password_hash: Sequelize.STRING,
    }, {
      sequelize,
      tabelName: 'users',
    });
    this.addHook('beforeSave', async (user) => {
      if (user.id) return;
      // eslint-disable-next-line no-param-reassign
      user.password_hash = await bcryptjs.hash(user.password, 8);
    });
    this.passwordIsValid = (password, user) => bcryptjs.compare(password, user.password_hash);
    return this;
  }
}
