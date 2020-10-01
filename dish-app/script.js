// les références du conteneur des plats favories 
const mealsElement = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");

const mealPopup = document.getElementById("meal-popup");
const popupCloseBtn  = document.getElementById("close-popup");
const mealInfoElement  = document.getElementById("meal-info");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

getRandomMeal();
fetchFavoriteMeals();

/**
 * every time we refresh we get a new recipe
 */
async function getRandomMeal(){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    /**
     * Lorsque l'appel à fetch réussit, on lit les données et on les parse en utilisant json() pour les convertir en un objet JS, puis enfin on utilise les valeurs de l'objet obtenu pour les insérer dans une liste de noeuds, de manière à afficher nos produits. 
     */
    const responseData =  await resp.json();
    const randomMeal = responseData.meals[0];


    // console.log(randomMeal);

    addMeal(randomMeal, true);
}

async function getMealById(id){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);

    const responseData = await resp.json();
    const meal = responseData.meals[0];

    return meal;
}

async function getMealsBySearch(term){
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);

    const responseData = await response.json();
    const meals = responseData.meals;

    return meals;
}

function addMeal(mealData, random = false) { /**random is by default false */
    // console.log(mealData);

    const meal = document.createElement('div');
    meal.classList.add('meal');
    /**use a ternaire for random true or false */
    meal.innerHTML = `                       
                    <div class="meal-header">
                    ${random ? ` <span class="random">
                    Random Recipe
                </span>` : ""}
                    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"></div>
                    <div class="meal-body">
                        <h4>${mealData.strMeal}</h4>
                        <button class="fav-btn">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>                
    `;

    const btn = meal.querySelector(".meal-body .fav-btn");

    /**add un event listener to the button like, to add favorite, and change the color */
    btn.addEventListener("click", () => {
        /**verification si la classe active est présente */
        if(btn.classList.contains("active")){
            removeMealFromLocalStorage(mealData.idMeal);
            btn.classList.remove("active");
        }else{
            addMealToLocalStorage(mealData.idMeal);
            btn.classList.add("active");
        }

       
        fetchFavoriteMeals();
    }); 

    meal.addEventListener('click', () => {
        showMealInfo(mealData);
    });


    /**ajoutez un nœud à la fin de la liste des enfants d'un nœud parent spécifié. */
    mealsElement.appendChild(meal);
}

/**add favorite meal to the local storage */
function addMealToLocalStorage(mealId){
    const mealIds = getMealsFromLocalStorage();

    localStorage.setItem("mealsIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLocalStorage(mealId){
    const mealIds = getMealsFromLocalStorage();

    localStorage.setItem("mealsIds", JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

function getMealsFromLocalStorage(){
    const mealIds = JSON.parse(localStorage.getItem("mealsIds"));

    /**si on n'a aucune valeur dans la clé on retourne un tableau vide */
    return mealIds === null ? [] : mealIds;
}

async function fetchFavoriteMeals(){
     //clean the container
     favoriteContainer.innerHTML = '';

    const mealIds = getMealsFromLocalStorage();

    const meals = [];

    for(let i = 0; i < mealIds.length; i++){
        const mealId = mealIds[i];

        meal = await getMealById(mealId);

        addMealFav(meal);
        // meals.push(meal);
    }

    // console.log(meals);
    // add then to the screen
}


function addMealFav(mealData) { 
   
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `                       
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    <span>${mealData.strMeal}</span><button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector('.clear');

    btn.addEventListener('click', () => {
        removeMealFromLocalStorage(mealData.idMeal);
        

        fetchFavoriteMeals();
    });

    favMeal.addEventListener('click', () => {
        showMealInfo(mealData);
    });

    /**ajoutez un nœud à la fin de la liste des enfants d'un nœud parent spécifié. */
    favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
    //clean it up
    mealInfoElement.innerHTML = "";

    // update the Meal Info
    const mealEl = document.createElement('div');
    
    // get ingredients and measures
    const ingredients = [];
    for(let i = 1; i <= 20; i++){
        if(mealData['strIngredient'+i]){
            ingredients.push(
                `${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`
            );
        }else{
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img class="popup-img" src="${mealData.strMealThumb}" alt="${mealData.strMeal}"><p>${mealData.strInstructions}</p>
            <h3>Ingredients :</h3>
            <ul>
                ${ingredients
                    .map(
                        (ing) => `
                <li>${ing}</li>
                `
                    )
                    .join("")}
            </ul>
        `;
    
    mealInfoElement.appendChild(mealEl);

    mealPopup.classList.remove('hidden');
    
}


searchBtn.addEventListener('click', async () => {
    mealsElement.innerHTML = '';
    const search = searchTerm.value;

    const meals = await getMealsBySearch(search);
    
    if(meals){
        meals.forEach((meal) => {
            addMeal(meal);
        });
    }
});

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});