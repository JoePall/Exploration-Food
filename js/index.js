//TODO: Add Dine out option?
//TODO: Add Meal Service option?
//TODO: Add Toggle (Dine In | Meal Service | Dine Out)

var test = true;
var recipe = [];
var recipeArr = [];
let profilenamearray = [];


$("#filter").click(event => {
    event.preventDefault();
    if ($("#filter-content").hasClass("is-hidden")) {
        $("#filter-content").removeClass("is-hidden");
    } else {
        $("#filter-content").addClass("is-hidden", 550);
    }
});

$("#search").click(event => {
    event.preventDefault();

    // Fades out the previous recipes result
    $("#recipes").animate({
        opacity: "0"
    }, 200);

    // Loading spinner for search button
    const search = document.getElementById('search');
    search.addEventListener('click', () => {
        search.classList.add('is-loading');
        //search.removeClass('is-loading');
    });


    var preferences = getPreferencesInput();

    // Highlights missing api key and places user back to that input
    if (!preferences.apiKey) {
        $("#api-key").css("border-color", "#ff0000");
        $("#api-key").attr("placeholder", "Required Field - API Key");
        $("#api-key").focus();
        return;
    }

    $("#recipes").click(event => {
        event.preventDefault();
        console.log("click")
        console.log($(event.currentTarget).val())
        // Navigates to the recipe source
        window.open($(event.currentTarget).val());
    });
    recipeArr = [];
    queryAPI(preferences, result => {
        $("#recipes").empty();

        recipeArr = [];
        index = 0;
        result.forEach(recipe => recipeArr.push(recipe));

        displayRecipe();
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

$("#close-save-option").click(event => {
    event.preventDefault();

    if (!$("#save-profile").hasClass("is-hidden")) {
        $("#save-profile").addClass("is-hidden");
    }
});

$("#previous-recipe").click(event => {
    if (index > 0) {
        index--;
    }
    else {
        $("<h3>Sorry, No More Recipes. Try a Different Search.</h3>").appendTo($("#recipes"));
    }
    displayRecipe();
});

$("#next-recipe").click(event => {
    if (index < recipeArr.length) {
        index++;
    }
    else {
        $("<h3>Sorry, No More Recipes. Try a Different Search.</h3>").appendTo($("#recipes"));
    }
    displayRecipe();
});

$("#history").click(event => {

});

//TODO: index should be stored in localStorage to avoid global variables
var index = 0

function displayRecipe() {
    if (test) console.log(index);
    $("#new-recipe").attr("data-index", index);
    $("#search").removeClass('is-loading');
    $("#recipes").empty();

    if (recipeArr[index] === undefined) {
        $("<h3>Sorry, No More Recipes. Try a Different Search.</h3>").appendTo($("#recipes"));
    } else {
        if (test) console.log(index);
        if (test) console.log(recipeArr[index]);
        generateRecipeHTML(recipeArr[index]);
    }
}

$("#close-modal").click(event => {
    $(".modal").removeClass("is-active");
});

function getPreferencesInput() {
    var result = {
        Profilename: "",
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
    result.Profilename = $("#profile-name").val();
    if (test) console.log("result.apiKey = " + result.apiKey);
    if (test) console.log("result.Include_Ingredients = " + result.Include_Ingredients);
    if (test) console.log("result.Exclude_Ingredients = " + result.Exclude_Ingredients);

    $.each($(".Cuisine>input:checked"), (i, item) =>
        result.Cuisine.push($(item).val()));

    $.each($(".Intolerances>input:checked"), (i, item) =>
        result.Intolerances.push($(item).val()));

    $.each($(".Meal_Type>input:checked"), (i, item) =>
        result.Meal_Type.push($(item).val()));

    $.each($(".Diet>input:checked"), (i, item) =>
        result.Diet.push($(item).val()));

    if (test) console.log("result.Cuisine = " + result.Cuisine);
    if (test) console.log("result.Intolerances = " + result.Intolerances);
    if (test) console.log("result.Meal_Type = " + result.Meal_Type);
    if (test) console.log("result.Diet = " + result.Diet);

    if (test) console.log("result" + JSON.stringify(result));
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
        if (test) console.log(item);
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

    if (preferences != null) {
        $("#api-key").val(preferences.apiKey);
    }


    var groupNames = ["Intolerances", "Cuisine", "Diet", "Meal_Type"]
    groupNames.forEach(name => {
        $("#filter-content")
            .append(getCheckboxGroupHTML(name, preferences))
            .append("<br><hr><br>"); //Divider
    });
}


function generateRecipeHTML(recipe) {

    var result = $("<section>").addClass("recipe has-text-centered column tile is-8 is-parent");

    var article = $("<article>").addClass("tile is-child notification is-success ");

    article.append($("<p>").addClass("title").text(recipe.title));

    var figure = $("<figure>").addClass("image is-4by3");
    figure.append($("<img>").attr("src", recipe.image));
    article.append(figure);

    article.append($("<br>"));

    article.append($("<p>").addClass("subtitle is-6").html(recipe.summary));

    result.append(article);

    $("#recipes").append(result).val(recipe.source);
}

function init() {
    $("#search-text").focus();

    if (typeof key !== 'undefined') {
        $("#api-key").val(key);
    }

    loadFilterHTML();
}
init();

$("#save-search").click(event => {
    event.preventDefault();

    // Closes the save profile input section
    $("#save-profile").addClass("is-hidden");

    var result = JSON.parse(localStorage.getItem("profiles"));
    var name = $("#profile-name").val();
    var preferences = getPreferencesInput();

    if (result == null) {
        result = [];
    }

    result.push([name, preferences]);

    localStorage.setItem("profiles", JSON.stringify(result));
});

$("#open-profiles").click(event => {
    event.preventDefault();
    $("#profile-modal").addClass("is-active");

    var profiles = JSON.parse(localStorage.getItem("profiles"));

    if (profiles == null) return;
    $("#profiles").empty();
    profiles.forEach(profile => {
        var result = $("<section>").addClass("profile-item").val(JSON.stringify(profile[1]));
        result.append($("<h2>").text(profile[0]));
        $("#profiles").append(result);
    });
});


$("#profiles").on("click", "section", event => {

    var profile = $(event.currentTarget).val();
    profile = JSON.parse(profile)
    console.log(profile)
    loadFilterHTML(profile);
    console.log("click -profile")
    $("#profile-modal").removeClass("is-active");
});

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

    queryURL += "&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&addRecipeNutrition=true&number=20&apiKey=" + preferences.apiKey;

    if (test) console.log(queryURL);
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