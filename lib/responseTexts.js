import { getWeatherForecast } from '../src/getWeatherForecast.js';
import { getTwitterTrends } from '../src/getTwitterTrends.js';
import { askToGpt3 } from '../src/askToGpt3.js';
import { getJoke } from '../src/getJoke.js';
import { getServerStatuses } from '../src/getServerStatuses.js';
import { getTime } from '../src/getTime.js';
import { getDate } from '../src/getDate.js';
import { getExchangeRates } from '../src/getExchangeRates.js';

const saatAlias = [
  'saat kaç',
  'kaç geçiyor',
  'şu an saat ne',
  'şu anda saat kaç',
  'saat kaç oldu',
  'saat hakkında bilgi ver',
  'mevcut zaman nedir',
  'zamanı söyle',
  'zaman nedir',
  'şu an saat kaç etmekte',
  'şu anda zaman ne gösteriyor',
];
const tarihAlias = [
  'bugün günlerden ne',
  'bugünün zamanı ne',
  'bugün hangi gün',
  'hangi gün',
  'bugün tarih ne',
  'bugünün tarihi',
  'şu an hangi tarihte',
  'şu anda hangi tarihi gösteriyor',
  'mevcut tarih nedir',
  'tarih hakkında bilgi ver',
  'günün tarihi nedir',
  'bugün kaçıncı gün',
  'şu an hangi tarihteyiz',
  'şu anda tarih ne diyor',
];
const havaAlias = [
  'hava nasıl',
  'sıcaklık nedir',
  'bugün kaç derece',
  'hava durumu ne diyor',
  'mevcut hava koşulları nedir',
  'şu an hava nasıl',
  'hava raporu ne söylüyor',
  'hava tahmini nedir',
  'havada ne var',
  'şu anda hava durumu nasıl',
  'hava koşulları hakkında bilgi ver',
  'şu an hava sıcaklığı kaç',
];
const sunucuAlias = [
  'sunucular aktif mi',
  'kalkanlar devrede mi',
  'sunucu durumu ne',
  'sunucular çalışıyor mu',
  'sunucu durum raporu',
  'kalkanlar aktif mi',
];
const fikraAlias = [
  'fıkra anlat',
  'fikra',
  'şaka yap',
  'şaka',
  'güldür beni',
  'güldür',
  'komik fıkra',
  'gülmece',
  'komik şaka',
];
const trendlerAlias = [
  'trendler',
  'twitter trendleri',
  'twitter',
  'gündem',
  'popüler konular',
  'trend olanlar',
  'gündemde ne var',
  'trend topicler',
  'popüler hashtagler',
];
const gptAlias = [
  'gpt',
  'cipiti',
  'yapay zeka',
  'dil modeli',
  'doğal dil işleme',
  'sanal asistan',
  'soru cevap',
  'yapay zeka modeli',
  'sohbet botu',
];
const durumRaporuAlias = [
  'durum raporu ver',
  'durum raporu',
  'rapor ver',
  'sistem durumu',
  'sunucu durumu',
  'hizmet durumu',
  'durum kontrolü',
  'sistem kontrolü',
  'sunucu kontrolü',
  'hizmet kontrolü',
  'sistem çalışıyor mu',
  'sunucu çalışıyor mu',
  'hizmet çalışıyor mu',
  'sistem aktif mi',
  'sunucu aktif mi',
  'hizmet aktif mi',
];
const dovizAlias = [
  'dolar',
  'usd',
  'amerikan doları',
  'us dollar',
  'euro',
  'eur',
  'avro',
  'euro para birimi',
  'bitcoin',
  'btc',
  'kripto para',
  'kripto para birimi',
  'sanal para',
  'dijital para',
  'kripto döviz',
  'döviz ne oldu',
  'döviz durumu',
  'döviz kuru ne',
  'döviz kuru nedir',
  'doların durumu ne',
  'doların durumu nedir',
  'euro ne kadar',
  'euro ne oldu',
  'bitcoin fiyatı',
  'bitcoin değeri',
  'bitcoin ne kadar',
  'bitcoin ne oldu',
];

export default {
  [saatAlias]: async () => await getTime(),

  [tarihAlias]: async () => await getDate(),

  [havaAlias]: async () => await getWeatherForecast(),

  [sunucuAlias]: async () => await getServerStatuses(),

  [fikraAlias]: async () => getJoke(),

  [trendlerAlias]: async () => await getTwitterTrends(),

  [gptAlias]: async () => await askToGpt3(),

  [dovizAlias]: async () => await getExchangeRates(),

  [durumRaporuAlias]: async () => `Kalkanlar devrede`,
};
