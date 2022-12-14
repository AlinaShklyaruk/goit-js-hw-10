import './css/styles.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

import {fetchCountries} from './fetchCountries';

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
    }
    ).catch((error) => onError()).finally(resetMarkup());
};

function onError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    inputEl.textContent = '';
}

function resetMarkup() {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
}

function createCountriesList(countries) {
    return countries.map((country) =>  `<li class="list-item">
    <img src="${country.flags.svg}" alt="${country.name.common}" width="36"/>
    <p style="margin-left: 10px">${country.name.official}</p>
    </li>`).join('');
}

function createCountryInfo(country) {
   return `<img src="${country.flags.svg}" alt="${country.name.official}" width="150"/>
    <h1>${country.name.official}</h1>
    <ul>
    <li class="list-item"><h2>Capital:&nbsp; </h2><p class="list-item-text">${country.capital}</p></li>
    <li class="list-item"><h2>Population:&nbsp; </h2><p class="list-item-text">${country.population}</p></li>
    <li class="list-item"><h2>Languages:&nbsp; </h2><p class="list-item-text">${Object.values(country.languages)}</p></li>
    </ul>`;
}
