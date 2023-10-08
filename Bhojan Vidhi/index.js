const searchContainer = document.querySelector("#searchbox");
const searchBtn = document.querySelector("#search-btn");
const mainContainer = document.querySelector("#main-container");
const recipeContainer = document.querySelector(".recipe-conatiner");
const recipeDetails = document.querySelector(".recipe-details");
const recipeDetailsCloseBtn = document.querySelector(".recipe-details-close-btn");
const recipeDetailsContent = document.querySelector(".recipe-details-content");

const fetchMeal = async(query) => {

    recipeContainer.innerHTML = "<h3>Please Wait , We're fetching results..</h3>";

    try{
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        // console.log(response.meals[0]);
    
        recipeContainer.innerHTML = "";
    
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h2>${meal.strMeal}</h2>
                <h4>${meal.strCategory}</h4>
            `
    
            const button = document.createElement('button');
            button.textContent = 'View Recipe';
            recipeDiv.appendChild(button);
    
            button.addEventListener('click', () =>{
                openRecipeDetails(meal);
            });
    
            recipeContainer.appendChild(recipeDiv);
    
        });
    }

    catch (error) {
        recipeContainer.innerHTML=`<img id="oops-img" src="https://thumbs.dreamstime.com/b/oops-sign-18087812.jpg">
        <h2 id="oops-h2">Couldn't find anything related to your search !!</h2>
        `
    }
 
}

fetchIngredients = (meal) => {
    let ingredientList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break ;
        }
    }
    return ingredientList ;
}

openRecipeDetails = (meal) => {

    recipeDetailsContent.innerHTML = `
        <h1 class="recipeName" id="recipeNameId"><u>${meal.strMeal}</u></h1>
        <h4 class="recipeName" id="recipeNameCategory" >Category : ${meal.strCategory}</h4>
        <div id="img-div"><img id="recipe-details-cont-img" src="${meal.strMealThumb}"></div>
        <h3 class="ingredientList" id="ingredientListId">Ingredients :</h3>
        <ul class="ingredientList" >${fetchIngredients(meal)}</ul>
        <div>
            <h3 class="ingredientList" id="recipeInstruction">Instructions :</h3>
            <p class="ingredientList" id="recipeInstructions">${meal.strInstructions}</p>
        </div>
        <p id="youtube-link-para">Click to watch :<a href="${meal.strYoutube}"><img id="youtube-logo" src="https://www.freepnglogos.com/uploads/youtube-logo-icon-transparent---32.png"></a></p>
    `
    // console.log(meal);
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeDetailsCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchContainer.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2 id="empty-search-box">Please enter some meal in search box...</h2>`
    }
    else{
        fetchMeal(searchInput);
    }
});