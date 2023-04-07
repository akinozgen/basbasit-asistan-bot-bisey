export const getDate = () => {
  const tarih = new Date().toLocaleDateString('tr-TR', {
    timeZone: 'Europe/Istanbul',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return `Bugün ${tarih}`;
};
