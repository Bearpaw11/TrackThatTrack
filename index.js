const lastFmKey = "d3085bfaa5ede08f67f9926f412ffa08";
const bitKey = "a9c5d877eaa4fd5368776229d482016f";
let searchArray = JSON.parse(localStorage.getItem('search')) || []; //No need for i because we're just checking for existence

$(document).ready(function () {
    saverGetter();

    $(".searchBtn").on("click", function (event) {
        event.preventDefault();
        if ($("#searches").val() == "") {
            return $(".modal").text("ERROR - you must enter in an artist name.").modal();
        }
        const artist = $("#searches").val();
        saverGetter();
        liCheck(); //Produce modal with error if empty string
        //LastFM Call
        artistCall(artist);
    })
})

function saverGetter() {
    const value = $("#searches").val(); //Grab value of our search input
    if (!searchArray.includes(value) && value !== "") { //Prevents multiples of same artist & prevents displaying empty <li>
        searchArray.unshift(value); //Unshift & push add values to arrays - doing unshift instead of push here because doing unshift here ensures the 1st recently searched item will be replaced by the newest search. There will still be a max of 3 <li>s due to the for loop later in the code that uses searchArray.
        localStorage.setItem('search', JSON.stringify(searchArray)); //Save unshifted values into array, save said array into localStorage
    }
    another();
}

function liCheck() { //If there's an empty string, produce modal w/error
    if ($("#searches").val() == "") {
        return $(".modal").text("ERROR - you must enter in an artist name.").modal();
    }
}

function another() {
    $(".recentList").empty(); //Must clear what we append to
    for (let i = 0; i < 3; i++) {
        if (i > searchArray.length - 1) { //Ensures we don't have empty list items. Gets last position in array. When you get past that last position...
            break; //Break!
        }
        const liMaker = $("<li>"); //Making li first
        liMaker.addClass("mostRecent"); //Add .mostRecent EVERYTIME to liMaker (<li>)
        liMaker.text(searchArray[i]); //Add text of saved localStorage array to liMaker 
        $(".recentList").append(liMaker); //Append liMaker to recentList    
    }
}

$(".similarCard").on("click", ".sim", function () {
    let artist = $(this).text();
    artistCall(artist);
});

$(".recentList").on("click", ".mostRecent", function () {
    let artist = $(this).text();
    artistCall(artist);
});

function artistCall(artist) {
    const queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + lastFmKey + "&format=json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let bio = response.artist.bio.summary;
        $(".bioCard").empty(); //Always empty before appending
        $(".similarCard").empty(); //Always empty before appending
        $(".eventCard").empty(); //Always empty before appending
        $(".videoCard").empty(); //Always empty before appending
        $(".artistName").empty(); //Always empty before appending
        $(".instructions").remove();
        $("#collapseOne").removeClass("collapse");
        $("#collapseOne").addClass("collapsed");
        $("#navGlass").addClass("collapsed");
        $("#navGlass").removeAttr("aria-expanded", "true");
        $("#navGlass").attr("aria-expanded", "false");
        $("#navbarToggleExernalContent").removeClass("show");
        $(".bioCard").append("<div>" + "<p>" + bio + "</p>" + "</div>"); //Append bio
        $(".artistName").append(response.artist.name); //Append artist name
        $(".artistName").prepend("<img class='hb' src='hamburgerIconSmb.JPG'>");
        $(".similarCard").append("<div class=" + "'directions'>Click on an artist name to get more information</div>");
        $(".similarCard").append("<br>"); //Appending <br> for aesthetics

        for (let i = 0; i < response.artist.similar.artist.length; i++) {
            $(".similarCard").append("<div class=" + "'sim'>" + response.artist.similar.artist[i].name + "</div>"); //For loop for appending similar artists
        }

        for (let i = 0; i < 6; i++) {
            let capitals = response.artist.tags.tag[i].name; //Capitalizing tags
            const caps = capitals.charAt(0).toUpperCase() + capitals.slice(1); //Ensuring first letter of word is capitalized
            $(".videoCard").append("<div>" + caps + "</div>"); //Appending the finished capitalizations to .videoCard
        }
    })

    //BandsInTown URLs
    const bitURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=a9c5d877eaa4fd5368776229d482016f";
    const eventURL = "https://rest.bandsintown.com/artists/" + artist + "/events/?app_id=a9c5d877eaa4fd5368776229d482016f";

    //BandsInTown Call
    $.ajax({ //PHOTO + SOCIAL MEDIA ONLY
        url: bitURL,
        method: "GET"
    }).then(function (response) {
        $(".videoCard").append("<div>" + "<img class='artistPic' src='" + response.image_url + "'>" + "</div>"); //Appends artist pic
        $(".videoCard").append("<a" + " href='" + response.facebook_page_url + "' " + "target=" + "_blank" + "'" + ">" + "<img src='fb.png' height='30px' width='30px'>" + "</a>" + "<a" + " href='" + response.url + "' " + "target=" + "_blank" + "'" + ">" + "       <img src='bit.png' height='30px' width='30px'>" + "</a>"); //Appends social media with specific height/width
    })

    $.ajax({ //Only for getting events
        url: eventURL,
        method: "GET"
    }).then(function (response) {
        for (let i = 0; i < 10; i++) { //For up to 10 upcoming show dates only
            let splitDate = response[i].datetime; //Making the response a const so we can slice it below
            $(".eventCard").append("<a" + " href='" + response[i].url + "'" + "target=" + "_blank" + "" + '>' + "<li>" + splitDate.slice(0, 10) + ": " + response[i].venue.name + ", " + response[i].venue.city + "</li>" + "</a>");
            //In above append, slice splitDate to remove THour information -- THour starts at index number of 10, so we need to do .slice starting at index 0, ending at index 10 in order to get the date, but NOT the time. 
        }
    })
}
