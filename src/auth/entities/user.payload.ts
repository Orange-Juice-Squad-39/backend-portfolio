export interface UserPayload {
  sub: string;
  name: string;
  lastName: string;
  email: string;
  iat?: number;
  exp?: number;
}
