import axios from 'axios';

class AuthService {
  static async login(phoneNumber: string, password: string) {
    try {
      const params = JSON.stringify({
        phoneNumber: phoneNumber,
        password: password,
      });
      const response = await axios.post<Token>(
        'http://10.0.2.2:8080/auth/login',
        params,
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      const data = response.data;
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      console.log('accessToken:', accessToken);
      console.log('refreshToken:', refreshToken);
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
      const response = await axios.post('http://10.0.2.2:8080/users', params, {
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = response.data;
      console.log('Reponse:', data);
      // return response.data;
    } catch (error) {
      console.log('Error logging in:', error);
    }
  }
  static async PhoneVerification(phoneNumber: string) {
    try {
      const params = JSON.stringify({
        phoneNumber: phoneNumber,
      });
      const response = await axios.post(
        'http://10.0.2.2:8080/sms/phone-verification',
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
      console.log('Error logging in:', error);
    }
  }
  static async ForgotPassword(phoneNumber: string) {
    try {
      const params = JSON.stringify({
        phoneNumber: phoneNumber,
      });
      const response = await axios.post(
        'http://10.0.2.2:8080/auth/forgot-password',
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
    }
  }
  static async ResetPassword(token: string, password: string) {
    try {
      const params = JSON.stringify({
        token: token,
        newPassword: password,
      });
      const response = await axios.post(
        'http://10.0.2.2:8080/auth/reset-password',
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
    }
  }
  static async OTPVerification(pinId: string, code: string) {
    try {
      const params = JSON.stringify({
        pinId: pinId,
        code: code,
      });
      const response = await axios.post(
        'http://10.0.2.2:8080/sms/check-verification-code',
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
      return 'error';
    }
  }

  static async logout(payloadToken: PayloadToken, accessToken: string) {
    try {
      const response = await axios.get('http://10.0.2.2:8080/auth/logout', {
        params: JSON.stringify(payloadToken),
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log('logout' + error);
      return error;
    }
  }
}

export default AuthService;
