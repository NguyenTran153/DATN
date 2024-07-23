import axios from 'axios';
import { baseURL } from '../utils/constant';

class NotificationService {
  static async getNotifications(accessToken: string, type: string) {
    try {
      const params = {
        page: 1,
        pageSize: 100,
        ...(type !== '' && {type}),
      };

      const response = await axios.get(
        `${baseURL}notifications/my`,
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
        `${baseURL}notifications/${notificationId}/mark-as-read`,
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
