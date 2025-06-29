class Country {
  constructor(alpha3Code, name, capital, region, population, borders) {
    this.alpha3Code = alpha3Code;
    this.name = name;
    this.capital = capital;
    this.region = region;
    this.population = population;
    this.borders = borders;
  }

  toString() {
    return `${this.alpha3Code}, ${this.name}, ${this.capital}, ${
      this.region
    }, ${this.population}, ${this.borders.join(", ")})`;
  }

  static fill_countries() {
    this.all_countries = {};
    countries.forEach((country) => {
      const alpha3Code = country.alpha3Code ? country.alpha3Code : "N/A";
      const name = country.translations ? country.translations.fr : "N/A";
      const capital = country.capital ? country.capital : "N/A";
      const region = country.region ? country.region : "N/A";
      const population = country.population ? country.population : "N/A";
      const borders = country.borders ? country.borders : [];
      if (alpha3Code != "N/A" && this.all_countries[alpha3Code] == undefined) {
        const countryObj = new Country(
          alpha3Code,
          name,
          capital,
          region,
          population,
          borders
        );
        this.all_countries[alpha3Code] = countryObj;
      } else if (alpha3Code == "N/A") {
        console.error(
          "Erreur avec le pays de code " +
            alpha3Code +
            " et de nom " +
            name +
            " : code alpha3 manquant"
        );
      }
    });
  }
  getPopDensity() {
    const country = countries.find((c) => c.alpha3Code === this.alpha3Code);
    const area = country.area;
    let result = Number(this.population) / Number(area);
    if (isNaN(result)) {
      return "N/A";
    }
    return result;
  }

  getBorders() {
    let voisins = this.borders.map((border) => {
      const country = Country.all_countries[border];
      if(!country) {
        console.error("Erreur avec le pays " + this.name + " : pays voisin " + border + " non trouvé");
        return "N/A";
      }
      return country;
    }
    );
    return voisins;
  }

  getCurrencies() {
    let currencies = [];
    for (let i = 0; i < countries.length; i++) {
      if (
        countries[i].alpha3Code == this.alpha3Code &&
        countries[i].currencies != undefined
      ) {
        for (let j = 0; j < countries[i].currencies.length; j++) {
          const currency =
            Currency.all_currencies[countries[i].currencies[j].code];
          if (currency) {
            currencies.push(currency);
          }
        }
        break;
      }
    }
    return currencies;
  }

  getLanguages() {
    let language = [];
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].alpha3Code == this.alpha3Code) {
        for (let j = 0; j < countries[i].languages.length; j++) {
          const currency =
            Language.all_languages[countries[i].languages[j].iso639_2];
          if (currency) {
            language.push(currency);
          }
        }
        break;
      }
    }
    return language;
  }
}
