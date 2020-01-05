const lastFmKey = "d3085bfaa5ede08f67f9926f412ffa08";
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
    $(".bioCard").append("<div>" + bio + "</div>");
    for (let i = 0; i < response.artist.similar.artist.length; i++){
        $(".similarCard").append("<div>" + response.artist.similar.artist[i].name + "</div>") 
        }
    for (let i=0; i < 6; i++){
        let capitals = response.artist.tags.tag[i].name;
        console.log(response.artist.tags.tag[i].name);
        const caps = capitals.charAt(0).toUpperCase() + capitals.slice(1);
        $(".videoCard").append("<div>" + caps + "</div>");
    }
    console.log(response.artist.bio.summary);
})
})
})


//Storing info to localStorage and persisting

$(".searchBtn").on("click", function() {
    $('input[type="text"]').each(function () { 
        const id = $(this).attr('id');
        const value = $(this).val();
        localStorage.setItem(id, JSON.stringify(value));
    });
});

$('input[type="text"]').each(function () { 
    let searchArray = [];
    const getting = $(this).attr('id'); 
    const letsGrab = JSON.parse(localStorage.getItem(getting)); 
    searchArray.push(letsGrab);
    for (let i = 0; i < 3; i++) {
    $(".mostRecent").append("<li>");
    $("<li>").addClass(".mostRecent");
    $(".mostRecent").text(searchArray[i]);
    }
  });