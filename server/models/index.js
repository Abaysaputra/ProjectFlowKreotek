import { Sequelize, DataTypes } from 'sequelize';
import createUserModel from './Users.js';
import createProjectModel from './Project.js';
import createProjectMemberModel from './ProjectMember.js';

const sequelize = new Sequelize('projectflow', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = createUserModel(sequelize, DataTypes);
const Project = createProjectModel(sequelize, DataTypes);

// Relasi
User.hasMany(Project, { foreignKey: 'client_id', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'client_id', as: 'client' });
Project.belongsToMany(User, { through: "ProjectMember", foreignKey: "project_id" });
User.belongsToMany(Project, { through: "ProjectMember", foreignKey: "user_id" });
export { sequelize, Sequelize, User, Project };
export default { sequelize };
