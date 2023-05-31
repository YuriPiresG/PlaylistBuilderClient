import { useEffect, useState } from 'react';
import axios from 'axios';

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      const tokenEndpoint = 'https://accounts.spotify.com/api/token';
      const clientId = 'cef538ab24f34a28a9e04a0b1c7b6707';
      const clientSecret = 'a1380c0e79a843c29818c22b4fe75279';

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const data = new URLSearchParams();
      data.append('grant_type', 'client_credentials');
      data.append('client_id', clientId);
      data.append('client_secret', clientSecret);

      try {
        const response = await axios.post(tokenEndpoint, data, { headers });
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  return accessToken;
};

export default useAccessToken;
