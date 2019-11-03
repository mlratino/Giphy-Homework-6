$(document).ready(function() {

  var characters = [
    "Michael Scott", "Dwight Schrutte", "Jim Halpert", "Pam Beesly", "Angela Martin", "Kevin Malone",
    "Darryl Philbin", "Erin Hannon", "Holly Flax", "Meredith Palmer", "Ryan Howard","Clark Green",
    "Andy Bernard", "Robert California", "Jan Levinson", "Kelly Kapoor", "Toby Flenderson",
    "Stanley Hudson", "Oscar Martinez", "Phyllis Vance", "Creed Bratton"
  ];

  // This functionwill make the add buttons and display need to move the button and figure out how to handle the topic control. You can write anything in there************************************
//   What if I wanted to limit the input in any way?
  
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }
// create the on-click*****************************************************
  $(document).on("click",".character-button",function() {
    $("#characters").empty();
    $(".character-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=t9jqJfTkXGrRPkurtPfCntbdF38gfq33&limit=11";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) 
      {
        var results = response.data;

        for (var i = 0; i < results.length; i++) 
        {
          var characterDiv = $("<div class=\"character-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var characterImage = $("<img src=" + still + ">");
          characterImage.attr("src", still);
          characterImage.attr("data-still", still);
          characterImage.attr("data-animate", animated);
          characterImage.attr("data-state", "still");
          characterImage.addClass("character-image");

          characterDiv.append(p);
          characterDiv.append(characterImage);

          $("#characters").append(characterDiv);
        }
      });
  });

  $(document).on("click",".character-image",function() 
  {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
console.log("Mose is the best");
  $("#add-character").on("click", function(event) {
    var newCharacterArray = [];
    event.preventDefault();
    var newCharacter = $("input").val();

   
      newCharacterArray.push(newCharacter);
    

    populateButtons(newCharacterArray,"character-button","#newButton");

  });
// create a new array and pushe the input character in.
  populateButtons(characters,"character-button","#character-buttons");
});
console.log("That's what she said!");