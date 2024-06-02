import axios from 'axios';

class UserService {
  static async getUserInfo(accessToken: string) {
    try {
      const response = await axios.get<UserData>(
        'http://10.0.2.2:8080/auth/me',
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
      console.log('Error logging in:', error);
    }
  }
  static async getUserInfoByID(userID: string, accessToken: string) {
    try {
      const response = await axios.get<UserData>(
        `http://10.0.2.2:8080/users/${userID}`,
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
      console.log('Error logging in getUserInfoByID:', error);
    }
  }

  async sendFriendRequest(receiverId: string, accessToken: string) {
    try {
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default UserService;
