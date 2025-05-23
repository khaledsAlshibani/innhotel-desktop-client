export interface FailureResponse {
  status: number;
  message?: string;
  title?: string;
  details?: string[] | null;
  detail?: string | null;
  type?: string;
}