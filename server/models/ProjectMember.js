export default (sequelize, DataTypes) => {
  return sequelize.define("ProjectMember", {
    project_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    tableName: 'project_members',
    timestamps: false
  });
};
