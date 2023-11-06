import "./Ingredients.js";
import "./area.js";
import "./category.js";
import { Search, SearchById } from "./search.js";

export const loadingSpinner = document.getElementById('loadingSpinner');
export const navLinks = document.querySelectorAll('.sideBar ul li');
export const SectionsContainer = document.querySelector(".SectionsContainer");
export const cardsContainer = document.querySelector(".SectionsContainer .cardsContainer");
export const mealsContainer = document.querySelector(".mealsContainer");
export const mealDetailsContainer = document.querySelector(".mealsContainer .mealDetailsContainer");
export const searchBox = document.querySelector(".SectionsContainer .searchBox");
const sideBar = document.querySelector(".navLinks");
const closeBtn = document.getElementById("closeBtn");
const openBtn = document.getElementById("openBtn");
const detailsCloseBtn = document.querySelector(".mealsContainer .btn-close");


navLinks[0].addEventListener('click',()=>{
  mealsContainer.classList.replace('d-block','d-none')
  SectionsContainer.classList.replace('d-none','d-block');
  navLinks.forEach(navLink => {
    navLink.classList.remove('active')
  });
  navLinks[0].classList.add('active')
    Search("s", "");
  cardsContainer.classList.replace('d-none','d-flex');
  searchBox.classList.add('d-none');
})

openBtn.addEventListener("click", function () {
  sideBar.style.left = "0";
  openBtn.classList.replace("d-block", "d-none");
  closeBtn.classList.replace("d-none", "d-block");
});
closeBtn.addEventListener("click", function () {
  sideBar.style.left = "-135px";
  closeBtn.classList.replace("d-block", "d-none");
  openBtn.classList.replace("d-none", "d-block");
});
// -----------------------------------------------------------------------------

export function dispalyCards(arr) {
  loadingSpinner.classList.replace('d-none','d-flex');
  let box = ``;
  for (let i = 0; i < arr.length; i++) {
    box += `
        <div class="cards" onclick="dispalyDetails('${arr[i].idMeal}')">
          <div class="image position-relative overflow-hidden" style="cursor: pointer">
            <img src="${arr[i].strMealThumb}" alt="${arr[i].strMeal}" class="w-100  rounded-3">
            <h6 class="position-absolute w-100 h-100 rounded-3" >${arr[i].strMeal}</h6>
          </div>
        </div>
      `;
  }
  cardsContainer.innerHTML = box;
  loadingSpinner.classList.replace('d-flex','d-none')
}
export async function dispalyDetails(id) {
  loadingSpinner.classList.replace('d-none','d-flex');
  const arr = await SearchById(id);
  let recipes = getIngredients(arr[0])
  const box = `
  <div class="col-md-4">
    <img src="${arr[0].strMealThumb}" alt="${arr[0].strMeal}" class="w-100 mb-3 rounded-2">
    <h2>${arr[0].strMeal}</h2>
  </div>
  <div class="col-md-8">
    <h2 class="mb-2">Instructions</h2>
    <p>${arr[0].strInstructions}</p>
    <h2>Area: <span class="fs-4">${arr[0].strArea}</span></h2>
    <h2 class="my-2">Category: <span class="fs-4">${arr[0].strCategory}</span></h2>
    <h3 class="my-2">Recipes: 
      <div class="d-flex flex-wrap gap-2 mt-2">
      ${recipes.map((recipe)=>
        `<span class=" fs-6 bg-primary fw-medium rounded-2 p-1 px-2">${recipe}</span>`).join(' ')
      }
      </div>
    </h3>
    <h3 class="my-2 mb-3">Tags:</h3>
    <a href="${arr[0].strSource}" target="_blank" class="btn btn-danger me-2">Source</a>
    <a href="${arr[0].strYoutube}" target="_blank" class="btn btn-success">Youtube</a>
  </div>
  `;
  mealDetailsContainer.innerHTML = box;
  mealsContainer.classList.replace('d-none','d-block');
  SectionsContainer.classList.add('d-none');

  detailsCloseBtn.addEventListener('click',function () {
    mealsContainer.classList.replace('d-block','d-none');
    SectionsContainer.classList.remove('d-none');
  })
  loadingSpinner.classList.replace('d-flex','d-none');
}
window.dispalyDetails = dispalyDetails;

function getIngredients(mealData) {
  const ingredientsAndMeasures = [];

for (let key in mealData) {
  if (key.startsWith("strIngredient") && mealData[key] !== "") {
    const ingredientNumber = key.slice(13); // Extract the number after "strIngredient"
    const measureKey = "strMeasure" + ingredientNumber;

    if (mealData[measureKey] !== "") {
      const ingredient = mealData[key];
      const measure = mealData[measureKey];
      ingredientsAndMeasures.push(ingredient + ": " + measure);
    }
  }
}
  return ingredientsAndMeasures;
}

  Search("s", "");
