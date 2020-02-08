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

console.log(sample_word("The quick brown fox jumps over the lazy dog"));

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

});