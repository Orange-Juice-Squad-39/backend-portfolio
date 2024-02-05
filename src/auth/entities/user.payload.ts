export interface UserPayload {
  sub: string;
  name: string;
  lastName: string;
  email: string;
  urlImageUser: string;
  iat?: number;
  exp?: number;
}
