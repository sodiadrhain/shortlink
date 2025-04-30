export interface IUser {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  apiKey?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
