/**
 * Creates an edamam API query from the parameters provided.
 * @constructor
 * @param {string} searchText - the response from the edamam query.
 * @param {string} healthRestrictions - the response from the edamam query.
 * @param {string} response - the function to call with the  response from the edamam query.
 */
function queryEdamamAPI(searchText, healthRestrictions) {
    var queryURL = "https://api.edamam.com/search?q=" + searchText + 
        "&app_id=921c6383&" +
        "app_key=4b501eb01b6e08e86753e67c31502cae"; 
        // not allowed... "&health=" + healthRestrictions;
        console.log(queryURL);
    $.getJSON(queryURL, handleEdamamAPIQuery);
}

/**
 * Handles the response from an edamam query. 
 * @constructor
 * @param {string} response - the response from the edamam query.
 */
function handleEdamamAPIQuery(response) {
    console.log(response);
    response.hits.forEach(hit => {
        var name = hit.recipe.label;
        var imgURL = hit.recipe.image;
        console.log(name);
        console.log(imgURL);
    });
}