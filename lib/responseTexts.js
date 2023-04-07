import { getWeatherForecast } from '../src/getWeatherForecast.js';
import { getTwitterTrends } from '../src/getTwitterTrends.js';
import { askToGpt3 } from '../src/askToGpt3.js';
import { getJoke } from '../src/getJoke.js';
import { getServerStatuses } from '../src/getServerStatuses.js';
import { getTime } from '../src/getTime.js';
import { getDate } from '../src/getDate.js';

export default {
  'saat kaç,kaç geçiyor': async () => await getTime(),

  'bugün günlerden ne,hangi gün,bugün tarih ne,bugünün tarihi': async () => await getDate(),

  'hava nasıl,sıcaklık nedir': async () => await getWeatherForecast(),

  'sunucular aktif mi,kalkanlar devrede mi': async () => await getServerStatuses(),

  'fıkra anlat,fikra,şaka yap,şaka,güldür beni,güldür': async () => getJoke(),

  'trendler,twitter trendleri, twitter, gündem': async () => await getTwitterTrends(),

  'gpt,cipiti': async () => await askToGpt3(),

  'durum raporu ver,durum raporu,rapor ver': async () => `Kalkanlar devrede`,
};
