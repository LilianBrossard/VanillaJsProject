Currency.fill_currencies(); // Remplir le tableau associatif
// console.table(Currency.all_currencies); // Afficher les devises

Language.fill_languages(); // Remplir le tableau associatif des langues
// console.table(Language.all_languages); // Afficher les langues

Country.fill_countries(); // Remplir le tableau associatif des pays
// console.table(Country.all_countries); // Afficher les pays

function clearlogs() {
  console.clear();
}

//pay qui possède pays frontalier qui n’est pas dans le même continent
function outsideTheContinent() {
  let result = [];
  Object.values(Country.all_countries).forEach((pays) => {//pour tout les objet de la classe Country
    pays.getBorders().forEach((border) => {//pour chaque pays voisin
      if (
        border.region != pays.region &&
        !result.includes(pays)
      ) {//si le pays voisin n'est pas dans le même continent que le pays et que le pays n'est pas déjà dans le tableau de resultat
        result.push(pays);
      }
    });
  });
  console.table(result);
}

//pays qui possède le plus de voisins
function moreNeighbors() {
  let maxVoisins = 0;
  let countriesWithMostVoisins = [];

  Object.values(Country.all_countries).forEach((country) => {//pour tout les objet de la classe Country
    if (country.getBorders().length > maxVoisins) {//si le pays a plus de voisins que le max alors c'est le nouveau max
      maxVoisins = country.getBorders().length;
      countriesWithMostVoisins = [country];
    } else if (country.getBorders().length === maxVoisins) {//si le pays a autant de voisins que le max, ajouter a la liste deja existante
      countriesWithMostVoisins.push(country);
    }
  });

  console.table(
    countriesWithMostVoisins.map((country) => {
      return {
        pays: country.name,
        vosins: country
          .getBorders()
          .map((border) => border.name),
      };
    })
  );
}

//pays qui ne possède pas de voisins
function neighborless() {
  let result = Object.values(Country.all_countries).filter(//pour tout les objet de la classe Country 
    (country) => country.getBorders().length === 0 //ne garder que les pays qui n'ont pas de voisins
  );
  console.table(result.map((country) => country.name));
}

//pays qui possède le plus de langues
function moreLanguages() {
  let maxLanguages = 0;
  let countriesWithMostLanguages = [];
  Object.values(Country.all_countries).forEach((pays) => {//pour tout les objet de la classe Country
    if (pays.getLanguages().length > maxLanguages) {//si le pays a plus de langues que le max alors c'est le nouveau max
      maxLanguages = pays.getLanguages().length;
      countriesWithMostLanguages = [pays];
    } else if (pays.getLanguages().length === maxLanguages) { //si le pays a autant de langues que le max, ajouter a la liste deja existante
      countriesWithMostLanguages.push(pays);
    }
  });

  console.table(
    countriesWithMostLanguages.map((countrie) => {
      return {
        pays: countrie.name,
        langues: countrie.getLanguages(),
      };
    })
  );
}

//pays qui possède une langue en commun avec ses voisins
function withCommonLanguage() {
  let result = [];
  Object.values(Country.all_countries).forEach((country) => {//pour tout les objet de la classe Country
    commonLanguagesCountry = [];
    commonLanguagesLang = [];
    country.getLanguages().forEach((Language) => {//pour chaque langue du pays
      country.getBorders().forEach((paysVoisin) => {//pour chaque pays voisin
        if (
          paysVoisin.getLanguages().includes(Language)
        ) {//si le pays voisin parle la langue
          if (
            !commonLanguagesCountry.includes(paysVoisin)
          ) {//si le pays voisin n'est pas deja dans le tableau de resultat
            commonLanguagesCountry.push(paysVoisin);
          }
          if (!commonLanguagesLang.includes(Language)) {//si la langue n'est pas deja dans le tableau de resultat
            commonLanguagesLang.push(Language);
          }
        }
      });
    });
    if (commonLanguagesCountry.length > 0 && commonLanguagesLang.length > 0) {
      result.push({
        pays: country.name,
        paysVoisins: commonLanguagesCountry,
        languesCommunes: commonLanguagesLang,
      });
    }
    });
  console.table(result);
}

//pays qui ne possède pas de monnaie en commun
function withoutCommonCurrency() {
  let result = [];
  Object.values(Country.all_countries).forEach((country) => {//pour tout les objet de la classe Country
    country.getCurrencies().forEach((currency) => {
      let commonCurrency = false;
      country.getBorders().forEach((paysVoisin) => {//pour chaque pays voisin
        if (
          paysVoisin.getCurrencies().includes(currency)
        ) {//si le pays voisin a la meme monnaie
          commonCurrency = true;
        }
      });
      if (!commonCurrency && !result.some((item) => item.pays === country.name)) { //si le pays n'a pas de monnaie en commun
        result.push({
          pays: country.name,
        });
      }
    });
  });
  console.table(result);
}

//pays trier par densité décroissante
function sortingDecreasingDensity() {
  let countriesWithDensity = Object.values(Country.all_countries).filter(//pour tout les objet de la classe Country filtrer les pays qui ont une densité de population
    (country) => country.getPopDensity() != "N/A"
  );
  let sortedCountries = Object.values(countriesWithDensity).sort((a, b) => {//les objet de la classe Country restants sont trier par densité de population
    return b.getPopDensity() - a.getPopDensity();
  });
  console.table( 
    sortedCountries.map((country) => {
      return {
        pays: country.name,
        densite: Math.round(country.getPopDensity()),
      };
    })
  );
}

//pays avec le plusieurs domaines internet
function moreTopLevelDomains() {
  result = [];
  countries.forEach((country) => {//pour tout les pays
    if (country.topLevelDomain.length > 1) {//si le pays a plusieurs domaines internet
      result.push({
        pays: country.translations.fr,
        domaines: country.topLevelDomain,
      });
    }
  });

  console.table(result);
}

console.log(Country.all_countries["FRA"].getPopDensity());