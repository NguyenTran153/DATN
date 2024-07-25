import axios from 'axios';
import {baseURL} from '../utils/constant';

interface CreateAppointmentRequestDto {
  note: string;
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
      const response = await axios.get<any[]>(`${baseURL}appointments/me`, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
  static async cancelAppointment(
    appointmentId: number,
    cancelReason: string,
    accessToken: string,
  ): Promise<any> {
    try {
      const response = await fetch(
        `${baseURL}appointments/response/${appointmentId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            action: 'decline',
            cancelReason: cancelReason,
            beginTimestamp: 0,
          }),
        },
      );

      if (!response.ok) {
        // Handle errors if the response status is not OK
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel appointment');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

export default AppointmentService;
