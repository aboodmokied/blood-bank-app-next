export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  accessToken?: string;
};

export type Role = "donor" | "hospital" | "doctor" | "admin";
