var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/beers", function() {
  // Before each test begins, create a new request server for testing
  // & delete all beers from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all beers", function(done) {
    // Add some beers to the db to test with
    db.Beer.bulkCreate([
      { beer: "First Beer", brewery: "First Brewery" },
      { beer: "Second Beer", brewery: "Second Brewery" }
    ]).then(function() {
      // Request the route that returns all beers
      request.get("/api/beers").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            beer: "First Beer",
            brewery: "First Brewery"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            beer: "Second Beer",
            brewery: "Second Brewery"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
