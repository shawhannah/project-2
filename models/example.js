module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    beer: DataTypes.STRING,
    brewery: DataTypes.STRING,
  });
  return Example;
};
