export function getPromptScore(prompt, responseTexts) {
  const scores = {};

  // Split prompt into an array of words
  const promptWords = prompt
    .trim()
    .replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/gi, '')
    .toLocaleLowerCase()
    .split(/\s+/);

  for (const [key] of Object.entries(responseTexts)) {
    // Split possible prompts into an array of words
    const possiblePrompts = key.trim().toLocaleLowerCase().split(',');

    let score = 0;
    for (const possiblePrompt of possiblePrompts) {
      const possiblePromptWords = possiblePrompt
        .trim()
        .replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/gi, '')
        .toLocaleLowerCase()
        .split(/\s+/);
      for (const promptWord of promptWords) {
        for (const possiblePromptWord of possiblePromptWords) {
          if (promptWord === possiblePromptWord) {
            // Increase score for each matching word
            score++;
            break;
          }
        }
      }
    }

    scores[key] = score;
  }

  return scores;
}
