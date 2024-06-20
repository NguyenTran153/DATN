import axios from 'axios';

class NotificationService {
  static async getNotifications(accessToken: string, type: string) {
    try {
      const params = {
        page: 1,
        pageSize: 100,
        ...(type !== '' && {type}),
      };

      const response = await axios.get(
        'http://10.0.2.2:8080/notifications/my',
        {
          params,
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('Notification' + error);
      throw error;
    }
  }

  static async markAsRead(token: string, notificationId: string) {
    try {
      const response = await axios.post(
        `http://10.0.2.2:8080/notifications/${notificationId}/mark-as-read`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('Notification Mark As Read' + error);
      throw error;
    }
  }
}

export default NotificationService;
