export default (sequelize, DataTypes) => {
  return sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING // harus ada role 'client' agar relasi valid
  }, {
    tableName: 'users',
    timestamps: false
  });
};
