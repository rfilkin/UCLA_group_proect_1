var pushedButton="";
$(".button").on("click", function(){
    pushedButton =$(this).text();
    displayInfo(pushedButton);
});

function displayInfo(sentButton) { 
    var api_URL = "https://sv443.net/jokeapi/v2/joke/"+sentButton;
    $.ajax({
        url: api_URL,
        method: "GET"
    }).then(function(response){
        if(response.type==="single"){
            $(".joke-display").text(response.joke);
        }else{
            var nextLine=$("<p>")
            $(".joke-display").text(response.setup);
            nextLine.text(response.delivery);
            $(".joke-display").append(nextLine);
        }
        gif_grabber();
    });
}

$("#search-btn").on("click", function(){
    gif_searcher($("#search-box").val());
    //displayInfo(pushedButton);
});


function sample_word(joke){
    //grabs a non-common word from a given joke (so no "the", "or", "are")
    var blacklist = ["the", "of", "or", "are", "is", "to", "that", "for", "as", "test"];
    var words = joke.split(" ");
    var result = "";
    while(result == ""){
        var index = Math.floor(Math.random() * words.length); //selects a random index
        var selected_word = words[index].toLowerCase(); //selects a random word and normalizes it to lowercase

        if (blacklist.indexOf(selected_word) < 0){ //if word is not in our blacklist, return. Otherwise, reroll
            result = selected_word;
            return (result);
        }
    }
}

function gif_grabber(){
    var sampled_word = sample_word($(".joke-display").text());
    console.log(sampled_word);

    var api_key = "XhXMrsEUUNOn44NMuFufbM8ji4bdOHdM"; //limit 42 requests per hour, 1000 requests per day
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + api_key +"&tag=" + sampled_word;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#gif-display").attr("src", response.data.image_original_url);
    });
}

function gif_searcher(searched_word){
    var api_key = "XhXMrsEUUNOn44NMuFufbM8ji4bdOHdM"; //limit 42 requests per hour, 1000 requests per day
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + api_key +"&tag=" + searched_word;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#gif-display").attr("src", response.data.image_original_url);
    });
}

function copyJoke(){ 
    //copies the current joke to te clipboard
    var joke_holder = document.createElement("textarea");
    joke_holder.style.height = 0;
    joke_holder.style.width  = 0;
    joke_holder.value = $(".joke-display").text().trim();
    document.body.appendChild(joke_holder); //add element into the page

    joke_holder.select();
    joke_holder.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
}

$("#joke-copy-btn").on("click", copyJoke);

function copyGif(){
    //copies the giphy url of the currently displayed gif to the clipboard
    var link_holder = document.createElement("textarea");
    link_holder.style.height = 0;
    link_holder.style.width  = 0;
    link_holder.value = $("#gif-display").attr("src");
    document.body.appendChild(link_holder); //add element into the page

    //console.log(link_holder.value);

    link_holder.select();
    link_holder.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
}

$("#gif-copy-btn").on("click", copyGif);

// function joke_searcher(){
//     //attempt at direct joke searching via the dad jokes API. Attempt wasn't successful, so this is abandoned
//     event.preventDefault();
//     //var api_URL = "https://jokeapi-v2.p.rapidapi.com/joke/Any?api_key=fa69145befmshc39d266ba3896ddp1a470ejsndddb85d59df4&contains=C%23"
//     var api_URL = "https://icanhazdadjoke.com/search?term=hipster";
//     $.ajax({
//         url: api_URL,
//         method: "GET"
//     }).then(function(response){
//         console.log("looking for dad jokes");
//         console.log(response);
//         $(".joke-display").text(response.joke);
//     });
// }

// $("#search-btn").on("click", joke_searcher);

// $("#programming-button").on("click", function() {

//     var sampled_word = sample_word("The quick brown fox jumps over the lazy dog");
//     console.log(sampled_word);

//     var api_key = "XhXMrsEUUNOn44NMuFufbM8ji4bdOHdM"; //limit 42 requests per hour, 1000 requests per day
//     var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + api_key +"&tag=" + sampled_word;
//     console.log(queryURL);

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response);
//         $("#gif-display").attr("src", response.data.image_original_url);
//     });
// });