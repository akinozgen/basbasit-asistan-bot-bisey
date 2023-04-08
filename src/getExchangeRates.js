import axios from 'axios';

export async function getExchangeRates() {
  const endpoint = 'https://api.exchangerate.host/latest';

  const response = await axios.get(endpoint);

  const { TRY, USD, BTC } = response.data.rates;

  // values in EUR base. BTC, USD and EUR in TRY base
  const tryToEur = TRY;
  const tryToUsd = TRY / USD;
  const tryToBtc = TRY / BTC;

  return `1 TL, ${tryToEur.toFixed(2)} Euro, ${tryToUsd.toFixed(2)} Dolar ve ${tryToBtc.toFixed(
    2
  )} BTC`;
}
