import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const User = db.define('projects', {
    project_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    status: DataTypes.ENUM('ongoing', 'completed', 'pending'),
    assigned_to: DataTypes.INTEGER,
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

}, { timestamps: true });

export default Task;
