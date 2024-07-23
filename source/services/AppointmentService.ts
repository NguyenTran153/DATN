import axios from 'axios';
import { baseURL } from '../utils/constant';

interface CreateAppointmentRequestDto {
  beginTimestamp: number;
}

class AppointmentService {
  static async sendAppointment(
    accessToken: string,
    userId: number,
    appointmentData: CreateAppointmentRequestDto,
  ) {
    try {
      const response = await axios.post<any>(
        `${baseURL}appointments/send/${userId}`,
        JSON.stringify(appointmentData),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log(response);

      return response.data;
    } catch (error: any) {
      console.log('sendAppointment' + error);
      throw new Error(error);
    }
  }
  static async getAppointment(accessToken: string) {
    try {
      const response = await axios.get<any[]>(
        `${baseURL}appointments/me`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getAppointmentHistory(userId: string, accessToken: string) {
    try {
      const response = await axios.get<any[]>(
        `${baseURL}appointments/history/${userId}`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default AppointmentService;
