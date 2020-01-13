const lastFmKey = "d3085bfaa5ede08f67f9926f412ffa08";
const bitKey = "a9c5d877eaa4fd5368776229d482016f";
let searchArray = JSON.parse(localStorage.getItem('search')) || [];  //No need for i because we're just checking for existence

$(document).ready(function() {
    saverGetter(); 
    $('selector').css({'cursor': 'url(TrackThat.png), default'});

$(".searchBtn").on("click", function(event) {
    event.preventDefault();
    if ($("#searches").val() == "") {
        return $(".modal").text("ERROR - you must enter in an artist name.").modal();
    }
    const artist = $("#searches").val();
    saverGetter();
    liCheck(); //Produce modal with error if empty string
    //LastFM Call
    artistCall(artist) 
})

})
function saverGetter() {
    const value = $("#searches").val(); //Grab the val of our search input
     if (!searchArray.includes(value) && value !== "") { //Prevents multiples of same artist & prevents displaying empty <li>
         searchArray.push(value);  //Push the value as long as it meets these requirements
         localStorage.setItem('search', JSON.stringify(searchArray));  //Save the pushed values into the array and save THAT into localStorage
     }    
     another();
}
function liCheck () { //This function says that if there's an empty string, it'll produce a modal w/error
    if ($("#searches").val() == "") {
        return $(".modal").text("ERROR - you must enter in an artist name.").modal();
    }
}
function another() {
    $(".recentList").empty(); //Must clear what we append to
    for (let i = 0; i < 3; i++) { 
        if (i > searchArray.length - 1) { //Ensures we don't have empty list items. Gets last position in array, and when you get PAST that last position...
            break; //Break!
        }
        const liMaker = $("<li>"); //Making the li GLOBALLY
        liMaker.addClass("mostRecent"); //Add the class of mostRecent EVERYTIME to liMaker (<li>)
        liMaker.text(searchArray[i]); //Add the text of the saved localStorage array to liMaker
        $(".recentList").append(liMaker);

        
    }
}

$(".similarCard").on("click", ".sim", function() {
    let artist = $(this).text();
    artistCall(artist)
});

$(".recentList").on("click", ".mostRecent", function() {
    let artist = $(this).text();
    artistCall(artist)
    
});

function artistCall(artist) {
    const queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + lastFmKey + "&format=json";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            let bio = response.artist.bio.summary;
            $(".bioCard").empty();
            $(".similarCard").empty();
            $(".eventCard").empty();
            $(".videoCard").empty();
            $(".artistName").empty();
            $(".instructions").remove();
            $("#collapseOne").removeClass("collapse");
            $("#collapseOne").addClass("collapsed");
            $("#navGlass").addClass("collapsed");
            $("#navGlass").removeAttr("aria-expanded","true");
            $("#navGlass").attr("aria-expanded","false");
            $("#navbarToggleExernalContent").removeClass("show");
            

            $(".bioCard").append("<div>" + "<p>" + bio + "</p>" + "</div>");
            $(".artistName").append(response.artist.name);
            $(".artistName").prepend("<img class='hb' src='hamburgerIconSmb.JPG'>")
            $(".similarCard").append("<div class=" + "'directions'>Click on an artist name to get more information</div>")
            $(".similarCard").append("<br>")
            for (let i = 0; i < response.artist.similar.artist.length; i++) {
                $(".similarCard").append("<div class=" + "'sim'>" + response.artist.similar.artist[i].name + "</div>")
            }

            for (let i = 0; i < 6; i++) {
                let capitals = response.artist.tags.tag[i].name;
                const caps = capitals.charAt(0).toUpperCase() + capitals.slice(1);
                $(".videoCard").append("<div>" + caps + "</div>");
            }
        })
        const bitURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=a9c5d877eaa4fd5368776229d482016f";
        const eventURL = "https://rest.bandsintown.com/artists/" + artist + "/events/?app_id=a9c5d877eaa4fd5368776229d482016f";

        //BandsInTown Call
        $.ajax({ //PHOTO + FB ONLY
            url: bitURL,
            method: "GET"
        }).then(function(response) {
            $(".videoCard").append("<div>" + "<img class='artistPic' src='" + response.image_url + "'>" + "</div>");
            $(".videoCard").append("<a" + " href='" + response.facebook_page_url + "' " + "target=" + "_blank" + "'" + ">" + "<img src='fb.png' height='30px' width='30px'>" + "</a>" + "<a" + " href='" + response.url + "' " + "target=" + "_blank" + "'" + ">" + "       <img src='bit.png' height='30px' width='30px'>" + "</a>");
        })

        $.ajax({ //Only for getting the BIN link. Link opens in New window
            url: bitURL,
            method: "GET"
        }).then(function(response) {
            $(".videoCard").append("<br>")
        })

        $.ajax({ //Only for getting events
                url: eventURL,
                method: "GET"
            }).then(function(response) {
                
                for (let i = 0; i < 10; i++) {
                    let splitDate = response[i].datetime;       
                    $(".eventCard").append("<a" + " href='" + response[i].url + "'" + "target=" + "_blank" + "" + '>' + "<li>" + splitDate.slice(0,10) + ": " + response[i].venue.name + ", " + response[i].venue.city + "</li>" + "</a>");
                    //In the above append, we're slicing the splitDate const to remove the THour information -- the THour information starts at the index number of 10, so we need to do a .slice starting at index 0 and ending at index 10 in order to get the date, but NOT the time. 
                }

            })

    }
