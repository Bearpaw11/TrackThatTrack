const lastFmKey = "d3085bfaa5ede08f67f9926f412ffa08";
const bitKey = "a9c5d877eaa4fd5368776229d482016f";
$(document).ready(function() {

$(".searchBtn").on("click", function(event) {
    event.preventDefault();
    const artist = $("#searches").val();
    const queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + lastFmKey + "&format=json";
    //LastFM Call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let bio = response.artist.bio.summary;
        $(".bioCard").empty();
        $(".similarCard").empty();
        $(".videoCard").empty();
        $(".bioCard").append("<div>" + "<p>" + bio + "</p>" + "</div>");
        for (let i = 0; i < response.artist.similar.artist.length; i++){
            $(".similarCard").append("<div>" + response.artist.similar.artist[i].name + "</div>") 
        }
        for (let i=0; i < 6; i++){
            let capitals = response.artist.tags.tag[i].name;
            const caps = capitals.charAt(0).toUpperCase() + capitals.slice(1);
            $(".videoCard").append("<div>" + caps + "</div>");
    }
})
const bitURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=a9c5d877eaa4fd5368776229d482016f";
const eventURL = "https://rest.bandsintown.com/artists/" + artist + "/events/?app_id=a9c5d877eaa4fd5368776229d482016f";

//BandsInTown Call
$.ajax({ //PHOTO ONLY
    url: bitURL,
    method: "GET"
}).then(function(response) {
    $(".videoCard").append("<div>" + "<img class='artistPic' src='" + response.image_url + "'>" + "</div>");
})

// COMMENTED OUT FROM MERGING:
// $.ajax({ //Only for getting the BIN link. Link opens in New window
//     url: bitURL,
//     method: "GET"
// }).then(function(response) {
//     console.log(response.url)
//     $(".similarCard").append("<a" + " href='" + response.url + "' " + "target=" + "_blank" + "'" +">LINK TO BANDS IN TOWN PAGE</a>")

// })

$.ajax({ //Only for getting events
    url: eventURL,
    method: "GET"
}).then(function(response) {
    $(".bioCard").append("<div>" + "<p>Upcoming Events: " + "</p>" + "</div>");
    for (let i = 0; i < 10; i++) {
        $(".bioCard").append("<a" + " href='" + response[i].url + "'" + "target=" + "_blank" + "" + '>' + response[i].datetime + ", " + response[i].venue.name + ", " + response[i].venue.city + "</a>");
    }
    
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