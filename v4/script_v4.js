Currency.fill_currencies(); // Remplir le tableau associatif
// console.table(Currency.all_currencies); // Afficher les devises

Language.fill_languages(); // Remplir le tableau associatif des langues
// console.table(Language.all_languages); // Afficher les langues

Country.fill_countries(); // Remplir le tableau associatif des pays
// console.table(Country.all_countries); // Afficher les pays

let continent = null;
let langue = null;
let search = null;
let page = -1;

function appliquerFiltres() {
  ListeCountry = Object.values(Country.all_countries).filter((country) => {
    if (continent && country.region !== continent) {
      return false;
    }
    if (langue && !country.getLanguages().some((l) => l.name === langue)) {
      return false;
    }
    if (
      search &&
      !country.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          search
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
    ) {
      return false;
    }
    return true;
  });
  affichage(ListeCountry);
  page = -1; // Reset page to 0 after filtering
  newPage(0);
}

function infoPays(alpha3Code) {
  let cross = document.querySelector("#cross");
  cross.classList.remove("hidden");
  let body = document.querySelector("body");
  let element = document.createElement("aside");
  let voisinsText =
    "<p>" +
    Country.all_countries[alpha3Code]
      .getBorders()
      .map((country) => country.name)
      .join(", ") +
    "</p>";
  let currenciesText =
    "<p>" +
    Country.all_countries[alpha3Code]
      .getCurrencies()
      .map((currency) => currency.name)
      .join(", ") +
    "</p>";
  let languagesText =
    "<p>" +
    Country.all_countries[alpha3Code]
      .getLanguages()
      .map((language) => language.name)
      .join(", ");
  +"</p>";
  element.classList.add("popup");
  element.innerHTML =
    "<div class='popup-content'><h3>Nom : " +
    Country.all_countries[alpha3Code].name +
    "</h3><p>Population : " +
    Country.all_countries[alpha3Code].population +
    "</p><p>Densité : " +
    Country.all_countries[alpha3Code].getPopDensity() +
    " habitants/km²</p><p>Continent : " +
    Country.all_countries[alpha3Code].region +
    "</p>" +
    (voisinsText !== "<p></p>" ? "<h4>Voisins :</h4>" + voisinsText : "") +
    (currenciesText !== "<p></p>"
      ? "<h4>Monnaie :</h4>" + currenciesText
      : "") +
    (languagesText !== "<p></p>" ? "<h4>Langues :</h4>" + languagesText : "") +
    "</div>";
  body.appendChild(element);
  element.addEventListener("click", function () {
    closePopup();
  });
}

function FlagPays(alpha3Code) {
  let cross = document.querySelector("#cross");
  cross.classList.remove("hidden");
  let body = document.querySelector("body");
  let element = document.createElement("aside");
  const countriess = countries.find((c) => c.alpha3Code === alpha3Code);
  const flag = countriess.flag;
  element.classList.add("popup");
  element.innerHTML =
    "<div class='popup-content'><img src='" +
    flag +
    "' alt='drapeau' height='100%'></div>";
  body.appendChild(element);
  console.log("flag = " + Country.all_countries[alpha3Code].flag);
  element.addEventListener("click", function () {
    closePopup();
  });
}

function closePopup() {
  let body = document.querySelector("body");
  let element = document.querySelector(".popup");
  let cross = document.querySelector("#cross");
  cross.classList.add("hidden");
  body.removeChild(element);
}

function addRaw(nom, pop, surf, dens, cont, flag, alpha3Code) {
  let table = document.getElementById("countriesV4");
  let element = document.createElement("tr");
  alpha3Code = alpha3Code.toString();
  element.innerHTML =
    "<td class='scale cursor'>" +
    nom +
    "</td><td class='scale cursor'>" +
    pop +
    "</td><td class='scale cursor'>" +
    surf +
    " km²</td><td class='scale cursor'>" +
    dens +
    " habitants/km²</td><td class='scale cursor'>" +
    cont +
    "</td><td class='flag scale cursor'><img src='" +
    flag +
    "' alt='drapeau' height='20'></td>";
  element.addEventListener("click", function () {
    infoPays(alpha3Code);
  });
  element.querySelector(".flag").addEventListener("click", function (event) {
    event.stopPropagation();
    FlagPays(alpha3Code);
  });
  table.appendChild(element);
}

function newPage(nombre) {
  let table = document.getElementById("countriesV4");
  let maxPage = Math.ceil(Object.values(Country.all_countries).length / 25);
  let elements = table.getElementsByTagName("tr");
  if (nombre >= 0) {
    page++;
  } else {
    page--;
  }
  debut = page * 25;
  fin = (page + 1) * 25;
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

function affichage(ListeCountry) {
  let table = document.getElementById("countriesV4");
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  let headerRow = document.createElement("tr");
  headerRow.innerHTML = `
    <th>Nom en français</th>
    <th>Population</th>
    <th>Surface</th>
    <th>Densité de population</th>
    <th>Continent d’appartenance</th>
    <th>Drapeau</th>
  `;
  table.appendChild(headerRow);
  Object.values(ListeCountry).forEach((country) => {
    const countriess = countries.find(
      (c) => c.alpha3Code === country.alpha3Code
    );
    const area = countriess.area;
    const flag = countriess.flag;
    const density = Math.round(country.getPopDensity());
    addRaw(
      country.name,
      country.population,
      area,
      density,
      country.region,
      flag,
      country.alpha3Code
    );
  });
}

affichage(Country.all_countries); // Afficher les pays
newPage(0);

let continents = [];
countries.forEach((country) => {
  if (!continents.includes(country.region) && country.region) {
    continents.push(country.region);
  }
});
let continentFilter = document.getElementById("continentFilter");
continents.forEach((continent) => {
  let option = document.createElement("option");
  option.value = continent;
  option.textContent = continent;
  continentFilter.appendChild(option);
});
continentFilter.addEventListener("change", (event) => {
  continent = event.target.value || null;
  appliquerFiltres();
});

let languages = [];
countries.forEach((country) => {
  country.languages.forEach((language) => {
    if (!languages.includes(language.name)) {
      languages.push(language.name);
    }
  });
});
let languageFilter = document.getElementById("languageFilter");
languages.forEach((language) => {
  let option = document.createElement("option");
  option.value = language;
  option.textContent = language;
  languageFilter.appendChild(option);
});
languageFilter.addEventListener("change", (event) => {
  langue = event.target.value || null;
  appliquerFiltres();
});

let searchInput = document.getElementById("countryFilter");
searchInput.addEventListener("input", (event) => {
  search = event.target.value || null;
  appliquerFiltres();
});
