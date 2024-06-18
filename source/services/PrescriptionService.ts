import axios from 'axios';

class PrescriptionService {
  static async getPrescription(patientId: string, accessToken: string) {
    try {
      const params = {
        patientId: patientId,
      };
      const response = await axios.get(`http://10.0.2.2:8080/prescriptions`, {
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
      console.log(response);

      return response.data;
    } catch (error) {
      console.log('Prescription: ' + error);
    }
  }

  static async postPrescription(
    accessToken: string,
    data: any,
    files: File[],
    belongId: string,
  ) {
    try {
      const formData = new FormData();

      formData.append('data', JSON.stringify(data));

      files.forEach(file => {
        formData.append('files', file);
      });

      formData.append('belongTo', parseInt(belongId));
      const response = await axios.post(
        'http://10.0.2.2:8080/prescriptions',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('Error post prescriptions:', error);
    }
  }

  static async postDiagnosis(prescriptionId: string, formData: any, accessToken: string) {
    try {
      const response = await axios.post(
        `http://10.0.2.2:8080/prescriptions/${prescriptionId}/diagnoses`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log('Diagnosis added successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding diagnosis:', error);
      throw error; // You may handle error as per your application's error handling strategy
    }
  }
}

export default PrescriptionService;
