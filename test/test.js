Currency.fill_currencies(); // Remplir le tableau associatif
// console.table(Currency.all_currencies); // Afficher les devises

Language.fill_languages(); // Remplir le tableau associatif des langues
// console.table(Language.all_languages); // Afficher les langues

Country.fill_countries(); // Remplir le tableau associatif des pays
// console.table(Country.all_countries); // Afficher les pays

function clearlogs() {
  console.clear();
}
function outsideTheContinent() {
  let result = [];
  Object.values(Country.all_countries).forEach((pays) => {
    pays.getBorders().forEach((border) => {
      if (
        Country.all_countries[border].region != pays.region &&
        !result.includes(pays)
      ) {
        result.push(pays);
      }
    });
  });
  console.table(result);
}

function moreNeighbors() {
  let maxVoisins = 0;
  let countriesWithMostVoisins = [];

  Object.values(Country.all_countries).forEach((country) => {
    if (country.getBorders().length > maxVoisins) {
      maxVoisins = country.getBorders().length;
      countriesWithMostVoisins = [country];
    } else if (country.getBorders().length === maxVoisins) {
      countriesWithMostVoisins.push(country);
    }
  });

  console.table(
    countriesWithMostVoisins.map((country) => {
      return {
        pays: country.name,
        vosins: country
          .getBorders()
          .map((border) => Country.all_countries[border].name),
      };
    })
  );
}

function neighborless() {
  let result = Object.values(Country.all_countries).filter(
    (country) => country.getBorders().length === 0
  );
  console.table(result.map((country) => country.name));
}

function moreLanguages() {
  let maxLanguages = 0;
  let countriesWithMostLanguages = [];
  Object.values(Country.all_countries).forEach((pays) => {
    if (pays.getLanguages().length > maxLanguages) {
      maxLanguages = pays.getLanguages().length;
      countriesWithMostLanguages = [pays];
    } else if (pays.getLanguages().length === maxLanguages) {
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

function withCommonLanguage() {
  let result = [];
  Object.values(Country.all_countries).forEach((country) => {
    commonLanguagesCountry = [];
    commonLanguagesLang = [];
    country.getLanguages().forEach((Language) => {
      country.getBorders().forEach((paysVoisin) => {
        if (
          Country.all_countries[paysVoisin].getLanguages().includes(Language)
        ) {
          if (
            !commonLanguagesCountry.includes(Country.all_countries[paysVoisin])
          ) {
            commonLanguagesCountry.push(Country.all_countries[paysVoisin]);
          }
          if (!commonLanguagesLang.includes(Language)) {
            commonLanguagesLang.push(Language);
          }
        }
      });
    });
    result.push({
      pays: country.name,
      paysVoisins: commonLanguagesCountry,
      languesCommunes: commonLanguagesLang,
    });
  });
  console.table(result);
}

function withoutCommonCurrency() {
  let result = [];
  Object.values(Country.all_countries).forEach((country) => {
    country.getCurrencies().forEach((currency) => {
      let commonCurrency = false;
      country.getBorders().forEach((paysVoisin) => {
        if (
          Country.all_countries[paysVoisin].getCurrencies().includes(currency)
        ) {
          commonCurrency = true;
        }
      });
      if (!commonCurrency && !result.includes(country.name)) {
        result.push({
          pays: country.name,
        });
      }
    });
  });
  console.table(result);
}

function sortingDecreasingDensity() {
  let countriesWithDensity = Object.values(Country.all_countries).filter(
    (country) => country.getPopDensity() != "N/A"
  );
  let sortedCountries = Object.values(countriesWithDensity).sort((a, b) => {
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

function moreTopLevelDomains() {
  result = [];
  countries.forEach((country) => {
    if (country.topLevelDomain.length > 1) {
      result.push({
        pays: country.translations.fr,
        domaines: country.topLevelDomain,
      });
    }
  });

  console.table(result);
}
