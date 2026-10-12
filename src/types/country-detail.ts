export interface CountryDetail {
  names: {
    common: string;
    official?: string;
  };
  codes: {
    alpha_2: string;
    alpha_3?: string;
  };
  flag: {
    url_svg: string;
    description?: string;
  };
  capitals: Array<{ name: string }>;
  population: number;
  region: string;
  subregion?: string;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol?: string }>;
  borders?: string[];
  area?: number;
}