const BitcoinService = require("./BitcoinService");

test("Checking Usd to Bitcoin currency ", async() => {
  const response = await BitcoinService.getBitCoinInfo("usd");
  console.log(response);

  expect(response).toHaveProperty("currentRate");
});
