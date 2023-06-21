import {fetchBreeds, fetchCatByBreed, fetchCatInfo } from './js/cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const BASE_INFO_URL = 'https://api.thecatapi.com/v1/images';
const refs = {
  loader : document.querySelector(".loaderr"),
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
  refs.loader.classList.remove('hidden');
  fetchBreeds().then(data => refs.breedSelect.innerHTML = createMarkUpSelect(data)).catch(err => throwError(err));
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
  refs.catInfo.innerHTML = '';
  currentBreed = evt.target.value;

  fetchCatByBreed(currentBreed).then(data => refs.catInfo.innerHTML = createMarkUpBreedImg(data)).catch(err => throwError(err));
};


function createMarkUpBreedImg(data) {
  let id = data[0].id;  
  
  function fetchCatInfo(id) {
    return fetch(`${BASE_INFO_URL}/${id}`).then(resp => 
      { 
        if (!resp.ok) {
          throw new Error("resp.statusText");
        };
      return resp.json()
      })
  };

  fetchCatInfo(id).then(data => refs.catInfo.insertAdjacentHTML('beforeend', createMarkUpBreedInfo(data))).catch(err => throwError(err));
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


// ======================error========================

function throwError(err) {
  refs.loader.classList.add('hidden');
  // refs.breedSelect.classList.add('hidden');
  // refs.catInfo.classList.add('hidden');

  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
  // console.log(err);
} 


// ======================libraries========================

new SlimSelect({
  select: '#single'
})

Notiflix.Notify.init({
  width: '480px',
  position: 'left-top',
  distance: '120px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 5000,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,
});







