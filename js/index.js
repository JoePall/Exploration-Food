/**
 * Creates a Spoonacular API Query from the preferences provided.
 * @constructor
 * @param {string} preferences - the response from the Spoonacular query.
 * TODO: Fill out the rest of the param details.
 */
function queryAPI(preferences, callback) {
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + preferences.Search.replace(" ", "%20");
    
    if (preferences.Cuisine && preferences.Cuisine.length > 0) {
        queryURL += "&cuisine=";
        preferences.Cuisine.forEach(item => queryURL += item.replace(" ", "%20") + ",");
        queryURL = queryURL.slice(0, -1);
    }
    if (preferences.Diet && preferences.Diet.length > 0) {
        queryURL += "&diet=";
        preferences.Diet.forEach(item => queryURL += item.replace(" ", "%20") + ",");
        queryURL = queryURL.slice(0, -1);
    }
    if (preferences.Intolerances && preferences.Intolerances.length > 0) {
        queryURL += "&intolerances=";
        preferences.Intolerances.forEach(item => queryURL += item.replace(" ", "%20") + ",");
        queryURL = queryURL.slice(0, -1);
    }
    if (preferences.Meal_Type && preferences.Meal_Type.length > 0) {
        queryURL += "&type=";
        preferences.Meal_Type.forEach(item => queryURL += item.replace(" ", "%20") + ",");
        queryURL = queryURL.slice(0, -1);
    }

    queryURL += "&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&addRecipeNutrition=true&number=4&apiKey=" + preferences.apiKey;
    
    console.log(queryURL);
    $.getJSON(queryURL, response => {
        var result = [];
        
        response.results.forEach(item => {
            var recipe = {
                title: item.title,
                source: item.sourceUrl,
                image: item.image,
                summary: item.summary,
                instructions: item.analyzedInstructions,
                nutrition: item.nutrition,
                ingredients: item.extendedIngredients
            };

            result.push(recipe);
        });
        
        callback(result);
    });
}