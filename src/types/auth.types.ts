export type User = {
  name: string;
  email: string;
  role: Role;
};

export type Role = "donor" | "hospital" | "doctor" | "admin";
