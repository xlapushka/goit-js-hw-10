
const BASE_BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const BASE_IMG_URL = 'https://api.thecatapi.com/v1/images/search';
const BASE_INFO_URL = 'https://api.thecatapi.com/v1/images'
const API_KEY = 'live_wElV4PUyrnCsA8lLHCrkJGkYmZocPinp5ZbBGBclEtZAVXWBWGCcrwJQqD8p3U9O';


function fetchBreeds() {
  return fetch(`${BASE_BREEDS_URL}?key=${API_KEY}&l`).then(resp => 
    { 
      if (!resp.ok) {
        throw new Error("resp.statusText");
      };
    return resp.json()
    })
};


function fetchCatByBreed(breedId) {
  return fetch(`${BASE_IMG_URL}?key=${API_KEY}&breed_ids=${breedId}`).then(resp => 
    { 
      if (!resp.ok) {
        throw new Error("resp.statusText");
      };
    return resp.json()
    })
};


function fetchCatInfo(id) {
  return fetch(`${BASE_INFO_URL}/${id}`).then(resp => 
    { 
      if (!resp.ok) {
        throw new Error("resp.statusText");
      };
    return resp.json()
    })
};

export { fetchBreeds, fetchCatByBreed, fetchCatInfo }