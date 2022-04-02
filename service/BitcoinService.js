const axios = require("axios");
const moment = require("moment");

const BitcoinService = {};

BitcoinService.getBitCoinInfo = async (currency) => {
  const todaysDate = moment().format("YYYY-MM-DD");
  const before3oDaysDate = moment().subtract("30", "days").format("YYYY-MM-DD");

  try {
    const currentRate = await axios.get(
      `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`
    );
    const monthlyRate = await axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${before3oDaysDate}&end=${todaysDate}&currency=${currency}`
    );

    const currentCountry = currentRate.data.bpi[currency.toUpperCase()];

    const lowestRate = Math.min(
      ...Object.keys(monthlyRate.data.bpi).map(
        (data) => monthlyRate.data.bpi[data]
      )
    ).toString();
    const highestRate = Math.max(
      ...Object.keys(monthlyRate.data.bpi).map(
        (data) => monthlyRate.data.bpi[data]
      )
    ).toString();

    return {
        currentRate: currentCountry.rate,
        monthlyRate: { lowestRate, highestRate },
      }
  } catch (error) {
    console.log(error);
  }
};

module.exports = BitcoinService;
