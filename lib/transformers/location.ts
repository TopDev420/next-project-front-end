import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export const convertCountryCodeToFullName = (countryCode: string) =>
  countries.getName(countryCode, 'en');
