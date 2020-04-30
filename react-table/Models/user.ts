export interface User {
  address: Address;
  company: Company;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export interface Address {
  city: string;
  geo: Geo;
  state: string;
  street: string;
  suite: string;
  zipcode: string;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}