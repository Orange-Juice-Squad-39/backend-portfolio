export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  lastName: string;
  iat?: number;
  exp?: number;
}
