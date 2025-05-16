export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id?: number; // optional for creation
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}
