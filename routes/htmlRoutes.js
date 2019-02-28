var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Beers.findAll({}).then(function(dbBeers) {
      res.render("index", {
        msg: "NEVER FORGET YOUR FAVORITES",
        beers: dbBeers
      });
    });
  });
};
