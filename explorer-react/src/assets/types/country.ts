
export interface Country {
  names: {
    common: string;
  };
  flag: {
    url: string;
  };

  population: number;
  region: string;

  capital?: string[];
  cca3?: string;
}
export interface CountriesResponse {
  data?: {
    objects: Country[];
  };
}