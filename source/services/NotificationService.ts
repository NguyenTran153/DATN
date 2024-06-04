import axios from 'axios';

class NotificationService {
  static async getNotifications(accessToken: string) {
    try {
      const response = await axios.get(
        'http://10.0.2.2:8080/notifications/my',
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
}

export default NotificationService;
