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
      console.log('getUserInfo:', error);
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

  static async sendFriendRequest(receiverId: string, accessToken: string) {
    try {
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async registerDoctor(accessToken: string, form: any) {
    try {
      const response = await axios.post(
        'http://10.0.2.2:8080/doctor-register',
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log('Success to register doctor');
      return response.data;
    } catch (error) {
      console.log('Error register doctor' + error);
      throw error;
    }
  }
  static async getFriendList (token: string) {
    console.log(token)
    try {
      const response = await axios.get<Patient[]>(
        `http://10.0.2.2:8080/users/friends/my`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log('Get friend: ' + error);
      return;
    }
  }
}

export default UserService;
