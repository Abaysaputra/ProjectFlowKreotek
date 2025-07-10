
export default (sequelize, DataTypes) => {
  return sequelize.define('Project', {
    name: { type: DataTypes.STRING, allowNull: false },
    client_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    deadline: DataTypes.DATE,
    description: DataTypes.TEXT
  }, {
    tableName: 'projects',
    timestamps: true
  });
};
