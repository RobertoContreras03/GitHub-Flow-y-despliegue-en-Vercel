
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
  borders?: string[];
  code?: {
    alpha_2: string;
  };
}
export interface CountriesResponse {
  data?: {
    objects: Country[];
  };
}