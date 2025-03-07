// Remplir le tableau associatif
Currency.fill_currencies();

// Afficher les devises
console.table(Currency.all_currencies);

// Remplir le tableau associatif des langues
Language.fill_languages();

// Afficher les langues
console.table(Language.all_languages);

// Remplir le tableau associatif des pays
Country.fill_countries();

// Afficher les pays
console.table(Country.all_countries);

// Utilisation de la fonction getCurrencies
console.log(Country.all_countries["AFG"].getCurrencies());

// Utilisation de la fonction getLanguages
console.log(Country.all_countries["AFG"].getLanguages());