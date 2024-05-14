import axios from 'axios';

class AuthService {
  static async login(email: string, password: string) {
    try {
      const params = JSON.stringify({
        email: email,
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
      console.log('Error logging in:', error);
    }
  }
  static async signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    try {
      const params = JSON.stringify({
        email: email,
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
}

export default AuthService;