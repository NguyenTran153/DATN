import axios from 'axios';
class DiaryService {
  static async postDiary(accessToken: string, data: any, files: File[]) {
    try {
      const formData = new FormData();

      formData.append('data', JSON.stringify(data));

      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await axios.post(
        'http://10.0.2.2:8080/diaries',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('Error post diary:', error);
    }
  }

  static async getDiary(accessToken: string) {
    try {
      const response = await axios.get('http://10.0.2.2:8080/diaries', {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('Error get diary:', error);
    }
  }

  static async getDiaries(
    accessToken: string,
    page: number,
    pageSize: number,
    userId: number,
  ) {
    try {
      const response = await axios.get('http://10.0.2.2:8080/diaries', {
        params: {
          page: page,
          pageSize: pageSize,
          userId: userId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Get diaries:', error);
      throw error; // Optionally handle error or rethrow
    }
  }
}

export default DiaryService;
