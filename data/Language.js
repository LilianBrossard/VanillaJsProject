class Language {
    constructor(iso639_2, name) {
        this.iso639_2 = iso639_2;
        this.name = name;
    }

    toString() {
        return `${this.iso639_2} - ${this.name}`;
    }

    static fill_languages() {
        this.all_languages = {};
        countries.forEach(country => {
            if (country.languages != undefined && country.languages.length > 0) {
                country.languages.forEach(language => {
                    const iso639_2 = language.iso639_2 ? language.iso639_2 : "N/A";
                    const name = language.name ? language.name : "N/A";
                    if (iso639_2 != "N/A" && this.all_languages[iso639_2] == undefined) {
                        const lang = new Language(iso639_2, name);
                        this.all_languages[lang.iso639_2] = lang;
                    } else if (iso639_2 == "N/A") {
                        console.error("Erreur avec la langue de nom " + name + ", de code " + iso639_2 + " dans le pays " + country.name + " : code iso manquant");
                    }
                });
            }
        });
    }
}