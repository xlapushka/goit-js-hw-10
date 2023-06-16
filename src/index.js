import {fetchBreeds} from './js/cat-api'

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
};

// function getSomething(limit, breedId) {
//   return fetch(`${BASE_URL}?key=${API_KEY}&limit=${limit}&page=${breedId}`).then(resp => 
//     { 
//       if (!resp.ok) {
//         throw new Error("resp.statusText");
//       };
//     return resp.json()
//     })
// };

// function createMarkUpInfo() {
//   return arr.{name, description, temperament} => `
//       <img src="" class="cat's img" alt="cat" width="200px">
//       <div>
//         <h1 class="cat's breed">${name}</h1> 
//         <p class="breed's description">${description}</p>
//         <p class="temperament's description">
//           <span>Temperament: </span>${temperament}</p>
//       </div>  `.join('')
// }

