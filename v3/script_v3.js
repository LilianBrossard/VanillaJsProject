Currency.fill_currencies(); // Remplir le tableau associatif
// console.table(Currency.all_currencies); // Afficher les devises

Language.fill_languages(); // Remplir le tableau associatif des langues
// console.table(Language.all_languages); // Afficher les langues

Country.fill_countries(); // Remplir le tableau associatif des pays
// console.table(Country.all_countries); // Afficher les pays

function infoPays(alpha3Code){
    console.log(alpha3Code);
    let body = document.querySelector("body");
    let element = document.createElement("aside");
    element.classList.add("popup");
    element.innerHTML = "<div class='popup-content'><p>Nom : " + Country.all_countries[alpha3Code].name + "</p><p>Population : " + Country.all_countries[alpha3Code].population + "</p><p>Surface : " + Country.all_countries[alpha3Code].area + " km²</p><p>Densité : " + Country.all_countries[alpha3Code].density + " habitants/km²</p><p>Continent : " + Country.all_countries[alpha3Code].region + "</p></div>";
    body.appendChild(element);
    element.addEventListener("click", function() {closePopup();});
}

function closePopup(){
    let body = document.querySelector("body");
    let element = document.querySelector(".popup");
    body.removeChild(element);
}

function addRaw(nom, pop, surf, dens, cont,flag, alpha3Code){
    let table = document.getElementById("countriesV3");
    let element = document.createElement("tr");
    alpha3Code = alpha3Code.toString();
    element.innerHTML = "<td>" + nom + "</td><td>" + pop + "</td><td>" + surf + " km²</td><td>" + dens + " habitants/km²</td><td>" + cont + "</td><td><img src='" + flag + "' alt='drapeau' height='20'></td>";
    element.addEventListener("click", function() {infoPays(alpha3Code);});
    table.appendChild(element);
}

let page=-1;

function newPage(nombre){
    let table = document.getElementById("countriesV3");
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
    addRaw(country.name, country.population, area, density, country.region, flag, country.alpha3Code);
});

newPage(0);