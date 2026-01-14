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
  email: string;
};

export type Donation = {
  id: number;
  donorId: number;
  hospitalId: number;
  doctorId: number;
  appointmentId: number | null;
  donationDate: string;
  bloodType: string;
  volume: number;
  status: 'collected' | 'stored' | 'discarded';
};
