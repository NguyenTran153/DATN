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
}

export default AppointmentService;
