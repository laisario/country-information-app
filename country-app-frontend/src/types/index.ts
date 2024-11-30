export type Country = {
    name: string;
    countryCode: string;
};

export type TCountryInformation = {
    name: string;
    region: string;
    code: string;
    borders: {
      country: string;
      code: string;
    }[];
    countryPopulation: {
      year: number;
      value: number;
    }[];
    countryFlag: string;
  };