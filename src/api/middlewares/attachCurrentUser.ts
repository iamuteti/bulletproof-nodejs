import { Container } from 'typedi';
import { Logger } from 'winston';
import { createModels } from '../../models';

const sequelizeConfig = require('../../config/config.json');
const db = createModels(sequelizeConfig);
db.sequelize.sync();

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  const Logger: Logger = Container.get('logger');
  try {
    const userRecord = await db.User.findOne({
      where: { id: Number(req.token._id) },
      raw: true
    })
    if (!userRecord) {
      return res.sendStatus(401);
    }
    const currentUser = userRecord;
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
