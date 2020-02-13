
// Ahmad
var pushedButton="";
$("button").on("click", function(){
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
        });
}
// Ahmad




var i=0;
var nextPage=$("<button>")
var id=[0];
$(nextPage).text("next");
function search() { 
    var api_URL = "https://sv443.net/jokeapi/v2/joke/Any";
    
    $.ajax({
        url: api_URL,
        method: "GET"
    }).then(function(response){
        var flag;
        if(response.type==="single"){
            var strng = response.joke;
        } else{ 
            var strng = response.setup+response.delivery;
        }  
        var incStr = strng.includes("boy","girl","think");  
        if (response.type==="single" & incStr===true){
            flag=$.inArray( response.id, id );
            if (flag===-1){
                id.push(response.id);
                i++;
                $(".joke-display").text(response.joke);
                console.log(response);
                if (i<10) {
                    search();
                }
            }    
        } else{ if(response.type==="twopart" & incStr===true){
                    flag=$.inArray( response.id, id );
                    if (flag===-1){
                        id.push(response.id);
                        i++;
                        console.log(response);
                        var nextLine=$("<p>")
                        $(".joke-display").text(response.setup);
                        nextLine.text(response.delivery);
                        $(".joke-display").append(nextLine);
                        if (i<10) {
                            search();
                        } 
                    }    
                 } else { if (i<10 ) {search()}}
            }
    });
}


var j=0;
var nextPage=$("<button>")
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
        var incStr = strng.includes("boy","girl","think");  
        var flag;
        if (incStr===true){
            flag=$.inArray( response.id, jd );
            if (flag===-1){
                jd.push(response.id);
                j++;
                $(".joke-display").text(response.content);
                console.log(response);
                if (j<10) {
                    search2();
                }
            }else{search2();}   
        } else{search2();}
    });
}






var k=0;
var nextPage=$("<button>")
var kd=[0];
$(nextPage).text("next");

function search3() { 
    var api_URL = "http://api.icndb.com/jokes/random/";
    
    $.ajax({
        url: api_URL,
        method: "GET"
    }).then(function(response){
        var strng = response.value.joke;
        var incStr = strng.includes("boy","girl","think");  
        var flag;
        if (incStr===true){
            flag=$.inArray( response.id, kd );
            if (flag===-1){
                kd.push(response.id);
                k++;
                $(".joke-display").text(response.value.joke);
                console.log(response);
                if (k<10) {
                    search3();
                }
            }else{search3();}   
        } else{search3();}
    });
}
//search();
//search2();
//search3();


// Robert

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
// Robert