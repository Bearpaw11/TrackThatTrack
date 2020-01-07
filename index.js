const lastFmKey = "d3085bfaa5ede08f67f9926f412ffa08";
const bandsInTownKey = "a9c5d877eaa4fd5368776229d482016f";

$(document).ready(function() {

$(".searchBtn").on("click", function(event) {
    event.preventDefault();
    const artist = $("#searches").val();
    const queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + lastFmKey + "&format=json";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    let bio = response.artist.bio.summary;
    $(".bioCard").empty();
    $(".similarCard").empty();
    $(".videoCard").empty();
    $(".bioCard").append("<h4>" + "Bio " + "</h4>");
    $(".videoCard").append("<h4>" + "Videos and Tags: " + "</h4>");
    $(".similarCard").append("<h4>" + "Similar Artists: " + "</h4>");

    for (let i = 0; i < 1; i++) {
        $(".bioCard").append("<div>" + bio + "</div>");
    }
    for (let i = 0; i < response.artist.similar.artist.length; i++){
        $(".similarCard").append("<div>" + response.artist.similar.artist[i].name + "</div>") 
        }
    for (let i = 0; i < 6; i++){
        const capitals = response.artist.tags.tag[i].name;
        const caps = capitals.charAt(0).toUpperCase() + capitals.slice(1);
       $(".videoCard").append("<div>" + caps + "</div>");
    }
})
})
//Storing info to localStorage and persisting

$(".searchBtn").on("click", function() {
    $('input[type="text"]').each(function () { //For each input type that is text ...
        const id = $(this).attr('id');
        const value = $(this).val();
        localStorage.setItem(id, JSON.stringify(value));
    });
});

$('input[type="text"]').each(function () { 
    const getting = $(this).attr('id'); 

   for (let i = 0; i < 3; i++) {
    const array = [];
    const letsGrab = JSON.parse(localStorage.getItem(getting)); 
    if (!array.includes($("#searches").val())) {
        array.push(letsGrab);
        $("#first").append(array[i]);
        $("#second").append(array[i]);
    }
   }
  });
}) //End of search button functionality + document.ready


