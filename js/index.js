/**
 * Creates an Spoonacular API query from the parameters provided.
 * @constructor
 * @param {string} searchText - the response from the Spoonacular query.
 * TODO: Fill out the rest of the param details.
 */
function queryAPI(preferences, callback) {
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + preferences.searchText;
    var apiKey = "bd8a15cb55ed4be3b746a91ed5d860dd";

    if (!apiKey) {
        console.log("No API Key");
        return;
    }

    if (preferences.cuisine) {
        queryURL += "&cuisine=";
        preferences.cuisine.forEach(item => queryURL += item);
    }
    if (preferences.diet) {
        queryURL += "&diet=";
        preferences.diet.forEach(item => queryURL += item);
    }
    if (preferences.intolerances) {
        queryURL += "&intolerances=";
        preferences.intolerances.forEach(item => queryURL += item);
    }
    if (preferences.type) {
        queryURL += "&type=";
        preferences.type.forEach(item => queryURL += item);
    }

    queryURL += "&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&addRecipeNutrition=true&number=1&apiKey=" + apiKey;
    
    console.log(queryURL);
    $.getJSON(queryURL, response => {

        var result = {
            title: response.results[0].title,
            source: response.results[0].sourceUrl,
            image: response.results[0].image,
            summary: response.results[0].summary,
            instructions: response.results[0].analyzedInstructions,
            nutrition: response.results[0].nutrition,
            ingredients: response.results[0].extendedIngredients
        }

        callback(result);
    });
}