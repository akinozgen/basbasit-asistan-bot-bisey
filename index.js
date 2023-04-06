import { getServerStatuses } from './src/getServerStatuses.js';
import { getVariable } from './src/getVariable.js';
import { getPromptScore } from './src/getPromptScores.js';
import { getWeatherForecast } from './src/weather.js';
import { getTwitterTrends } from './src/getTwitterTrends.js';
import { askToGpt3 } from './src/askToGpt3.js';
import { getJoke } from './src/getJoke.js';


export const handler = async (event) => {
  const query = getVariable(event, 'q');
  const lat = getVariable(event, 'lat');
  const lng = getVariable(event, 'lng');

  const prompt = query.trim().replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/gi, '').toLocaleLowerCase();

  const responseTexts = {
    'saat kaç,kaç geçiyor': () => `Şu an saat ${new Date().toLocaleTimeString('tr-TR', { timeZone: 'Europe/Istanbul' })}`,
    'bugün günlerden ne,hangi gün,bugün tarih ne,bugünün tarihi': () => {
      const tarih = new Date().toLocaleDateString('tr-TR', { timeZone: 'Europe/Istanbul', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      return `Bugün ${tarih}`;
    },
    'hava nasıl,sıcaklık nedir': async () => {
      const { description, temperature } = await getWeatherForecast(lat, lng);

      return `Hava ${description} ve ${temperature} derece`;
    },
    'sunucular aktif mi,kalkanlar devrede mi': async () => await getServerStatuses(),
    'fıkra anlat,fikra,şaka yap,şaka,güldür beni,güldür': async () => getJoke(),
    'trendler,twitter trendleri, twitter, gündem': async () => {
      const trends = await getTwitterTrends();
      return `Bugün gündemde olanlar:\n${trends.join('\n')}`
    },
    'gpt,cipiti': async () => {
      return await askToGpt3(query);
    },
    'durum raporu ver,durum raporu,rapor ver': async () => `Kalkanlar devrede`,
  };

  let responseText = '';
  let promptScores;
  let sortedScores;
  let bestPrompt;

  if (query !== "") {
    promptScores = getPromptScore(prompt, responseTexts);
    sortedScores = Object.entries(promptScores).sort((a, b) => b[1] - a[1]);
    bestPrompt = sortedScores[0][0] || '';

    responseText = await responseTexts[bestPrompt]();

  } else {
    responseText = 'Merhaba, nasılsın?';
  }

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    },
    body: responseText
  };

  return response;

};