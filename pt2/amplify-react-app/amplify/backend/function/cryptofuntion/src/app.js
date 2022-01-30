/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const axios = require("axios");
const { response } = require("express");

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//async-await
/* app.get("/coins", function (req, res) {
  const coins = [
    { name: "Bitcoin", symbol: "BTC", price_usd: "10000" },
    { name: "Etherium", symbol: "ETH", price_usd: "400" },
    { name: "Litecoin", symbol: "LTC", price_usd: "150" },
  ];
  res.json({
    coins,
  });
}); */

//coinlore api를 호출하여 연동하여 보여준다.
app.get("/coins", function (req, res) {
  let apiUrl = `https://api.coinlore.com/api/tickers?start=0&limit=10`;

  if (req.apiGateway && req.apiGateway.event.queryStringParameters) {
    // event가 있는지 확인후 queryStringParameters를 확인해 있으면 해당 값을 이용하여 URL을 수정
    const { start = 0, limit = 10 } =
      req.apiGateway.event.queryStringParameters;
    apiUrl = `https://api.coinlore.com/api/tickers/?start=${start}&limit=${limit}`;
  }

  axios
    .get(apiUrl)
    .then((response) => {
      res.json({ coins: response.data.data });
    })
    .catch((err) => res.json({ error: err }));
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
