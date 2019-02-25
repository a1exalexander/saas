// TODO: this file 'api.js' must be deleted before connection to API
/* eslint-disable */

const data = {
  api: [
    {
      name: "Binance",
      image: "binance.png",
    },
    {
      name: "Bittrix",
      image: "bittrix.png",
    },
    {
      name: "Bitfinex",
      image: "bitfinex.png",
    },
    {
      name: "Poloniex",
      image: "poloniex.png",
    },
    {
      name: "Okex",
      image: "okex.png",
    },
  ],
};

const apiCall = (url) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(data[url]);
      } catch (err) {
        reject(new Error(err));
      }
    }, 1000);
  });

export default apiCall;