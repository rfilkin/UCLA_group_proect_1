

function sample_word(joke){
    //grabs a non-common word from a given joke (so no "the", "or", "are")
    var blacklist = ["the", "of", "or", "are", "is", "to", "that", "for", "as"];
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

$("#programming-button").on("click", function() {

    var sampled_word = sample_word("The quick brown fox jumps over the lazy dog");
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
});