// Handles search input & click event 
$("#run-search").click(event => {

    event.preventDefault();

    var value = $("#field-input").val();
    
    queryAPI(value, handleAPIQuery);
});

function queryAPI(searchText, healthRestrictions,  callback) {
    var queryURL = "https://api.edamam.com/search?q=" + searchText + 
        "&app_id=921c6383&" +
        "app_key=4b501eb01b6e08e86753e67c31502cae" + 
        "&health=" + healthRestrictions;



    $.getJSON(queryURL, callback);
}

// Handles response
function handleAPIQuery(response) {
    response.hits.forEach(hit => {
        var name = hit.recipe.label;
        var imgURL = hit.recipe.image;
        
    });
}