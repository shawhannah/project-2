// Get references to page elements
// var $beerText = $("#beer-text");
// var $beerDescription = $("#beer-description");

var $beerText = $("#beerText");
var $breweryText = $("#breweryText");
var $submitBtn = $("#submit");
var $beerList = $("#beer-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveBeers: function(beers) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/beers",
      data: JSON.stringify(beers)
    });
  },
  getBeers: function() {
    return $.ajax({
      url: "api/beers",
      type: "GET"
    });
  },
  deleteBeers: function(id) {
    return $.ajax({
      url: "api/beers/" + id,
      type: "DELETE"
    });
  }
};

// refreshBeers gets new beers from the db and repopulates the list
var refreshBeers = function() {
  API.getBeers().then(function(data) {
    var $beers = data.map(function(beer) {
      var $a = $("<a>")
        .text(beer.beer)
        .attr("href", "/beer/" + beer.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": beer.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $beerList.empty();
    $beerList.append($beers);
  });
};

// handleFormSubmit is called whenever we submit a new beer
// Save the new beer to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var beer = {
    beer: $beerText.val().trim(),
    brewery: $breweryText.val().trim()
  };

  console.log(beer);

  if (!(beer.beer && beer.brewery)) {
    alert("You must enter an beer text and description!");
    return;
  }

  API.saveBeers(beer).then(function() {
    refreshBeers();
  });

  // $beerText.val("");
  // $breweryText.val("");
};

// handleDeleteBtnClick is called when an beer's delete button is clicked
// Remove the beer from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteBeer(idToDelete).then(function() {
    refreshBeers();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$beerList.on("click", ".delete", handleDeleteBtnClick);
