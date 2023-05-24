const symbol = args[0];

const realstonksRequest = Functions.makeHttpRequest({
  url: `https://realstonks.p.rapidapi.com/${symbol}`,

  headers: {
    "X-RapidAPI-Key": "75ba1f6d71mshfea2ae56860c646p1927b7jsn221b3a34deaf", //In the future should be change to encrypted env variable
    "X-RapidAPI-Host": "realstonks.p.rapidapi.com",
  },
});

const response = await realstonksRequest;

let price = 0;

if (!response.error) {
  price = response.data.price;
} else {
  console.log("Request error");

  throw Error("Request failed");
}

const priceInCents = price * 100;

return Functions.encodeUint256(Math.round(priceInCents));