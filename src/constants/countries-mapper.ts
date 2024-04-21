export const COUNTRIES_MAPPER: { [key: string]: string } = {
  de: "Niemcy",
  "gb-sct": "Szkocja",
  hu: "Węgry",
  ch: "Szwajcaria",
  es: "Hiszpania",
  hr: "Chorwacja",
  it: "Włochy",
  al: "Albania",
  si: "Słowenia",
  dk: "Dania",
  rs: "Serbia",
  "gb-eng": "Anglia",
  pl: "Polska",
  nl: "Holandia",
  at: "Austria",
  fr: "Francja",
  be: "Belgia",
  sk: "Słowacja",
  ro: "Rumunia",
  ua: "Ukraina",
  tr: "Turcja",
  ge: "Gruzja",
  pt: "Portugalia",
  cz: "Czechy",
};

export const getIsoFromCountryName = (value: string) => {
  for (let key in COUNTRIES_MAPPER) {
    if (COUNTRIES_MAPPER[key] === value) {
      return key;
    }
  }
  return "";
};
