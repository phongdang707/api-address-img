require("dotenv").config();
const adminApi = "2020-07";
const rp = require("request-promise");
const { SCRIPT_URL } = process.env;

module.exports = function UploadMetafield(auth, address, image) {
  console.log("address", address);
  console.log("image", image);
  const { shop, accessToken } = auth;

  return new Promise((resolve, reject) => {
    if (!address) {
      return resolve({
        status: "error",
        msg: "Please enter your address",
      });
    } else if (!image) {
      return resolve({
        status: "error",
        msg: "Please import pictures",
      });
    }
    rp({
      uri: `https://9e152e863eb62b63003bb619a8c01ffa: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@phongdang707.myshopify.com/admin/api/2020-07/metafields/count.json`,
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": `accessToken`,
        "Content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        metafield: {
          namespace: "inventory",
          key: "warehouse",
          value: 25,
          value_type: "integer",
        },
      }),
    })
      .then((response) => {
        console.log("Task 1");
        console.log(response);
        resolve({
          status: "success",
          msg: "Send success",
        });
      })
      .catch((err) => {
        resolve({
          status: "error",
          msg: err.message,
        });
      });
  });
};
