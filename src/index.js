import './css/styles.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

import {fetchCountries} from './fetchCountries';
//const { name, capital, flags, population, languages } = fetchCountries;

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
let searchCountry = '';


const inputEl = document.querySelector('input#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    searchCountry = event.target.value.trim();

    fetchCountries(searchCountry).then((country) => {
        if (country.length === 1) {
            countryInfoEl.innerHTML = createCountryInfo(country[0]);
        } else if (country.length >= 2 && country.length <= 10) {

            countryListEl.innerHTML = createCountriesList(country);
        } else if (country.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }

    }).catch((error) => onError);
/*    fetchCountries(searchCountry).then((country) => {
        console.log(country);
        countryInfoEl.insertAdjacentHTML('beforeend', createCountryInfo(country[0]))
    }).catch((error) => Notiflix.Notify.failure('error'));*/
}

function onError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    inputEl.textContent = '';
}

function resetSearch() {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
}


function createCountriesList(countries) {
    return countries.map((country) =>  `<li>
    <img src="${country.flags.svg}" alt="${country.name.common}" width="36"/>
    <p>${country.name.official}</p>
    </li>`).join();
}

function createCountryInfo(country) {
   return `<img src="${country.flags.svg}" alt="${country.name.official}" width="150"/>
    <h1>${country.name.official}</h1>
    <ul>
    <li><h2>Capital:</h2><p>${country.capital}</p></li>
    <li><h2>Population</h2><p>${country.population}</p></li>
    <li><h2>Languages</h2><p>${Object.values(country.languages)}</p></li>
    </ul>`;
}
