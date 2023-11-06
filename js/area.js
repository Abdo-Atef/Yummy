import {mealsContainer, cardsContainer, searchBox, SectionsContainer} from "./main.js";
const navLinks = document.querySelectorAll('.sideBar ul li');
const loadingSpinner = document.getElementById('loadingSpinner');

navLinks[3].addEventListener('click',()=>{
  mealsContainer.classList.replace('d-block','d-none')
  SectionsContainer.classList.replace('d-none','d-block');
  navLinks.forEach(navLink => {
    navLink.classList.remove('active')
  });
  navLinks[3].classList.add('active')
  displayAreas();
  cardsContainer.classList.replace('d-none','d-flex');
  searchBox.classList.add('d-none');
})


  async function displayAreas(){
    loadingSpinner.classList.replace('d-none','d-flex');
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await response.json();
    let box = ``;
    for (let i = 0; i < data.meals.length; i++) {
      box += `
          <div class="cards text-center cursor-pointer" onclick="dispalyAreaMeals('${data.meals[i].strArea}')">
            <i class="fa-solid fa-house-laptop fa-4x mb-2"></i>
            <h4 class="mb-3">${data.meals[i].strArea}</h4>
          </div>
        `;
    }
    cardsContainer.innerHTML = box;
    loadingSpinner.classList.replace('d-flex','d-none');
  }

  async function dispalyAreaMeals(areaName) {
    loadingSpinner.classList.replace('d-none','d-flex');
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
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

window.dispalyAreaMeals = dispalyAreaMeals;