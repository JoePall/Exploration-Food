/**
 * Creates an Spoonacular API query from the parameters provided.
 * @constructor
 * @param {string} searchText - the response from the Spoonacular query.
 * TODO: Fill out the rest of the param details.
 */
function queryAPI(searchText, cuisine, diet, intolerances, type, callback) {
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + searchText;
    if (cuisine) {
        queryURL += "&cuisine=" + cuisine;
    }
    if (diet) {
        queryURL += "&diet=" + diet;
    }
    if (intolerances) {
        queryURL += "&intolerances=" + intolerances;
    }
    if (type) {
        queryURL += "&type=" + type;
    }

    queryURL += "&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&addRecipeNutrition=true&";

    var apiKey = "bd8a15cb55ed4be3b746a91ed5d860dd";

    if (apiKey) {
        queryURL += "&number=1&apiKey=" + apiKey;
    }
    else {
        alert("You don't have an api key!");
    }
    $.getJSON(queryURL, response => handleAPIQuery(response, callback));
}


/**
 * Handles the response from the Spoonacular query. 
 * @constructor
 * @param {string} response - the response from the Spoonacular query.
 */
function handleAPIQuery(response, callback) {
    var result = {
        title: response.results[0].title,
        recipeSource: response.results[0].sourceUrl,
        imgUrl: response.results[0].image,
        summary: response.results[0].summary,
        instructions: response.results[0].analyzedInstructions,
        nutrition: response.results[0].nutrition,
        ingredients: response.results[0].extendedIngredients
    }

    callback(result);
}