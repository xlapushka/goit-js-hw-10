import {fetchBreeds, fetchCatByBreed, fetchCatInfo } from './js/cat-api'

const refs = {
  loader : document.querySelector(".loader"),
  breedSelect : document.querySelector(".breed-select"),
  catInfo : document.querySelector(".cat-info"),
  error : document.querySelector(".error"),
}

let currentBreed = '';

// document.addEventListener("DOMContentLoaded", fetchBreeds());
refs.breedSelect.addEventListener("change", chosenBreed);



// =====================errors=======================
// function loaderIsOn(evt) {
//   evt.preventDefault();
//   breedSelect.hidden;
//   error.hidden;
//   catInfo.hidden
// }


// =====================select=======================

(() => {
  fetchBreeds().then(data => refs.breedSelect.innerHTML = createMarkUpSelect(data)).catch(err => console.log(err))
})();

function createMarkUpSelect(arr) {  
  return arr.map(el => `
  <option value = "${el.id}">${el.name}</option> `).join('')
}


// =====================cat's info=======================

function chosenBreed(evt) {
  evt.preventDefault();
  currentBreed = evt.target.value;
  fetchCatByBreed(currentBreed).then(data => refs.catInfo.innerHTML = createMarkUpBreedImg(data)).catch(err => console.log(err));
};

function createMarkUpBreedImg(data) {
  let id = data[0].id;  
  fetchCatInfo(id).then(data => refs.catInfo.insertAdjacentHTML('beforeend', createMarkUpBreedInfo(data))).catch(err => console.log(err));

  return `<img src="${data[0].url}" class="cat's img" alt="cat" width="300px">
`};

function createMarkUpBreedInfo(data) {
  let breed = data.breeds[0];
  return ` <div>
            <h1 class="cat's breed">${breed.name}</h1> 
            <p class="breed's description">${breed.description}</p>
            <p class="temperament's description">
              <span class="span">Temperament: </span>
              ${breed.temperament}
            </p>
          </div> `
};







// function createMarkUpBreedInfo(data) {

//   let id = data[0].id;
//   console.log(getInfo(id));
//   let {catsBreed,
//       breedsDescription,
//       temperamentDescription} = getInfo(id);


//   // fetchCatInfo(id).then(data => console.log(data)).catch(err => console.log(err));
  
//   return `<img src="${data[0].url}" class="cat's img" alt="cat" width="300px">
// `};
  

// function getInfo(id) {

//   fetchCatInfo(id).then(data => {console.log(data.breeds[0].name)
//     // let catsBreed = http.name;
//     // let breedsDescription = http.description;
//     // let temperamentDescription = http.temperament;
//   }).catch(err => console.log(err));

  
//   // console.log(data.breeds[0].name, data.breeds[0].description, data.breeds[0].temperament)
//   // data.breeds[0].name
//   return {
//     catsBreed : data.breeds[0].name,
//     breedsDescription : data.breeds[0].description,
//     temperamentDescription : data.breeds[0].temperament
//   } 
// }




