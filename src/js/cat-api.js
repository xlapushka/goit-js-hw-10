
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY = 'live_wElV4PUyrnCsA8lLHCrkJGkYmZocPinp5ZbBGBclEtZAVXWBWGCcrwJQqD8p3U9O';

// function fetchBreeds() {
//   return fetch(`${BASE_URL}?key=${API_KEY}&l`).then(resp => 
//     { 
//       if (!resp.ok) {
//         throw new Error("resp.statusText");
//       };
//     return resp.json().then(data => breedSelect.innerHTML = createMarkUpSelect(data)).catch(err => console.log(err));
//     })
// };

export function fetchBreeds() {
  return fetch(`${BASE_URL}?key=${API_KEY}&l`).then(resp => 
    { 
      if (!resp.ok) {
        throw new Error("resp.statusText");
      };
    return resp.json()
    })
};