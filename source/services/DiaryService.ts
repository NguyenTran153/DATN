import axios from 'axios';
class DiaryService {
    static async postDiary(accessToken: string, belongTo: string, data: any) {
        try {
            const params = JSON.stringify({
                data: data,
                belongTo: belongTo,
            });
            const response = await axios.post(
                'http://10.0.2.2:8080/diaries', params,
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
    static async getDiary(accessToken: string) {
        try {
          const response = await axios.get(
            'http://10.0.2.2:8080/diaries/my-diaries',
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
}

export default DiaryService