//TODO: Add Dine out option?
//TODO: Add Meal Service option?
//TODO: Add Toggle (Dine In | Meal Service | Dine Out)

var test = true;
var recipeArr = [];
var index = 0

$("#filter").click(event => {
    event.preventDefault();
    if ($("#filter-content").hasClass("is-hidden")) {
        $("#filter-content").removeClass("is-hidden");
    } else {
        $("#filter-content").addClass("is-hidden");
    }
});

$("#recipes").on("click", "section", event => {
    event.preventDefault();

    // Navigates to the recipe source
    window.open($(event.currentTarget).val());
});

$("#open-search").click(event => {
    event.preventDefault();
    $(".notification").addClass("is-hidden");
    newSearch();
});

function newSearch() {
    $(".is-in-recipe").addClass("is-hidden");
    $(".is-in-search").removeClass("is-hidden");
}

$("#search").click(event => {
    event.preventDefault();

    // Loading spinner for search button
    $("#search").addClass('is-loading');

    var preferences = getPreferencesInput();

    // Highlights missing api key and places user back to that input
    if (!preferences.apiKey) {
        apiKeyErrorHandler();
        return;
    }

    queryAPI(preferences, result => {
        $("#search").removeClass('is-loading');

        if (result == null) {
            //TODO: Display "no results found" message to user
            return;
        }

        $(".is-in-recipe").removeClass("is-hidden");
        $(".is-in-search").addClass("is-hidden");
        $(".notification").addClass("is-hidden");
        $("#previous-recipe").attr("disabled", "true");
        $("#next-recipe").removeAttr("disabled");

        recipeArr = result;
        index = 0;

        save_history();

        displayRecipes();
    }, (code) => {
        $("#search").removeClass('is-loading');
        $(".notification").removeClass("is-hidden");

        if (code == 401) {
            $(".notification>p").text("API Key invalid");
            apiKeyErrorHandler();
        } else {
            $(".notification>p").text("Search returned no results");
        }
    });

    $("#space-shuttle").animate({
        margin: "0 0 0 500px",
        opacity: "0"
    }, 400, () => {
        $("#space-shuttle").removeAttr("style");
    });

    $(".is-in-recipe").addClass("is-hidden");
    $(".is-in-search").removeClass("is-hidden");
    $("#profile-name").focus();
});

function apiKeyErrorHandler() {
    $("#search").removeClass('is-loading');
    $("#api-key").addClass("is-danger")
        .attr("placeholder", "Required Field - API Key")
        .focus();
}


$("#api-key").focusout(event => {
    $("#api-key").removeClass("is-danger")
        .attr("placeholder", "API Key for Spoonacular");
});

$("#close-save-option").click(event => {
    event.preventDefault();

    if (!$("#save-profile").hasClass("is-hidden")) {
        $("#save-profile").addClass("is-hidden");
    }
});

$("#previous-recipe").click(event => {
    var displayedNumber = parseInt($("#display-number>select").val());
    index -= displayedNumber;
    if (index == 0) {
        $("#previous-recipe").attr('disabled', true);
    }

    $("#next-recipe").attr('disabled', false);
    displayRecipes();
});

$("#next-recipe").click(event => {
    var displayedNumber = parseInt($("#display-number>select").val());
    index += displayedNumber;

    if (recipeArr.length <= displayedNumber) {
        $("#next-recipe").attr('disabled', true);
        $("#previous-recipe").attr('disabled', true);
        $(".notification>p").text("Only " + recipeArr.length + " results found.");
        $(".notification").removeClass("is-hidden");

        return;
    }

    if (recipeArr.length - index < displayedNumber) {
        $("#next-recipe").attr('disabled', true);
        return;
    }

    $("#previous-recipe").attr('disabled', false);
    displayRecipes();
});

function displayRecipes() {
    $("#search").removeClass('is-loading');
    $("#recipes").empty();
    var number = $("#display-number>select").val();

    for (let i = 0; i < number; i++) {
        var position = (i + parseInt(index));

        if (position < recipeArr.length) {
            $("#recipes").append(generateRecipeHTML(recipeArr[position]));
        }
    }
}

function generateRecipeHTML(recipe) {
    var result = $("<section>").addClass("recipe has-text-centered tile is-full").val(recipe.source);

    var article = $("<article>").addClass(" is-mobile tile is-child notification is-success ");

    article.append($("<p>").addClass("title").text(recipe.title));

    var figure = $("<figure>").addClass("image");
    figure.append($("<img>").addClass("recipe-image is-centered").attr("src", recipe.image));
    article.append(figure);

    article.append($("<br>"));

    article.append($("<p>").addClass("subtitle is-6").html(recipe.summary));

    result.append(article);

    return result;
}

$(".close-modal").click(() => {
    $(".modal").removeClass("is-active");
});

$(".close-message").click(() => {
    $(".notification").addClass("is-hidden");
});

function getPreferencesInput() {
    var result = {
        Profilename: "",
        displayNumber: 1,
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
    result.displayNumber = $("#display-number>select").val();
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

function getCheckboxGroupHTML(name, preferences) {
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
    var result = $("<section>").addClass("control column");

    result.append($("<h1>").text(name.replace("_", " ")));

    var items = queryParam[name];
    for (var item in items) {
        if (test) console.log(item);
        var label = $("<label>").addClass("checkbox is-flex-tablet " + name);

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
        if (preferences.apiKey != null) {
            $("#api-key").val(preferences.apiKey);
        }

        $("#search-text").val(preferences.Search);
        $("#include-ingredients").val(preferences.Include_Ingredients);
        $("#exclude-ingredients").val(preferences.Exclude_Ingredients);
    }

    var groupNames = ["Intolerances", "Cuisine", "Diet", "Meal_Type"]
    groupNames.forEach(name => {
        $("#filter-content")
            .append(getCheckboxGroupHTML(name, preferences))
            .append("<br><hr><br>"); //Divider
    });
}

function init() {
    $("#search-text").focus();

    if (typeof key !== 'undefined') {
        $("#api-key").val(key);
    }

    loadFilterHTML();
}
init();

function save_history() {
    var result = JSON.parse(localStorage.getItem("histories"));

    if (result == null) {
        result = [];
    }

    let montharray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var preferences = getPreferencesInput();
    if (test) console.log("preferences = ", preferences);

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let monthTxt = montharray[month]
    let day = date.getDate();
    let hours = date.getHours();
    if (hours < 0) {
        hours = hours + 24;
    }
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (test) console.log("checkboxes = " + checkboxes.length);
    var datevar = monthTxt + "-" + day + "-" + year + " " + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
    datevar = datevar + " - " + preferences.Search + " - " + checkboxes.length + " Filters used..."


    if (test) console.log("Date and Time plus search term = " + datevar);

    result.push([datevar, preferences]);

    localStorage.setItem("histories", JSON.stringify(result));
}

$("#open-history").click(event => {
    event.preventDefault();
    $("#history-modal").addClass("is-active");

    var histories = JSON.parse(localStorage.getItem("histories"));
    if (test) console.log("histories = ", histories);

    if (histories == null) return;
    $("#histories").empty();
    histories.forEach(history => {
        var result = $("<section>").addClass("history-item").val(JSON.stringify(history[1]));
        if (test) console.log("history[1] = ", history[1]);
        result.append($("<h2>").addClass("has-text-black is-size-4 pt-3").text(history[0]));
        if (test) console.log("history[0] = " + history[0])
        $("#histories").append(result);
        if (test) console.log("result = " + JSON.stringify(result));
    });
});

$("#histories").on("click", "section", event => {
    var preference = $(event.currentTarget).val();
    preference = JSON.parse(preference);

    $("#history-modal").removeClass("is-active");
    loadFilterHTML(preference);

    $(".is-in-recipe").addClass("is-hidden");
    $(".is-in-search").removeClass("is-hidden");
});

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
        result.append($("<h2>").addClass("has-text-black is-size-4 pt-3").text(profile[0]));
        $("#profiles").append(result);
    });
});


$("#profiles").on("click", "section", event => {

    var profile = $(event.currentTarget).val();
    profile = JSON.parse(profile)
    if (test) console.log(profile)
    loadFilterHTML(profile);
    if (test) console.log("click -profile")
    $("#profile-modal").removeClass("is-active");

    $(".is-in-recipe").addClass("is-hidden");
    $(".is-in-search").removeClass("is-hidden");
});

$('#display-number>select').on('change', function () {
    displayRecipes();
});

function queryAPI(preferences, callback, failed) {
    console.log(preferences.Search)
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

    queryURL += "&instructionsRequired=false" +
        "&fillIngredients=false" +
        "&addRecipeInformation=true" +
        "&addRecipeNutrition=false" +
        "&number=20" +
        "&apiKey=" + preferences.apiKey;

    if (test) console.log(queryURL);
    $.getJSON(queryURL, response => {

        if (response.results.length > 0) {
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
        } else {
            failed();
        }
    }).fail((error) => {
        failed(error.status);
    });;
}