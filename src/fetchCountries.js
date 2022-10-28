function fetchCountries(countryName) {
    const countriesUrl = `${mailUrl}/name/{countryName}`;
    return fetch(url).then(country => country.json());
}
fetchCountries(peru);