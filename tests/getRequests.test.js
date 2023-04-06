// eslint-disable-next-line no-undef
const axios = require('axios');

const url = 'http://localhost:3004';
const lat = 41.015137;
const lng = 28.97953;

describe('GET requests', () => {
  if (!process.env.GITHUB_ACTIONS) {
    test('should get current time', async () => {
      const params = {
        q: 'saat kaç',
        lat,
        lng,
      };

      const response = await axios.get(url, { params });

      expect(response.status).toBe(200);

      // clear minutes and seconds
      response.data = response.data.replace(/:[0-9][0-9]/g, ':00');
      const expected = `Şu an saat ${new Date().toLocaleTimeString('tr-TR', {
        timeZone: 'Europe/Istanbul',
      })}`.replace(/:[0-9][0-9]/g, ':00');

      expect(response.data).toBe(expected);
    }, 10000);

    test('should get current date', async () => {
      const params = {
        q: 'bugün ne zaman',
        lat,
        lng,
      };

      const response = await axios.get(url, { params });

      expect(response.status).toBe(200);

      const expected = `Bugün ${new Date().toLocaleDateString('tr-TR', {
        timeZone: 'Europe/Istanbul',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`;

      expect(response.data).toBe(expected);
    }, 10000);
  }
});
