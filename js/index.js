$("#recipes").on("click", "section", event => {
    event.preventDefault();

    // Navigates to the recipe source
    window.open($(event.currentTarget).val());
});

$("#filter").click(event => {
    event.preventDefault();

    if ($("#filter-content").hasClass("is-hidden")) {
        $("#filter-content").removeClass("is-hidden");
    } else {
        $("#filter-content").addClass("is-hidden");
    }
});

$("#search").click(event => {
    event.preventDefault();
    $("#recipes").css("opacity", "0");

    var preferences = getPreferencesInput();

    if (!preferences.apiKey) {
        $("#api-key").css("border-color", "#ff0000");
        $("#api-key").attr("placeholder", "Required Field - API Key");
        $("#api-key").focus();
        return;
    }

    queryAPI(preferences, result => {
        $("#recipes").empty();
        result.forEach(recipe => generateRecipeHTML(recipe));
    });

    $("#space-shuttle").animate({
        margin: "0 0 0 150px",
        opacity: "0"
    }, 200, () => {
        $("#space-shuttle").removeAttr("style");
        $("#recipes").animate({
            opacity: "1"
        }, 200);
    });

    $("#save-profile").removeClass("is-hidden");
    $("#profile-name").focus();
});

$("#save").click(event => {
    event.preventDefault();

    var profile = [[$("#profile-name").val(), getPreferencesInput()]];
    localStorage.setItem("Preferences");

    if (!$("#save-profile").hasClass("is-hidden")) {
        $("#save-profile").addClass("is-hidden");
    }
});

$("#close-save-option").click(event => {
    event.preventDefault();

    if (!$("#save-profile").hasClass("is-hidden")) {
        $("#save-profile").addClass("is-hidden");
    }
});

var index = 0
$("#new-recipe").on("click", function () {

    console.log(index)
    index = index++
    $("#new-recipe").attr("data-index", index++)

    if (recipeArr[index] === undefined) {
        $("#recipes").empty()
        $("<h3>Sorry, No More Recipes. Try a Different Search.</h3>").appendTo($("#recipes"))
    }
    else {
        console.log(index)
        console.log(recipeArr[index])
        generateRecipeHTML(recipeArr[index])
    }
})

function showSaveModal() {

}

function getPreferencesInput() {
    var result = {
        apiKey: "",
        Search: "",
        Include_Ingredients: "",
        Exclude_Ingredients: "",
        Cuisine: [],
        Intolerances: [],
        Diet: [],
        Meal_Type: []
    };

    result.Search = $("#search-text").val();
    result.Include_Ingredients = $("#include-ingredients").val();
    result.Exclude_Ingredients = $("#exclude-ingredients").val();
    result.apiKey = $("#api-key").val();
    console.log("result.apiKey = " + result.apiKey);
    console.log("result.Include_Ingredients = " + result.Include_Ingredients);
    console.log("result.Exclude_Ingredients = " + result.Exclude_Ingredients);

    $.each($(".Cuisine>input:checked"), (i, item) =>
        result.Cuisine.push($(item).val()));

    $.each($(".Intolerances>input:checked"), (i, item) =>
        result.Intolerances.push($(item).val()));

    $.each($(".Meal_Type>input:checked"), (i, item) =>
        result.Meal_Type.push($(item).val()));

    $.each($(".Diet>input:checked"), (i, item) =>
        result.Diet.push($(item).val()));

    console.log("result.Cuisine = " + result.Cuisine);
    console.log("result.Intolerances = " + result.Intolerances);
    console.log("result.Meal_Type = " + result.Meal_Type);
    console.log("result.Diet = " + result.Diet);

    console.log("result" + JSON.stringify(result));
    return result;
}

//queryParam needs to be in getCheckboxGroupHTML after testing...
var queryParam = {
    Cuisine: {
        african: "african",
        american: "American",
        british: "British",
        cajun: "Cajun",
        caribbean: "Caribbean",
        chinese: "Chinese",
        eastern_European: "Eastern%20European",
        european: "European",
        french: "French",
        german: "German",
        greek: "Greek",
        indian: "Indian",
        irish: "Irish",
        italian: "Italian",
        japanese: "Japanese",
        jewish: "Jewish",
        korean: "Korean",
        latin_american: "Latin%20American",
        mediterranean: "Mediterranean",
        mexican: "Mexican",
        middle_Eastern: "Middle%20Eastern",
        nordic: "Nordic",
        southern: "Southern",
        spanish: "Spanish",
        thai: "Thai",
        vietnamese: "Vietnamese",
    },
    Intolerances: {
        dairy: "Dairy",
        egg: "Egg",
        gluten: "Gluten",
        grain: "Grain",
        peanut: "Peanut",
        seafood: "Seafood",
        sesame: "Sesame",
        shellfish: "Shellfish",
        soy: "Soy",
        sulfite: "Sulfite",
        tree_Nut: "Tree%20Nut",
        wheat: "Wheat",
    },
    Diet: {
        gluten_Free: "Gluten Free",
        ketogenic: "Ketogenic",
        vegetarian: "Vegetarian",
        lacto_Vegetarian: "Lacto-Vegetarian",
        ovo_Vegetarian: "Ovo-Vegetarian",
        vegan: "Vegan",
        pescetarian: "Pescetarian",
        paleo: "Paleo",
        primal: "Primal",
        whole30: "Whole30",
    },
    Meal_Type: {
        main_Course: "Main Course",
        side_Dish: "Side Dish",
        dessert: "Dessert",
        appetizer: "Appetizer",
        salad: "Salad",
        bread: "Bread",
        breakfast: "Breakfast",
        soup: "Soup",
        beverage: "Beverage",
        sauce: "Sauce",
        marinade: "Marinade",
        fingerfood: "Fingerfood",
        snack: "Snack",
        drink: "Drink",
    }
};

function getCheckboxGroupHTML(name, preferences) {
    var result = $("<section>").addClass("control column");

    result.append($("<h1>").text(name.replace("_", " ")));

    var items = queryParam[name];
    for (var item in items) {
        console.log(item);
        var label = $("<label>").addClass("checkbox " + name);

        var checkbox = $("<input>").attr("type", "checkbox").addClass("checkbox").val(items[item]);

        // Checks the boxes that are in preferences
        if (preferences) {
            if (preferences[name].includes(items[item])) {
                $(checkbox).prop("checked", "true");
            }
        }
        label.append(checkbox);
        label.append($("<span>").html(item.replace("_", " ")));

        result.append(label);
    }

    return result;
}

function loadFilterHTML(preferences) {
    $("#filter-content").empty();

    var groupNames = ["Intolerances", "Cuisine", "Diet", "Meal_Type"]
    groupNames.forEach(name => {
        $("#filter-content")
            .append(getCheckboxGroupHTML(name, preferences))
            .append("<br><hr><br>"); //Divider
    });
}


function generateRecipeHTML(recipe) {
    var result = $("<section>").addClass("recipe has-text-centered column tile is-8 is-parent").val(recipe.source);

    var article = $("<article>").addClass("tile is-child notification is-primary ");

    article.append($("<p>").addClass("title").text(recipe.title));

    var figure = $("<figure>").addClass("image is-4by3");
    figure.append($("<img>").attr("src", recipe.image));
    article.append(figure);

    article.append($("<br>"));

    article.append($("<p>").addClass("subtitle is-6").html(recipe.summary));

    result.append(article);

    $("#recipes").append(result);
}

function init() {
    loadpreferences();
    $("#search-text").focus();
    if (typeof key !== 'undefined') {
        $("#api-key").val(key);
    }
}
init();


$("#save-search").click(event => {
    event.preventDefault();
    var profilename = $("#profile-name").val();
    console.log("profilename = " + profilename);
    var result = getPreferencesInput();
    console.log("result = ", result)
    result.Profilename = profilename;
    var preferences = result;
    console.log("preferences" + JSON.stringify(preferences));
    localStorage.setItem("Preferences", JSON.stringify(preferences));

});

function loadpreferences() {
    console.log("in load preferences...");
    var profile = JSON.parse(localStorage.getItem("Preferences"));
    if (profile !== null) {
        console.log("profile = ", profile);
        console.log("profilename = " + profile.Profilename);
        $("#profile-name").val(profile.Profilename);
        $("#api-key").val(profile.apiKey);
        $("#include-ingredients").val(profile.Include_Ingredients);
        $("#exclude-ingredients").val(profile.Exclude_Ingredients);
        var intolerancesarray = profile.Intolerances;
        console.log("intolerancesarray = " + intolerancesarray);
        delete profile.Profilename;
        console.log("profile = ", profile);
        loadFilterHTML(profile);
    }
    else {
        loadFilterHTML();
    }
}

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
    if (preferences.Exclude_Ingredients) {
        queryURL += "&excludeIngredients=" + preferences.Exclude_Ingredients;
    }
    if (preferences.Include_Ingredients) {
        queryURL += "&includeIngredients=" + preferences.Include_Ingredients;
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
        // ISSUE HERE
    //     console.log(result)
    //     callback(result);
    //         recipeArr.push(recipe);
    //     })
    //     console.log(recipeArr)
    //         //callback(results);
    // }).then(function() {

        //     $("#recipes").empty();
        //     generateRecipeHTML(recipeArr[0]);

}