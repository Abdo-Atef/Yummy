import {cardsContainer, searchBox, SectionsContainer,mealsContainer} from "./main.js";
const navLinks = document.querySelectorAll('.sideBar ul li');
const loadingSpinner = document.getElementById('loadingSpinner');

navLinks[2].addEventListener('click',()=>{
  mealsContainer.classList.replace('d-block','d-none')
  SectionsContainer.classList.replace('d-none','d-block');
  navLinks.forEach(navLink => {
    navLink.classList.remove('active')
  });
  navLinks[2].classList.add('active')
  displayCategories();
  cardsContainer.classList.replace('d-none','d-flex');
  searchBox.classList.add('d-none');
})


  async function getCategories(){
    loadingSpinner.classList.replace('d-none','d-flex');
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await response.json();
    return data.categories
  }

  async function displayCategories(){
    let arr = await getCategories();
    let box = ``;
    for (let i = 0; i < arr.length; i++) {
      box += `
          <div class="cards" onclick="dispalyCategoriesMeals('${arr[i].strCategory}')">
            <div class="image position-relative overflow-hidden overflow-y-hidden" style="cursor: pointer">
              <img src="${arr[i].strCategoryThumb}" class="w-100  rounded-3">
              <h6 class="position-absolute w-100 h-100 rounded-3">${arr[i].strCategory}
              </h6>
            </div>
          </div>
        `;
    }
    cardsContainer.innerHTML = box;
    loadingSpinner.classList.replace('d-flex','d-none');
  }

  async function dispalyCategoriesMeals(catName) {
    loadingSpinner.classList.replace('d-none','d-flex');
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
    let {meals} = await response.json();
      let box = ``;
      for (let i = 0; i < meals.length; i++) {
        box += `
            <div class="cards" onclick="dispalyDetails('${meals[i].idMeal}')">
              <div class="image position-relative overflow-hidden" style="cursor: pointer">
                <img src="${meals[i].strMealThumb}" alt="${meals[i].strMeal}" class="w-100 rounded-3">
                <h6 class="position-absolute w-100 h-100 rounded-3" >${meals[i].strMeal}</h6>
              </div>
            </div>
          `;
      }
      cardsContainer.innerHTML = box;
      loadingSpinner.classList.replace('d-flex','d-none');
    }

window.dispalyCategoriesMeals = dispalyCategoriesMeals;