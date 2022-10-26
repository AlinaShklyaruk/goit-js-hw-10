import './css/styles.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const mailUrl = 'https://restcountries.com/v3.1/';
const inputEl = document.querySelector('input#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, 300));

function fetchCountries(countryName) {
    const countriesUrl = `${mailUrl}/name/{countryName}`;
    return fetch(url).then(country => country.json());
}


