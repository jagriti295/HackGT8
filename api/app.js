const express = require('express')
var request = require("request");
const app = express()
const fs = require("fs");
var path = require("path");
const port = 3000

var storeIDs = [100, 200, 300];
var storeNames = ["SpeedMart"];
// Items returned by ML model
var itemNames = [
  "Organic Whole Carrot",
  "Farmhouse Bread",
  "Low Fat Milk",
];

var itemPrices = [29.99, 79.99, 53.99, 119.99, 399.99, 24.99, 8.99, 16.99, 229.99, 21.99, 64.99, 74.99, 24.99, 19.99, 29.99]
var imageURLs = [
  "https://target.scene7.com/is/image/Target/GUEST_4ec496c7-7c09-411f-a0a3-cf516e5a17ce?fmt=webp&wid=1400&qlt=80",
  "https://target.scene7.com/is/image/Target/GUEST_9828648c-f7cf-439c-9f84-c3f9cc6b6f70?fmt=webp&wid=1400&qlt=80",
  "https://i5.walmartimages.com/asr/3592de4c-2d2d-4285-afbf-f0508775bd58_2.bb23225176016b4d5ce96c4efed80382.jpeg",
];

var storePfpURLs = ["assets/images/header-logo.jpeg"]

var AllItemsAvailable = {};

let categoryrawdata = fs.readFileSync(
  path.resolve(__dirname, "./categories.json")
);
let itemtemplaterawdata = fs.readFileSync(
  path.resolve(__dirname, "./itemtemplate.json")
);

requestToNCRAPI(
  "PUT",
  "catalog/2/category-nodes/2/",
  function (res) {
    console.log("Created categories");
  },
  categoryrawdata
);

for (var i = 0; i < 1; i++) {
  console.log("Adding stores");
  var storeId = storeIDs[i];

  var items = [];
  for (var j = 0; j < 5; j++) {
    var itemId = i * 5 + j;
    var item = itemObject(
      itemId,
      itemNames[i * 5 + j],
      itemPrices[i * 5 + j],
      imageURLs[itemId],
      storeId,
      true
    );
    var itemTemplateCopy = (" " + itemtemplaterawdata).slice(1);
    var itemTemplateObj = JSON.parse(itemTemplateCopy);
    itemTemplateObj.packageIdentifiers[0].value = "" + itemId;
    itemTemplateObj.longDescription.values[0].value = "" + item.itemName;
    itemTemplateObj.shortDescription.values[0].value = "" + item.itemName;
    // TODO merchandise category?
    console.log(JSON.stringify(itemTemplateObj, null, 2))
    requestToNCRAPI(
      "PUT",
      "catalog/2/items/2/" + itemId,
      function (res) {
        console.log("Created item "+JSON.stringify(res))
      },
      JSON.stringify(itemTemplateObj)
    );

    items.push(item);
  }

  AllItemsAvailable[storeId] = items;
}

function getRandomExistingItem() {
  return AllItemsAvailable[storeIDs[0]][getRandomInt(5)];
}

function itemObject(itemId, name, price, pictureURL, cartId, isStocked) {
  return {
    id: itemId,
    itemName: name,
    price: price,
    pictureURL: pictureURL,
    cartId: cartId,
    isStocked: isStocked,
  };
}

function orderObject(orderId, items, deliveryDate) {
  return {
    id: orderId,
    items: items,
    deliveryDate: deliveryDate,
  };
}

function cartObject(cartId, items, pfpURL, storeName) {
  return { id: cartId, items: items, pfpURL: pfpURL, storeName: storeName};
}

function userObject(userId, carts, orders, promotions) {
  return { id: userId, carts: carts, orders: orders, promotions: promotions };
}

function promotionObject(promotionId, cartId, description, expiryDate) {
  return {
    id: promotionId,
    cartId: cartId,
    description: description,
    expiryDate: expiryDate,
  };
}

var promotions = [];
for (var i = 0; i < 5; i++) {
  var storeId = storeIDs[getRandomInt(3)];
  var promotion = promotionObject(
    getRandomInt(100),
    storeId,
    getRandomInt(30) + "% off",
    Math.round(randomDate() / 1000)
  );
  // if(promotions[storeId] == null){
  //   promotions[storeId] = []
  // }
  promotions /*[storeId]*/
    .push(promotion);
}

var carts = {};
for (var i = 0; i < 3; i++) {
  carts[storeIDs[i]] = cartObject(storeIDs[i], [], storePfpURLs[i], storeNames[i]);
}

var orders = [];
orders.push(orderObject(getRandomInt(100), [getRandomExistingItem(), getRandomExistingItem()], Math.round(randomDate(true) / 1000)));
orders.push(orderObject(getRandomInt(100), [getRandomExistingItem()], Math.round(randomDate(true) / 1000)));
orders.push(orderObject(getRandomInt(100), [getRandomExistingItem(), getRandomExistingItem(), getRandomExistingItem()], Math.round(randomDate(false) / 1000)));

var duplicateCheck = [];
for (var i = 0; i < 12; i++) {
  var storeIndex = getRandomInt(3);
  var randomStore = storeIDs[storeIndex];
  var randomItem = getRandomExistingItem();

  var dC = "" + storeIndex + "" + randomItem;
  if (duplicateCheck.includes(randomItem.id) == false) {
    carts[randomStore].items.push(randomItem);
    duplicateCheck.push(randomItem.id);
  }
}

var user1 = userObject("1", carts, orders, promotions);
var users = {};
users["1"] = user1;

function addItemToCart(cartLocation, itemID, callback) {
  console.log("ADD ITEM " + itemID);
  var body = {
    scanData: itemID,
    quantity: {
      unitOfMeasure: "EA",
      value: 1,
    },
  };
  requestToNCRAPI(
    "POST",
    "emerald/selling-service/v1" + cartLocation,
    callback,
    JSON.stringify(body)
  );
}

// get a random date up to 10 days in the future
function randomDate(future) {
  var end = new Date(
    Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10
  );
  var start = new Date();
  return new Date(
    start.getTime() + (Math.random() * (end.getTime() - start.getTime())*(future == true ? 1 : -1))
  );
}


app.get("/carts/:userId", function (req, res, next) {
  res.json({ carts: users[req.params.userId].carts });
});



app.get("/promotions/:userId", function (req, res, next) {
  res.json({ promotions: users[req.params.userId].promotions });
});

app.get("/orders/:userId", function (req, res, next) {
  const userOrders = users[req.params.userId].orders;
  res.json({ orders: userOrders });
});

app.get("/about", function (req, res) {
  var userID = 1;
  var itemIDs = [2,3];
  console.log(JSON.stringify(req.body));
  
  var user = users[userID]; //users[key] lol

  var itemsRemoved = []

  if (user != null) {

    for (var key in user.carts) {

      user.carts[key].items = user.carts[key].items.filter(function (e) {

        var inArr = false;
        for(var k = 0; k < itemIDs.length; k++){
          if(itemIDs[k] == e.id){
            inArr = true;
          }
        }
        if(inArr){
          // console.log("REMOVE "+e.id)

          itemsRemoved.push(e)
        }
        return !inArr; //removing items to be checked out
      });

    }
  }

    createNewCart(function (newCartRes) {
      console.log(newCartRes.headers);
    var newCartLocation = newCartRes.headers.location;
    console.log("NEW CART LOCATION: " + newCartLocation);
    var itemsAddedToCart = 0;
    for (var i = 0; i < itemIDs.length; i++) {
      addItemToCart(newCartLocation, itemIDs[i], function () {
        itemsAddedToCart += 1;
      });
    }
  });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function createNewCart(callback) {
  requestToNCRAPI("POST", "emerald/selling-service/v1/carts", callback);
}

app.get('/', (req, res) => {
  res.send(myfun());
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function myfun() {
  return "Fun!";
}

function requestToNCRAPI(method, endpoint, completion, postBody) {
  // function requestToNCRAPI(method, endpoint, postBody) {
  var username = "f9055f20-c29a-4dd9-8c9d-f3a27cd63164";
  var password = "HackGT321!!"
  var auth =
    "Basic " + Buffer.from(username + ":" + password).toString("base64");
  // console.log(auth);
  const d = new Date();
  // console.log(d);
  const day = d.getUTCDate();
  // console.log(day);

  var options = {
    method: method,
    url: "https://gateway-staging.ncrcloud.com/" + endpoint,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth, 
      "nep-organization": "test-drive-0fa8f198faad4b28a5f7f",
      "nep-enterprise-unit": "9908e20c68e049ea8c086db15ce91b0a",
      Date: day,
    },
  };
  console.log(options.url);
  if (
    (method == "POST" || method == "PATCH" || method == "PUT") &&
    postBody != null
  ) {
    options.body = postBody;
  }
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("SUCCESS");
    console.log("171");

    console.log(response.body);
    if(completion!== null || completion!==undefined) {
      console.log("HERE");
      completion(response);
    }
  });
}