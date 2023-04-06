import { getWeatherForecast } from "../src/weather.js";
import { getTwitterTrends } from "../src/getTwitterTrends.js";
import { askToGpt3 } from "../src/askToGpt3.js";
import { getJoke } from "../src/getJoke.js";
import { getServerStatuses } from "../src/getServerStatuses.js";
import { getVariable } from "../src/getVariable.js";

export default {
  "saat kaç,kaç geçiyor": () =>
    `Şu an saat ${new Date().toLocaleTimeString("tr-TR", {
      timeZone: "Europe/Istanbul",
    })}`,

  "bugün günlerden ne,hangi gün,bugün tarih ne,bugünün tarihi": () => {
    const tarih = new Date().toLocaleDateString("tr-TR", {
      timeZone: "Europe/Istanbul",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return `Bugün ${tarih}`;
  },

  "hava nasıl,sıcaklık nedir": async () => {
    const lat = getVariable(process.event, "lat");
    const lng = getVariable(process.event, "lng");
    const { description, temperature } = await getWeatherForecast(lat, lng);

    return `Hava ${description} ve ${temperature} derece.`;
  },

  "sunucular aktif mi,kalkanlar devrede mi": async () => {
    return await getServerStatuses();
  },

  "fıkra anlat,fikra,şaka yap,şaka,güldür beni,güldür": async () => getJoke(),

  "trendler,twitter trendleri, twitter, gündem": async () => {
    const trends = await getTwitterTrends();
    return `Bugün gündemde olanlar:\n${trends.join("\n")}`;
  },

  "gpt,cipiti": async () => {
    return await askToGpt3(query);
  },

  "durum raporu ver,durum raporu,rapor ver": async () => `Kalkanlar devrede`,
};
