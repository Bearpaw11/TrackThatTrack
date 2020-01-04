const lastFmKey = "d3085bfaa5ede08f67f9926f412ffa08";

//LastFM API Code (by Chris)
$(document).ready(function() {
const queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Nirvana&api_key=" + lastFmKey + "&format=json"

$.ajax({
    url: queryURL,
    method: "get"
}).then(function(response) {
    console.log(response)
    console.log(response.artist.name)
    for (let i =0; i <response.artist.similar.artist.length; i++){
        console.log(response.artist.similar.artist[i].name)
    }
    for (let i=0; i <response.artist.tags.tag.length; i++){
        console.log(response.artist.tags.tag[i].name)
    }
    console.log(response.artist.bio.summary)
})
})

//YouTube API (by Melanie)
const ytKey = "AIzaSyAieSOnGekvLnel6Hjar6pPrYe_mA-eOHo";
const youTube = "https://www.googleapis.com/youtube/v3"
    $.ajax({
        url: youTube,
        method: "GET"
     }).then(function(response) {
        alert(response.type);
    })
