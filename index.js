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
    let bio = response.artist.bio.summary
    $(".bioCard").empty();
    $(".similarCard").empty();
    $(".bioCard").append("<div>" + bio + "</div>");
    for (let i = 0; i < response.artist.similar.artist.length; i++){
        console.log(response.artist.similar.artist[i].name)
        $(".similarCard").append("<div>" + response.artist.similar.artist[i].name + "</div>") 
        }
    for (let i=0; i <response.artist.tags.tag.length; i++){
        console.log(response.artist.tags.tag[i].name);
    }
    console.log(response.artist.bio.summary);
})
})

// //YouTube AJAX Call
// const ytKey = "AIzaSyAieSOnGekvLnel6Hjar6pPrYe_mA-eOHo";
// const ytQuery = "https://www.googleapis.com/youtube/v3&key=" + ytKey;

// $.ajax({
//     url: ytQuery,
//     method: "GET"
// }).then(function(response) {
//     $(".videoCard").append("<div>" + response.list + "</div>");
//     for (let i = 0; i < 4; i++){ //Putting four so that we just get 3 YT videos
//         $(".videoCard").append("<div>" + response.video[i].name + "</div>");
//     }})})

})

//Storing info to localStorage and persisting

$(".searchBtn").on("click", function() {
    $('input[type="text"]').each(function () { //For each input type that is text ...
        const id = $(this).attr('id');
        const value = $(this).val();
        localStorage.setItem(id, JSON.stringify(value));
    });
});

$('input[type="text"]').each(function () { //For each input type that is text ...
    const getting = $(this).attr('id'); //This says that for each input of text, grab this input text's id
    const letsGrab = JSON.parse(localStorage.getItem(getting) || []); //Put that id in localStorage to grab the value
    document.getElementById(getting).value = letsGrab; //This says empty value in id (getting) is replaced by what's in letsGrab
  });