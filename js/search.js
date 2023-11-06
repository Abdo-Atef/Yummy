import { dispalyCards, mealsContainer, loadingSpinner, cardsContainer, searchBox, SectionsContainer} from "./main.js";
const searchByName = document.getElementById('searchByNameInput');
const searchByFL = document.getElementById('searchByFL');
const navLinks = document.querySelectorAll('.sideBar ul li');


navLinks[1].addEventListener('click',()=>{
  mealsContainer.classList.replace('d-block','d-none')
  SectionsContainer.classList.replace('d-none','d-block');
  navLinks.forEach(navLink => {
    navLink.classList.remove('active')
  });
  navLinks[1].classList.add('active')
  cardsContainer.classList.replace('d-flex','d-none');
  searchBox.classList.remove('d-none');
})

searchByFL.addEventListener('keyup', function (){
  cardsContainer.classList.replace('d-none','d-flex');
  if (this.value.length == 1) {
    Search('f' , this.value);
  }
})
searchByName.addEventListener('keyup', function (){
  cardsContainer.classList.replace('d-none','d-flex');
    Search('s' , this.value);
})




  export async function Search(type, Name){
    loadingSpinner.classList.replace('d-none','d-flex');
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${type}=${Name}`)
      const data = await response.json();
      dispalyCards(data.meals)
    } catch (error) {
      console.log(error);
    }
    loadingSpinner.classList.replace('d-flex','d-none')
  }

// -------------------------------------------------------------------



  export async function SearchById(id){
    loadingSpinner.classList.replace('d-none','d-flex');
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.log(error);
    }
    loadingSpinner.classList.replace('d-flex','d-none')
  }


