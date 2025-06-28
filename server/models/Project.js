import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Project = db.define('projects', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client_id: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.ENUM('ongoing', 'completed', 'pending'),
    defaultValue: 'pending'
  },
  deadline: {
    type: DataTypes.DATE
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true
});

export default Project;
