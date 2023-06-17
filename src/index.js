import {fetchBreeds, fetchCatByBreed, fetchCatInfo } from './js/cat-api'

const refs = {
  loader : document.querySelector(".loader"),
  breedSelect : document.querySelector(".breed-select"),
  catInfo : document.querySelector(".cat-info"),
  error : document.querySelector(".error"),
}

let currentBreed = '';

refs.breedSelect.addEventListener("change", chosenBreed);



// =======================loader-1====================

// document.addEventListener("DOMContentLoaded", showBreedSelect);
// function showBreedSelect() {
//   refs.loader.classList.add('hidden');
//   refs.breedSelect.classList.remove('hidden');
// }

// function showCatInfo() {
//   refs.loader.classList.add('hidden');
//   catInfo.breedSelect.classList.remove('hidden');
// }  


// =====================select=======================

(() => {
  fetchBreeds().then(data => refs.breedSelect.innerHTML = createMarkUpSelect(data)).catch(err => console.log(err));
})();

function createMarkUpSelect(arr) {  
  refs.loader.classList.add('hidden');
  refs.breedSelect.classList.remove('hidden');

  return arr.map(el => `
  <option value = "${el.id}">${el.name}</option> `).join('')
}


// =====================cat's info=======================

function chosenBreed(evt) {
  evt.preventDefault();
  refs.loader.classList.remove('hidden');
  currentBreed = evt.target.value;

  fetchCatByBreed(currentBreed).then(data => refs.catInfo.innerHTML = createMarkUpBreedImg(data)).catch(err => console.log(err));
};

function createMarkUpBreedImg(data) {
  let id = data[0].id;  
  fetchCatInfo(id).then(data => refs.catInfo.insertAdjacentHTML('beforeend', createMarkUpBreedInfo(data))).catch(err => console.log(err));
  return `<div><img src="${data[0].url}" class="cat-img" alt="cat" width="300px" height=auto></div>
`};

function createMarkUpBreedInfo(data) {
  let breed = data.breeds[0];
  refs.loader.classList.add('hidden');
  refs.catInfo.classList.remove('hidden');

  return ` <div>
            <h1 class="cat's breed">${breed.name}</h1> 
            <p class="breed's description">${breed.description}</p>
            <p class="temperament's description">
              <span class="span">Temperament: </span>
              ${breed.temperament}
            </p>
          </div> `
};







