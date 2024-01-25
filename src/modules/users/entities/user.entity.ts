export class User {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  activated: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
