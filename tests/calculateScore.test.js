import { getPromptScore } from '../lib/getPromptScores';

test('should give best choice', () => {
  const responseText = {
    'saat kaç,kaç geçiyor': null,
    'bugün günlerden ne,hangi gün,bugün tarih ne,bugünün tarihi': null,
    'hava nasıl,sıcaklık nedir': null,
    'sunucular aktif mi,kalkanlar devrede mi': null,
    'fıkra anlat,fikra,şaka yap,şaka,güldür beni,güldür': null,
    'trendler,twitter trendleri, twitter, gündem': null,
  };

  const prompt = 'güldür beni';

  const scores = getPromptScore(prompt, responseText);
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const bestPrompt = sortedScores[0][0] || '';

  expect(bestPrompt).toBe('fıkra anlat,fikra,şaka yap,şaka,güldür beni,güldür');
});
