import './css/styles.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

import fetchedCountries from './fetchCountries';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
let searchCountry = '';


const inputEl = document.querySelector('input#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    searchCountry = event.target.value.trim();
    fetchedCountries.fetchCountries(searchCountry).then(createCountriesList);
    //const gotCountries = fetchedCountries(searchCountry);
    //console.log(gotCountries);
   countryListEl.insertAdjacentHTML('beforeend', createCountriesList);

   // } else {
     //   Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    //}

    //console.log(searchCountry);
}


//function fetchCountries(name) {
//    const url = `${mainUrl}/name/${name}?fields=name,capital,flags,population,languages`;
//    return fetch(url).then(response => response.json()).then(country => createCountriesList(country));
//}
//console.log(fetchCountries('italy'));

const createCountriesList = country => {
    return `<li><img src="${country.flags[0]}" alt="${country.name.official} "weight="36"/><p>${country.name.official}</p></li>`;
}
