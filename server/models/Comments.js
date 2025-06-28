import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const User = db.define('projects', {
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, { timestamps: true });

export default Comments;
