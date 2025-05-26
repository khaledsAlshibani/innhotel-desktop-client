export type Gender = 'Male' | 'Female';
export type IdProofType = 'Passport' | 'DriverLicense' | 'NationalId';

export interface Guest {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  gender: Gender;
  phone: string;
  address: string;
  id_proof_type: IdProofType;
  id_proof_number: string;
}
