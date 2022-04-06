export enum Role {
  NONE = 0,
  INDIVIDUAL = 1,
  COMMERCIAL = 2
}

export interface User {
  email: string;
  name: string;
  surname: string;
  role: Role;
  token: string;
  verified: boolean;
}

export interface UserCreateRequest {
  birthdate: string;
  email: string;
  name: string;
  surname: string;
  role?: Role;
  password: string;
  tckn: string;
  phone: string;
}
