import {mealsContainer, cardsContainer, searchBox, SectionsContainer} from "./main.js";

const navLinks = document.querySelectorAll('.sideBar ul li');
const loadingSpinner = document.getElementById('loadingSpinner');


navLinks[4].addEventListener('click',()=>{
  mealsContainer.classList.replace('d-block','d-none')
  SectionsContainer.classList.replace('d-none','d-block');
  navLinks.forEach(navLink => {
    navLink.classList.remove('active')
  });
  navLinks[4].classList.add('active')
  displayIngredients();
  cardsContainer.classList.replace('d-none','d-flex');
  searchBox.classList.add('d-none');
})


  async function displayIngredients(){
    loadingSpinner.classList.replace('d-none','d-flex');
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let {meals} = await response.json();
    let box = ``;
    for (let i = 0; i < 50; i++) {
      box += `
          <div class="cards text-center cursor-pointer" onclick="dispalyIngredientsMeals('${meals[i].strIngredient}')">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h4 class="mb-3">${meals[i].strIngredient}</h4>
            <p id="ingredientDescription">${meals[i].strDescription?meals[i].strDescription:''}</p>
          </div>
        `;
    }
    cardsContainer.innerHTML = box;
    loadingSpinner.classList.replace('d-flex','d-none');
  }

  async function dispalyIngredientsMeals(term) {
    loadingSpinner.classList.replace('d-none','d-flex');
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
    let {meals} = await response.json();
      let box = ``;
      for (let i = 0; i < meals.length; i++) {
        box += `
            <div class="cards" onclick="dispalyDetails('${meals[i].idMeal}')">
              <div class="image position-relative overflow-hidden" style="cursor: pointer">
                <img src="${meals[i].strMealThumb}" alt="${meals[i].strMeal}" class="w-100 rounded-3">
                <h6 class="position-absolute w-100 h-100 rounded-3">${meals[i].strMeal}</h6>
              </div>
            </div>
          `;
      }
      cardsContainer.innerHTML = box;
      loadingSpinner.classList.replace('d-flex','d-none');
    }

  window.dispalyIngredientsMeals =dispalyIngredientsMeals;
