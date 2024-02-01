export class Project {
  id?: string;
  title: string;
  link: string;
  tags: string;
  description: string;
  activated: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
