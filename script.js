
var pushedButton="";
$(".button").on("click", function(){
    pushedButton =$(this).attr("txt");
    console.log("pushed button: " + pushedButton);
    displayInfo(pushedButton);
});

function displayInfo(sentButton) {
    var api_URL = "https://sv443.net/jokeapi/v2/joke/"+sentButton; //grabs a joke with the given category from the API.
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
    });
}
$(".gif-trigger").on("click", gif_grabber); //grabs a gif using random word sampling, if one of the main 4 buttons (marked "gif-trigger" class) is pressed

var jokeNumber=0;
//var i=0;
var id=[0];
function search() { 
    var api_URL = "https://sv443.net/jokeapi/v2/joke/Any";
    $.ajax({
        url: api_URL,
        method: "GET"
    }).then(function(response){
        var flag;
        if (stopSign===true){return}
        if(response.type==="single"){
            var strng = response.joke;
        } else{ 
            var strng = response.setup+response.delivery;
        } 
        var incStr=false;
        for (t=0;t<keyWords.length;t++){
             incStr = strng.includes(keyWords[t]);
             if (incStr)  {
                 break;
             }
        }
        //var incStr = strng.includes(keyWords[0],keyWords[1],keyWords[2]);  
        if (response.type==="single" & incStr===true){
            flag=$.inArray( response.id, id );
            if (flag===-1){
                id.push(response.id);
                //i++;
                jokeNumber++;
                var parag=$("<p>");
                var lineExtra=$("<hr>")
                $(".joke-display").append(lineExtra);
                $(parag).text(response.joke);
                $(parag).append(lineExtra);
                $(".joke-display").append(parag);
                if (jokeNumber<2) {
                    search();
                }
            } else{search()}   
        } else{ if(response.type==="twopart" & incStr===true){
                    flag=$.inArray( response.id, id );
                    if (flag===-1){
                        id.push(response.id);
                        //i++;
                        jokeNumber++;
                        var lineExtra=$("<hr>")
                        var parag=$("<p>");
                        var nextLine=$("<p>");
                        $(".joke-display").append(lineExtra);
                        $(parag).text(response.setup);
                        $(nextLine).text(response.delivery);
                        $(parag).append(nextLine);
                       // $(parag).append(lineExtra);
                        $(".joke-display").append(parag);
                        if (jokeNumber<2) {
                            search();
                        } 
                    }  else{search()}   
                 } else { if (jokeNumber<2 ) {search()}}
            }
    });
}


var j=0;
var jd=[0];
function search2(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://joke3.p.rapidapi.com/v1/joke",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "joke3.p.rapidapi.com",
            "x-rapidapi-key": "3367949124msh172f5ef1dc35cf5p149ef8jsnb141a19d717e"
        }
    }
    $.ajax(settings).done(function (response) {
        var strng = response.content;
        var incStr=false;
        for (t=0;t<keyWords.length;t++){
             incStr = strng.includes(keyWords[t]);
             if (incStr)  {
                 break;
             }
        } 
        var flag;
        if (stopSign===true){return}
        if (incStr===true){
            flag=$.inArray( response.id, jd );
            if (flag===-1){
                jd.push(response.id);
                //j++;
                jokeNumber++
                var parag=$("<p>");
                var lineExtra=$("<hr>")
                $(".joke-display").append(lineExtra);
                $(parag).text(response.content);
                //$(parag).append(lineExtra);
                $(".joke-display").append(parag);
                if (jokeNumber<1) {
                    search2();
                }
            }else{search2();}   
        } else{search2();}
    });
}



//prepend


var k=0;
var kd=[0];
function search3() { 
    var api_URL = "http://api.icndb.com/jokes/random/";
    if (stopSign===true){return}
    $.ajax({
        url: api_URL,
        method: "GET"
    }).then(function(response){
        var strng = response.value.joke;
        var incStr=false;
        for (t=0;t<keyWords.length;t++){
             incStr = strng.includes(keyWords[t]);
             if (incStr)  {
                 break;
             }
        }
        var flag;
        if (incStr===true){
            flag=$.inArray( response.value.id, kd );
            if (flag===-1){
                kd.push(response.id);
                //k++;
                jokeNumber++
                var lineExtra=$("<hr>")
                var parag=$("<p>");
                $(".joke-display").append(lineExtra);
                $(parag).text(response.value.joke);
               // $(parag).append(lineExtra);
                $(".joke-display").append(parag);
                if (jokeNumber<2) {
                    search3();
                }
            }else{search3();}   
        } else{search3();}
    });
}

var nextJokes=$("<button>").text("next");
var stopSearching=$("<button>").text("stop");
var keyWords;
$("#search-btn").on("click", function(event){
    event.preventDefault();
    stopSign= false;
    $("#nextORstop").empty();
    $(".joke-display").empty();
    $(".joke-display").text("Loading... ")
    // var nextJokes=$("<button>").text("next");
    // var stopSearching=$("<button>").text("stop");
    $("#nextORstop").append(nextJokes,stopSearching);
        keyWords=$("#search-box").val().split(" ");
    search();
    search2();
    search3();
    gif_searcher(keyWords[0]);
})



var stopSign= false;
$("#finish").on("click", function(event){
    event.preventDefault();
    stopSign= true;

})


$(nextJokes).on("click", function(){
    jokeNumber=0;
    $(".joke-display").empty();
    $(".joke-display").text("Loading... ")
    gif_searcher(keyWords[0]);
    search();
    search2();
    search3();
})

$(stopSearching).on("click", function(){
    jokeNumber=0;
    stopSign= true;
})

function sample_word(joke){
    //grabs a non-common word from a given joke (so no "the", "or", "are") and returns it

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
    //samples a random word from the currently-displayed joke, and sends that word to the giphy API. Displays the resulting gif.

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
    //given a search word, searches the giphy API for a gif and displays the result

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
    document.body.appendChild(joke_holder); //add element into the page that will hold the joke for copying

    joke_holder.select();
    joke_holder.setSelectionRange(11, 99999); /*For mobile devices*/ //we start at index 11 so that we don't copy the "Loading..." text

    /* Copy the text inside the text field */
    document.execCommand("copy");
}
$("#joke-copy-btn").on("click", copyJoke); //when the copy joke button is pressed, copies the current joke to the clipboard

function copyGif(){
    //copies the giphy url of the currently displayed gif to the clipboard
    var link_holder = document.createElement("textarea");
    link_holder.style.height = 0;
    link_holder.style.width  = 0;
    link_holder.value = $("#gif-display").attr("src");
    document.body.appendChild(link_holder); //add element into the page that will hold the link for copying

    //console.log(link_holder.value);

    link_holder.select();
    link_holder.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
}


$('#navbar a, .btn-scroll').on('click', function(event){
    if (this.hash !== ' ') {
        event.preventDefault();
        const hash = this.hash;
        $('html, body').animate(
            {scrollTop: $(hash).offset().top- 100
            },
         800  
        );
    }

});


$("#gif-copy-btn").on("click", copyGif); //when the copy gif button is pressed, copies the link of the current gif to the clipboard

 


