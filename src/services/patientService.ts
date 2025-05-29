import axios from 'axios';
import type { PatientListParams, PatientListResponse } from '../types/patient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchPatients = async (params: PatientListParams): Promise<PatientListResponse> => {
  try {
    const response = await axios.get<PatientListResponse>(`${API_BASE_URL}/patients`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const deletePatient = async (patientId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/patients/${patientId}`);
  } catch (error) {
    console.error(`Error deleting patient ${patientId}:`, error);
    throw error;
  }
};
