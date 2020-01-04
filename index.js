const lastFmKey = "d3085bfaa5ede08f67f9926f412ffa08"

$(document).ready(function() {
const queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Nirvana&api_key=" + lastFmKey + "&format=json"

$.ajax({
    url: queryURL,
    method: "get"
}).then(function(response) {
    console.log(response)
    console.log(response.artist.name)
    console.log(response.artist.image[1])
    for (let i =0; i<response.artist.similar.artist.length; i++){
        console.log(response.artist.similar.artist[i].name)
    }
    for (let i=0; i<response.artist.tags.tag.length; i++){
        console.log(response.artist.tags.tag[i].name)
    }
    console.log(response.artist.bio.summary)
})
})