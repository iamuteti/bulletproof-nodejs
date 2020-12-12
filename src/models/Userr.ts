import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface UserAttributes {
    _id?: string;
    name: string;
    email: string;
    password: string;
    salt: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {

};

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
    const attributes: SequelizeAttributes<UserAttributes> = {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        }
    };

    const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);
    return User;
};
