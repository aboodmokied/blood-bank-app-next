export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  accessToken?: string;
  bloodType?: string;
};

export type Role = "donor" | "hospital" | "doctor" | "admin";
