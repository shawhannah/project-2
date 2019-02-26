var db = require("../models");

module.exports = function(app) {
  // Get all beers
  app.get("/api/beers", function(req, res) {
    db.Beers.findAll({}).then(function(dbBeers) {
      res.json(dbBeers);
    });
  });

  // Create a new beer
  app.post("/api/beers", function(req, res) {
    db.Beers.create(req.body).then(function(dbBeers) {
      res.json(dbBeers);
    });
  });

  // Delete a beer by id
  app.delete("/api/beers/:id", function(req, res) {
    db.Beers.destroy({ where: { id: req.params.id } }).then(function(dbBeers) {
      res.json(dbBeers);
    });
  });
};
