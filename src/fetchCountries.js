function fetchCountries(name) {
    const mainUrl = 'https://restcountries.com/v3.1/';
    const url = `${mainUrl}/name/${name}?fields=name,capital,flags,population,languages`;
    return fetch(url).then(response => response.json());
}

export default { fetchCountries };