export type Gender = 'male' | 'female';
export type IdProofType = 'passport' | 'national_id' | 'drivers_license';

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
