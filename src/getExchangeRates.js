import axios from 'axios';

export async function getExchangeRates() {
  const endpoint = 'https://api.exchangerate.host/latest';

  const response = await axios.get(endpoint);

  const { TRY, USD, BTC } = response.data.rates;

  // values in EUR base. BTC, USD and EUR in TRY base
  const tryToEur = TRY;
  const tryToUsd = TRY / USD;
  const tryToBtc = TRY / BTC;

  let comment = '';

  const evaluate = (value, ranges) => {
    for (let i = 0; i < ranges.length; i++) {
      if (value < ranges[i].max) {
        return ranges[i].comment;
      }
    }
    return '';
  };

  const ranges = [
    { max: 5, comment: 'Bu ne sanki bayram havası.' },
    { max: 8, comment: 'İlk kez böyle hissediyorum.' },
    { max: 12, comment: 'Biraz daha düşerse bu iş olur.' },
    { max: 16, comment: 'Benim hala umudum var.' },
    { max: 22, comment: 'Allah belanızı versin.' },
  ];

  comment = evaluate(tryToUsd, ranges);

  return `1 TL, ${tryToEur.toFixed(2)} Euro, ${tryToUsd.toFixed(2)} Dolar ve ${tryToBtc.toFixed(
    2
  )} BTC.\n${comment}`;
}
