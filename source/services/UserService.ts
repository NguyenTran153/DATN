import axios from 'axios';
import { baseURL } from '../utils/constant';
class UserService {
  static async getUserInfo(accessToken: string) {
    try {
      const response = await axios.get<UserData>(
        `${baseURL}auth/me`,
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
        `${baseURL}users/${userID}`,
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

  static async updateUserInfo(userData: any, accessToken: string) {
    try {
      const params = JSON.stringify(userData);

      const response = await axios.patch(`${baseURL}users`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.data) {
        throw new Error('Failed to update user information');
      }

      const updatedUser = response.data;
      console.log(updatedUser);
      return updatedUser;
    } catch (error) {
      console.log('Update user error:', error);
      throw error;
    }
  }
  static async acceptAppointment(
    token: string,
    appointmentId: string,
    action: string,
  ) {
    try {
      const body = {
        action: action,
      };
      const response = await axios.patch(
        `${baseURL}appointments/response/${appointmentId}`,
        JSON.stringify(body),
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('Accept appointment: ' + JSON.stringify(error));
      throw error;
    }
  }
  static async uploadAvatar(avatar: string, token: string) {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: avatar,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });
      const response = await axios.post(
        `${baseURL}users/upload-avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async findUserByPhone(phone: string, accessToken: string) {
    try {
      const response = await axios.get(`${baseURL}users/search`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          text: phone,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async sendFriendRequest(receiverId: string, accessToken: string) {
    try {
      const response = await axios.post(
        `${baseURL}users/friend-request/send/${receiverId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
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
  static async registerDoctor(accessToken: string, formData: any) {
    try {
      const response = await axios.post(
        `${baseURL}users/doctor-register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('Error register doctor' + error);
      throw error;
    }
  }
  static async getFriendList(token: string) {
    try {
      const response = await axios.get<Patient[]>(
        `${baseURL}users/friends/my`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response;
    } catch (error) {
      console.log('Get friend: ' + error);
      throw error;
    }
  }
  static async acceptFriend(
    token: string,
    friendRequestId: string,
    status: string,
  ) {
    try {
      const body = {
        status: status,
      };
      const response = await axios.put(
        `${baseURL}users/friend-request/response/${friendRequestId}`,
        JSON.stringify(body),
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('Accept friend: ' + error);
      throw error;
    }
  }
}

export default UserService;
