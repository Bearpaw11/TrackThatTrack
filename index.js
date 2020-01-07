const lastFmKey = "d3085bfaa5ede08f67f9926f412ffa08"

$(document).ready(function() {

$(".searchBtn").on("click", function(event) {

    event.preventDefault();
    const artist = $("#searches").val();
    const queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + lastFmKey + "&format=json"


$.ajax({
    url: queryURL,
    method: "get"
}).then(function(response) {
    let bio = response.artist.bio.summary
    $(".bioCard").append("<div>" + bio + "</div>");
    console.log(response.artist.name)
    for (let i =0; i<response.artist.similar.artist.length; i++){
        console.log(response.artist.similar.artist[i].name)
    $(".similarCard").append("<div>" + response.artist.similar.artist[i].name + "</div>") 
    }
    for (let i=0; i<response.artist.tags.tag.length; i++){
        console.log(response.artist.tags.tag[i].name)
    }
    console.log(response.artist.bio.summary)
})
})
})