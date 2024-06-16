import axios from 'axios';

class PrescriptionService {
  static async getPrescription(patientId: string, accessToken: string) {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/prescriptions/${patientId}`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response);

      return response.data;
    } catch (error) {
      console.log('Prescription: ' + error);
    }
  }
}

export default PrescriptionService;
