import axios from 'axios';
import { baseURL } from '../utils/constant';
class PrescriptionService {
  static async getPrescription(patientId: string, accessToken: string) {
    try {
      const response = await axios.get(`${baseURL}prescriptions`, {
        params: {
          page: 1,
          pageSize: 100,
          userId: patientId,
        },
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Hello' + JSON.stringify(response, null, 2));

      return response.data;
    } catch (error) {
      console.log('Prescription: ' + error);
      throw error;
    }
  }

  static async getDiagnosis(presId: string, accessToken: string) {
    try {
      const response = await axios.get(
        `${baseURL}prescriptions/${presId}/diagnoses`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log('diag' + JSON.stringify(response, null, 2));

      return response.data;
    } catch (error) {
      console.log('Prescription: ' + error);
      throw error;
    }
  }

  static async postPrescription(
    accessToken: string,
    data: any,
    files: File[],
    belongId: number,
  ) {
    try {
      const formData = new FormData();

      formData.append('data', JSON.stringify(data));

      files.forEach(file => {
        formData.append('files', file);
      });

      formData.append('belongTo', belongId);
      const response = await axios.post(
        `${baseURL}prescriptions`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log('Error post prescriptions:', JSON.stringify(error));
      throw error;
    }
  }

  static async postDiagnosis(
    prescriptionId: string,
    problem: string,
    accessToken: string,
    files: any[],
  ) {
    try {
      const formData = new FormData();

      formData.append('problem', JSON.stringify(problem));

      files.forEach((file: any) => {
        formData.append('files', file);
      });
      const response = await axios.post(
        `${baseURL}prescriptions/${prescriptionId}/diagnoses`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log('Diagnosis added successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding diagnosis:', error);
      throw error; // You may handle error as per your application's error handling strategy
    }
  }

  static async getDrug(
    token: string,
    query: string,
    page: number,
    pageSize: number,
  ) {
    try {
      const response = await axios.get(
        `${baseURL}drugs?page=${page}&pageSize=${pageSize}&filterAll=${query}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default PrescriptionService;
