import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const User = db.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'client'),
}, { timestamps: true });

export default User;
