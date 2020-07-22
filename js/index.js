/**
 * Creates an Spoonacular API query from the parameters provided.
 * @constructor
 * @param {string} searchText - the response from the Spoonacular query.
 * TODO: Fill out the rest of the param details.
 */
function queryAPI(searchText, cuisine, diet, intolerances, type) {
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

    queryURL += "&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&";

    if (apiKey) {
        queryURL += "&number=1&apiKey=" + apiKey;
    }
    else {
        alert("You don't have an api key!");
    }
    $.getJSON(queryURL, handleAPIQuery);
}


/**
 * Handles the response from the Spoonacular query. 
 * @constructor
 * @param {string} response - the response from the Spoonacular query.
 */
function handleAPIQuery(response) {
    var result = {
        title: response.results[0].title,
        recipeSource: response.results[0].sourceUrl,
        imgUrl: response.results[0].image,
        summary: response.results[0].summary,
        instructions: response.results[0].analyzedInstructions,
        nutrition: nutrition
    }

    return result;
}