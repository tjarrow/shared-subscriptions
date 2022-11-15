export interface AuthDto {
  token: string;
  user: userDto;
}

export interface userDto {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_confirmed: number;
  logo: { id: number } | null;
  roles: UserRoles[];
}

export interface UserRoles {
  id: number;
  name: string;
}

export interface EmailUniquality {
  exists: boolean;
}
