import { DataTypes } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  const ProjectMember = sequelize.define("ProjectMember", {
    project_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  });

  return ProjectMember;
};
