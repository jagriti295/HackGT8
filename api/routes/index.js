var express = require("express");
var request = require("request");
const fs = require("fs");
var path = require("path");
const { randomInt } = require("crypto");
var router = express.Router();

function requestToNCRAPI(method, endpoint, completion, postBody) {
  var username = "241497cc-e915-4366-a079-a256175b95a6";
  var password = "Satvik321!";
  var auth =
    // "Basic " + Buffer.from(username + ":" + password).toString("base64");
    "Basic " + btoa(username + ":" + password);

  // var day = dateFormat(new Date(), "ddd, d mmm yyyy HH:MM:ss");

  var options = {
    method: method,
    url: "https://gateway-staging.ncrcloud.com/" + endpoint,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth, //'AccessKey 4f3c6a1cd2e5471aa4eb0add352c434e:Hg8EFh1v4rztvSrCvSb5tYKBnDekyEW+AX5Pd4uxftvdILWLmSBcy8wjf80o8wyr+mRcUYSG71o7x0vwRz7l0w==',
      "nep-organization": "6df906a55b2d469fafe15f8c1db16d63",
      "nep-enterprise-unit": "ffdd296de1c5441994c8788c0b3b3bcf",
      Date: "Sat, Oct 2021 07:09:40 GMT", // TODO
    },
  };
  if (
    (method == "POST" || method == "PATCH" || method == "PUT") &&
    postBody != null
  ) {
    options.body = postBody;
  }
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    completion(response);
  });
}

function myfunc() {
  console.log("here");
  requestToNCRAPI(
    "GET",
    // "emerald/selling-service/v1/carts/" + req.params.cartId,
    "/catalog/v2/category-nodes",
    // function (cartRes) {
    //   res.json({ cart: cartRes });
    // }
  );
}

router.put("/", function (req, res, next) {
	console.log("Did?");
  console.log(req.body);
  myfunc()
});

module.exports = router;