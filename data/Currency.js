class Currency {
    constructor(code, name, symbol) {
        this.code = code;
        this.name = name;
        this.symbol = symbol;
    }

    toString() {
        return `${this.code} - ${this.name} (${this.symbol})`;
    }

    static fill_currencies() {
        this.all_currencies = {};
        countries.forEach(countrie => {
            let code = "N/A";
            let name = "N/A";
            let symbol = "N/A";
            if (countrie.currencies != undefined && countrie.currencies.length > 0) {
                countrie.currencies.forEach(currencie => {
                    code = currencie.code ? currencie.code : "N/A";
                    name = currencie.name ? currencie.name : "N/A";
                    symbol = currencie.symbol ? currencie.symbol : "N/A";
                    if (code != "N/A" && this.all_currencies[code] == undefined) {
                        const currency = new Currency(code, name, symbol);
                        this.all_currencies[currency.code] = currency;
                    }
                    else if (code == "N/A" ) {
                        console.error("erreur avec la monais de nom " + name + ", de code " + code + " dans le pays " + countrie.name + " : code manquant");
                    }
                });
            }
        });
    }
}