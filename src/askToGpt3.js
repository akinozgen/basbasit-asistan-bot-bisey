import axios from 'axios';
import { getVariable } from '../lib/getVariable.js';

export async function askToGpt3() {
  const query = getVariable(process.event, 'query');

  const prompt = query
    .trim()
    .replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/gi, '')
    .toLocaleLowerCase();

  const client = axios.create({
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  });

  const params = {
    prompt:
      `Arkadaşım gibi davranmanı istiyorum. Size hayatımda neler olduğunu anlatacağım ve siz de zor zamanlarımda bana yardımcı olacak yararlı ve destekleyici bir şeyle cevap vereceksiniz. Herhangi bir açıklama yazmayın, sadece tavsiye/destekleyici kelimelerle cevap verin. İlk ricam "${prompt}"` +
      '\n',
    max_tokens: 10,
    temperature: 0,
    model: 'text-davinci-003',
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ['\n'],
  };

  const url = 'https://api.openai.com/v1/engines/davinci/completions';
  const response = await client.post(url, params);

  return response.data.choices[0].text;
}
