// // tbc checkout
// export const SendTBCRequest = (props) => {
//   var axios = require("axios");

//   var data = {
//     amount: {
//       currency: "GEL",
//       total: props.total,
//       subTotal: 0,
//       tax: 0,
//       shipping: 0,
//     },
//     returnurl: "https://google.com",
//     //   extra: "GE60TB7226145063300008",
//     userIpAddress: "127.0.0.1",
//     expirationMinutes: "5",
//     methods: [5, 7, 8],
//     callbackUrl: "https://elanofficial.ge/wc-api/tbc-checkout/callback",
//     preAuth: true,
//     language: "EN",
//     merchantPaymentId: "P123123",
//     saveCard: false,
//     // saveCardToDate: "0321",
//   };
//   var config = {
//     method: "post",
//     url: "https://api.tbcbank.ge/v1/tpay/payments",
//     headers: {
//       "Content-Type": "application/json",
//       apikey: "dGFKsOPTGJCSRkzMINkknt3PWG2GYqQw",
//       Authorization:
//         "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVFMjBGMzQ2RUY1RjU2ODkxQTIyRkUzQUVCRjAzMzlGMzVDNjk1QjYiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJYaUR6UnU5ZlZva2FJdjQ2Nl9Bem56WEdsYlkifQ.eyJuYmYiOjE2NzM0NDgxNzAsImV4cCI6MTY3MzUzNDU3MCwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50c2FwaS50YmNiYW5rLmdlLyIsImF1ZCI6WyJodHRwczovL2FjY291bnRzYXBpLnRiY2JhbmsuZ2UvcmVzb3VyY2VzIiwicGF5bWVudGFwaSJdLCJjbGllbnRfaWQiOiI3MDAwNDk0Iiwic2NvcGUiOlsicGF5bWVudGFwaSJdfQ.g_am-PdbJoy0_idjvtddxL5n0sEJgws-hg0hdJJ8u8zMU1v_HGccTRQuK3PMXEq5f1bxAhUHIqdeXkmmN1hstpUuhMVQlTy2O2yr5Xtp14h2BeoaR8JsKs9AsMhXxxYBb3oKEogxHRUm1rS2nEIrXpt6exe9yoHQyR-u8cDlNNyqQZaaEcXLYLp_MMQRJ3x70KzVL-TPoG3mClS6C1P6t1j7i-ILBScsNDdtubUzVGQK7pCMjQYkMtRCrUyRZnknNrHRKJBquG8ZEB9A9Bm9e57OGVWi82h9iL4h7A5rcp4_XJVKeFR1Mb5fdfkoVI9HUWBvW0PsL4fSHgDBoS5E7w",
//     },
//     data: data,
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })

//     .catch(function (error) {
//       console.log(error);
//     });
// };
