import axios from 'axios';
import Config from 'config';

export const getSitemap = async () =>
  (await axios.get(`${Config.API_HOST_URL}/sitemap.xml`)).data;
