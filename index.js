const searchBtn = document.getElementById("search-btn");
const foodList = document.getElementById("food");
const foodDetailsContent = document.querySelector('.food-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const logoutBtn = document.getElementById('logout');

// event listeners
searchBtn.addEventListener('click', getFoodList);
foodList.addEventListener('click', getFoodRecipe);
recipeCloseBtn.addEventListener('click',() => {
    foodDetailsContent.parentElement.classList.remove('showRecipe');
})

function getFoodList(){
    let searchInput = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals){
                data.meals.forEach(meal => {
                    html += `
                        <div class="food-item" data-id="${meal.idMeal}">
                            <div class="food-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="food-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">რეცეპტის მოძიება</a>
                        </div>
                        </div>
                    `;
                    foodList.classList.remove('notFound')
                })
            }else{
                html = 'სამწუხაროდ მსგავსი დასახელების კერძი ვერ მოიძებნა :(';
                foodList.classList.add("notFound");
            }
            foodList.innerHTML = html;
        });
}


function getFoodRecipe(e){
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')){
        let foodItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModel(data.meals));
    }
}

function mealRecipeModel(meal){
    meal = meal[0];
    let html = `
                <h2 class="recipe-title">${meal.strMeal}</h2>
                 <p class="recipe-category">${meal.strCategory}</p>
                 <div class="recipe-instruct">
                     <h3>ინსტრუქცია:</h3>
                     <p>${meal.strInstructions}</p>
                 </div>
                 <div class="recipe-food-img">
                     <img src="${meal.strMealThumb}" alt="food">
                 </div>
                 <div class="recipe-link">
                     <a href="${meal.strYoutube}" target="_blank">იხილეთ ვიდეო</a>
                 </div>
    `;
    foodDetailsContent.innerHTML = html;
    console.log(html);
    foodDetailsContent.parentElement.classList.add('showRecipe')
}
function myFunction() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to leave the site?')) {
        logoutBtn.href = './login-page.html';
    } else {
        return logoutBtn;
    }
})
