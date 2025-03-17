Currency.fill_currencies(); // Remplir le tableau associatif
// console.table(Currency.all_currencies); // Afficher les devises

Language.fill_languages(); // Remplir le tableau associatif des langues
// console.table(Language.all_languages); // Afficher les langues

Country.fill_countries(); // Remplir le tableau associatif des pays
// console.table(Country.all_countries); // Afficher les pays

function addRaw(nom, pop, surf, dens, cont,flag){
    let table = document.getElementById("countriesV1");
    let element = document.createElement("tr");
    element.innerHTML = "<td>" + nom + "</td><td>" + pop + "</td><td>" + surf + " km²</td><td>" + dens + " habitants/km²</td><td>" + cont + "</td><td><img src='" + flag + "' alt='drapeau' height='20'></td>";
    table.appendChild(element);
}

Object.values(Country.all_countries).forEach(country => {
    const countriess = countries.find((c) => c.alpha3Code === country.alpha3Code);
    const area = countriess.area;
    const flag = countriess.flag;
    const density = Math.round(country.getPopDensity());
    addRaw(country.name, country.population, area, density, country.region, flag);
});