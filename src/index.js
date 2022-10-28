import './css/styles.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const mainUrl = 'https://restcountries.com/v3.1/';
const inputEl = document.querySelector('input#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, 300));

function onInput(event) {
    const searchCountry = event.target.value.trim();
    fetchCountries(searchCountry);
    //console.log(searchCountry);
}


function fetchCountries(name) {
    const url = `${mainUrl}/name/${name}?fields=name,capital,flags,population,languages`;
    return fetch(url).then(response => response.json()).then(country => console.log(country));
}
//console.log(fetchCountries('italy'));

