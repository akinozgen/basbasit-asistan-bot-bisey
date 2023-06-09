import { getVariable } from './lib/getVariable.js';
import { getPromptScore } from './lib/getPromptScores.js';

import responseTexts from './lib/responseTexts.js';

export const handler = async (event) => {
  const query = getVariable(event, 'q');

  process.event = event;

  const prompt = query
    .trim()
    .replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/gi, '')
    .toLocaleLowerCase();

  let responseText = '';
  let promptScores;
  let sortedScores;
  let bestPrompt;

  if (query !== '') {
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
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: responseText,
  };

  return response;
};
