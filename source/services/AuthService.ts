import axios from 'axios';
import {baseURL} from '../utils/constant';

class AuthService {
  static async login(phoneNumber: string, password: string) {
    console.log(baseURL);
    try {
      const params = JSON.stringify({
        phoneNumber: phoneNumber,
        password: password,
      });
      const response = await axios.post<Token>(`${baseURL}auth/login`, params, {
        headers: {
          'content-type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error log in:', error);
    }
  }
  static async signUp(
    token: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    try {
      const params = JSON.stringify({
        token: token,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });
      const response = await axios.post(`${baseURL}users`, params, {
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = response.data;
      console.log('Reponse:', data);
      return response.data;
      // return response.data;
    } catch (error: any) {
      console.log('Signup:', error);
      throw error;
    }
  }
  static async PhoneVerification(phoneNumber: string) {
    try {
      const params = JSON.stringify({
        phoneNumber: phoneNumber,
      });
      const response = await axios.post(
        `${baseURL}sms/phone-verification`,
        params,
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      const data = response.data;
      return data.pinId;
    } catch (error) {
      console.log('PhoneVerification:', error);
      throw new Error();
    }
  }
  static async checkPhone(phoneNumber: string) {
    try {
      const response = await axios.get(
        `${baseURL}users/check-phone-availability/${phoneNumber}`,
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      console.log(JSON.stringify(response));
      return response;
    } catch (error) {
      console.log('PhoneVerification:', error);
      throw new Error();
    }
  }
  static async ForgotPassword(phoneNumber: string) {
    try {
      const params = JSON.stringify({
        phoneNumber: phoneNumber,
      });
      const response = await axios.post(
        `${baseURL}auth/forgot-password`,
        params,
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      const data = response.data;
      console.log('Reponse:', data.pinId);
      return data.pinId;
    } catch (error) {
      console.log('Error logging in:', error);
      throw error;
    }
  }
  static async ResetPassword(token: string, password: string) {
    try {
      const params = JSON.stringify({
        token: token,
        newPassword: password,
      });
      const response = await axios.post(
        `${baseURL}auth/reset-password`,
        params,
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      const data = response.data;
      console.log('Reponse:', data);
      // return response.data;
    } catch (error) {
      console.log('Error reset password:', error);
      throw error;
    }
  }
  static async OTPVerification(pinId: string, code: string) {
    try {
      const params = JSON.stringify({
        pinId: pinId,
        code: code,
      });
      const response = await axios.post(
        `${baseURL}sms/check-verification-code`,
        params,
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      const data = response.data;
      console.log('Reponse:', data.token);
      return data.token;
    } catch (error) {
      console.log('OTPVerification: ' + error);
      throw error;
    }
  }

  static async changePassword(
    accessToken: string,
    oldPassword: string,
    newPassword: string,
  ) {
    try {
      const params = JSON.stringify({
        password: oldPassword,
        newPassword: newPassword,
      });
      const response = await axios.post(
        `${baseURL}auth/change-password`,
        params,
        {
          headers: {
            'Content-Type': 'application/json',
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

  static async logout(accessToken: string) {
    try {
      const response = await axios.get(`${baseURL}auth/logout`, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log('logout' + error);
      throw error;
    }
  }
}

export default AuthService;
