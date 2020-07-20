As a person with allergies and / or a picky eater that gets bored easily with old Recipes
I want to have easy access to new and exciting Recipes that adhere to my allergies and food prefrences
So that I can enjoy make new dishes without having to modify the Recipe

(temp name)Picky for a Purpose

Selective Recipe designed to match the needs of all diets and food restrictions. 
Great for those with allergies, religious restrictions, or are simply particular about thier food.
Will present users with an exciting new Recipe generated based on thier personalized profile!

nav
profile
new Recipes
saved Recipes

PROFILE PAGE
Name
Allergy tags bar

Exclude Food for Your Picky Eaters :)  bar
    -Starch
        -rice
        -corn
        -potatoes
    -meat
        -pork
        -chicken
        -fish
          -tiplapia
          -cod
        -beef

    -veggie
        -brussel sprouts
        -zuchinni

    -fruit
        -bannanna 
        -bluberries

NEW Recipe PAGE
RANDOM Recipe ABOVE
Search by food 

Meal Choice bar
    -Breakfast
    -lunch
    -dinner
    -desert
    -snack food

Cuisine
    -mexican
    -chinese

        RANDOM Recipe BUTTON
// Recipe = a short description of the dish, the ingrediant list, a photo, and URL(probably want to attach url to photo)

//when user selects prefrences those prefrences are stored in var or somewhere
// when user hit generate random Recipe button 
// those stored prefrences are used to search API
// AND saved in local storage

// when user returns to the page thier saved prefrencesare retrieved from local storage
//and selected on the page and a Recipe is generated automatically

// error protection user must select some prefrences or a pop up is presented "must choose at least 1 prefference"

//when user chooses allergy prefrence those are Included 
// when user chooses meal prefrence those are Included
// when user chooses prefrences under food groups those prefrences are Excluded
// when user hits generate random Recipe button 
//Then Only Recipes that meet ALL criteria above are generated
// If there are no Recipes that meet ALL criteria show "Sorry no Recipes Found -- try changing prefrences"

//When generate random Recipe button is hit by user
// ONE Recipe is shown above  
//if the user hits generate random button again 
// a new Recipe is shown

//when user loads page if there is no name stored in local storage
// input field for name is displayed 
//if there is a name stored in local storage
//then display that name in html
//error protection AND a button that says "not you?" is presented underneath name

Optional/Future Improvement
//find the time of day and automatically change meal choice based on time [that can be overridden by user]
//give the user the option to save Recipes on seperate html page 'saved Recipes'


working on your own branch 
switch to master 
git pull
switch to your own branch
git merge master
//this merges the updated master onto your branch
//this prevents old code from old master being pushed when you pull request your branch on github

        