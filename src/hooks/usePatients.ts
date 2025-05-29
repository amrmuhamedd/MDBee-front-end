import { useState, useEffect, useCallback } from 'react';
import type { Patient, PatientListParams, PatientStatus } from '../types/patient';
import { fetchPatients, deletePatient } from '../services/patientService';

interface UsePatientResult {
  patients: Patient[];
  loading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  nextCursor?: string;
  fetchNextPage: () => Promise<void>;
  refetch: () => Promise<void>;
  filterByStatus: (status?: PatientStatus) => void;
  deletePatient: (id: number) => Promise<boolean>;
  deleting: boolean;
}

export const usePatients = (initialLimit: number = 10): UsePatientResult => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [params, setParams] = useState<PatientListParams>({ limit: initialLimit });

  const fetchPatientsData = useCallback(async (fetchParams: PatientListParams) => {
    setLoading(true);
    try {
      const response = await fetchPatients(fetchParams);
      setPatients(prevPatients => 
        fetchParams.cursor ? [...prevPatients, ...response.data] : response.data
      );
      setHasNextPage(response.pagination.hasNextPage);
      setNextCursor(response.pagination.nextCursor);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    fetchPatientsData(params);
  }, [fetchPatientsData, params.status]);


  const fetchNextPage = useCallback(async () => {
    if (hasNextPage && nextCursor) {
      await fetchPatientsData({ ...params, cursor: nextCursor });
    }
  }, [fetchPatientsData, hasNextPage, nextCursor, params]);

  
  const refetch = useCallback(async () => {
    await fetchPatientsData({ ...params, cursor: undefined });
  }, [fetchPatientsData, params]);

  
  const filterByStatus = useCallback((status?: PatientStatus) => {
    setParams(prev => ({ ...prev, status, cursor: undefined }));
  }, []);


  const handleDeletePatient = useCallback(async (id: number): Promise<boolean> => {
    setDeleting(true);
    try {
      await deletePatient(id);
      setPatients(prevPatients => prevPatients.filter(patient => patient.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to delete patient ${id}`));
      return false;
    } finally {
      setDeleting(false);
    }
  }, []);

  return {
    patients,
    loading,
    error,
    hasNextPage,
    nextCursor,
    fetchNextPage,
    refetch,
    filterByStatus,
    deletePatient: handleDeletePatient,
    deleting,
  };
};
