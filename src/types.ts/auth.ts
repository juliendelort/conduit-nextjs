export interface User {
  email: string;
  username: string;
  bio: string;
  image: string;
}

export interface AuthenticatedUser extends User {
  token: string;
}
