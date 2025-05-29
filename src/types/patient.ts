export interface Patient {
  id: number;
  name: string;
  status: PatientStatus;
  date: string;
  notes_status: NotesStatus;
  room: string;
  location: string;
  collabrators: string;
}

export type PatientStatus = 'Active' | 'Discharged' | 'Pending' | 'In Progress' | 'Ready';

export type NotesStatus = 'Not Required' | 'Incomplete' | 'Pending' | 'Completed' | '1/2 Copied' | 'Not Started';

export interface PaginationResult {
  hasNextPage: boolean;
  nextCursor?: string;
}

export interface PatientListResponse {
  data: Patient[];
  pagination: PaginationResult;
}

export interface PatientListParams {
  cursor?: string;
  limit?: number;
  status?: PatientStatus;
}
