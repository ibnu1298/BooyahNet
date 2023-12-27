export interface sessionCustom {
  user?: userSessionCustom;
}
export interface userSessionCustom {
  id?: string;
  email?: string;
  role?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  gender?: number;
  userName?: string;
  phoneNumber?: string;
  token?: string;
}

export const genders = [
  { label: "Laki-laki", value: "0" },
  { label: "Perempuan", value: "1" },
];
