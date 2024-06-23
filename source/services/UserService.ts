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

  static async updateUserInfo(userData: any, accessToken: string) {
    try {
      const params = JSON.stringify(userData);

      const response = await axios.patch('http://10.0.2.2:8080/users', params, {
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
  static async acceptAppointment(token: string, appointmentId: string) {
    try {
      const body = {
        action: 'accept',
      };
      const response = await axios.patch(
        `http://10.0.2.2:8080/appointments/response/${appointmentId}`,
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
      console.log('Accept appointment: ' + error);
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
        `http://10.0.2.2:8080/users/upload-avatar`,
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
      const response = await axios.get(`http://10.0.2.2:8080/users/search`, {
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
        `http://10.0.2.2:8080/users/friend-request/send/${receiverId}`,
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
      console.log(1);
      console.log(formData);
      const response = await axios.post(
        'http://10.0.2.2:8080/users/doctor-register',
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
        `http://10.0.2.2:8080/users/friends/my`,
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
  static async acceptFriend(token: string, friendRequestId: string) {
    try {
      const body = {
        status: 'accepted',
      };
      const response = await axios.put(
        `http://10.0.2.2:8080/users/friend-request/response/${friendRequestId}`,
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
