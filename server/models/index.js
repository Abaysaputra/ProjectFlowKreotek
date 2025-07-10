import { Sequelize, DataTypes } from 'sequelize';
import createUserModel from './Users.js';
import createProjectModel from './Project.js';
import defineProjectMember from './ProjectMember.js';


const sequelize = new Sequelize('projectflow', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = createUserModel(sequelize, DataTypes);
const Project = createProjectModel(sequelize, DataTypes);
const ProjectMember = defineProjectMember(sequelize, DataTypes);

User.hasMany(Project, { foreignKey: 'client_id', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'client_id', as: 'client' });

Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: 'project_id',
  otherKey: 'user_id',
  as: 'members'
});
User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: 'user_id',
  otherKey: 'project_id',
  as: 'assignedProjects'
});

export {
  sequelize,
  User,
  Project,
  ProjectMember
};
