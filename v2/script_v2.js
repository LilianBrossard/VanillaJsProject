Currency.fill_currencies(); // Remplir le tableau associatif
// console.table(Currency.all_currencies); // Afficher les devises

Language.fill_languages(); // Remplir le tableau associatif des langues
// console.table(Language.all_languages); // Afficher les langues

Country.fill_countries(); // Remplir le tableau associatif des pays
// console.table(Country.all_countries); // Afficher les pays

function addRaw(nom, pop, surf, dens, cont,flag){
    let table = document.getElementById("countriesV2");
    let element = document.createElement("tr");
    element.innerHTML = "<td>" + nom + "</td><td>" + pop + "</td><td>" + surf + " km²</td><td>" + dens + " habitants/km²</td><td>" + cont + "</td><td><img src='" + flag + "' alt='drapeau' height='20'></td>";
    table.appendChild(element);
}

let page=-1;

function newPage(nombre){
    let table = document.getElementById("countriesV2");
    let maxPage = Math.ceil(Object.values(Country.all_countries).length/25);
    let elements = table.getElementsByTagName("tr");
    if (nombre >= 0) {
        page ++;
    }
    else {
        page --; 
    }
    debut = page * 25;
    fin = (page+1) * 25;
    for (let i = 1; i < elements.length; i++) {
        elements[i].classList.add("hidden");
    }
    for (let i = debut; i < fin; i++) {
        if (elements[i]) {
            elements[i].classList.remove("hidden");
        }
    }
    // console.log("page = " + page);
    // console.log("maxpage = " + maxPage);
    if (page >= maxPage) {
        let suiv = document.getElementById("Suiv");
        if (suiv) {
            suiv.classList.add("hidden");
        }
    } else {
        let suiv = document.getElementById("Suiv");
        if (suiv) {
            suiv.classList.remove("hidden");
        }
    }
    if (page <= 0) {
        let prev = document.getElementById("Prev");
        if (prev) {
            prev.classList.add("hidden");
        }
    } else {
        let prev = document.getElementById("Prev");
        if (prev) {
            prev.classList.remove("hidden");
        }
    }
}

Object.values(Country.all_countries).forEach(country => {
    const countriess = countries.find((c) => c.alpha3Code === country.alpha3Code);
    const area = countriess.area;
    const flag = countriess.flag;
    const density = Math.round(country.getPopDensity());
    addRaw(country.name, country.population, area, density, country.region, flag);
});

newPage(0);

