module.exports = function(sequelize, DataTypes) {
  var Beers = sequelize.define("Beers", {
    beer: DataTypes.STRING,
    brewery: DataTypes.STRING
  });
  return Beers;
};
