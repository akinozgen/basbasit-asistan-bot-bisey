const getJoke = require('./src/getJoke');
const getPromptScore = require('./src/getPromptScores');
const getQuery = require('./src/getQuery');
const getWeatherForecast = require('./src/weather');
const twitterTrends = require('./src/twitterTrends');
const askToGpt3 = require('./src/askToGpt3');

exports.handler = async (event) => {
  const query = getQuery(event);

  const prompt = query.trim().replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/gi, '').toLocaleLowerCase();

  const responseTexts = {
    'saat kaç,kaç geçiyor': () => `Şu an saat ${new Date().toLocaleTimeString('tr-TR', { timeZone: 'Europe/Istanbul' })}`,
    'bugün günlerden ne,hangi gün,bugün tarih ne,bugünün tarihi': () => {
      const tarih = new Date().toLocaleDateString('tr-TR', { timeZone: 'Europe/Istanbul', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      return `Bugün ${tarih}`;
    },
    'hava nasıl,sıcaklık nedir': async () => {
      const { description, temperature } = await getWeatherForecast();

      return `Antalya'da hava ${description} ve ${temperature} derece`;
    },
    'sunucular aktif mi,kalkanlar devrede mi': async () => await getServerStatuses(),
    'fıkra anlat,fikra,şaka yap,şaka,güldür beni,güldür': async () => getJoke(),
    'trendler,twitter trendleri, twitter, gündem': async () => {
      const trends = await twitterTrends();
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