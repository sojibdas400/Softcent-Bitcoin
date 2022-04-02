const axios = require("axios");
const { json } = require("express/lib/response");
const moment = require("moment");
const BitcoinService = require("../service/BitcoinService");
const BitcoinController = {};

BitcoinController.getBitCoinInfo = async (req, res, next) => {
  try {
    const currencyCountry = ['usd', 'eur'];

    
    const currency = req.query.currency;
    if(!currencyCountry.includes(currency)) {
      res.status(401).send({
        message: `${currency} is not availabe. Please try with usd or eur!`
      })
    }

    const {currentRate, monthlyRate} = await BitcoinService.getBitCoinInfo(currency);

    console.log({currentRate, monthlyRate});

    if (Object.entries(currentRate)) {
      res.status(200).send({
        currentRate,
        monthlyRate,
      });
    } else {
      res.send({
        message: `Sorry, your requested currency ${currency.toUpperCase()} is not supported or is invalid`,
      });
    }
  } catch (error) {
   next(error);
  }
};

module.exports = BitcoinController;
