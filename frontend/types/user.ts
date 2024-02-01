export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface User {
  email: string;
  role: UserRole;
  name: string;
}
