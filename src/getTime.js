export const getTime = () => {
  return `Şu an saat ${new Date().toLocaleTimeString('tr-TR', {
    timeZone: 'Europe/Istanbul',
  })}`;
};
