export type MedicalHistory = {
  id: number;
  condition: string;
  diagnosedAt: string;
  notes?: string;
  donorId: number;
  donor?: Donor;
};

export type Donor = {
  id: number;
  name: string;
  email: Date;
};
