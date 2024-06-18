import axios from 'axios';

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
        `http://10.0.2.2:8080/appointments/send/${userId}`,
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
  static async getAppointment(userId: string, accessToken: string) {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/appointments/history/${userId}`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

export default AppointmentService;
