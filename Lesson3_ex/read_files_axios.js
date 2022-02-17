
var axios = require("axios");
const promise = axios
 .get("http://www.omdbapi.com/?s=star+wars&apikey=cbbc6750")
  .then(response => {
    const data = response.data;
    console.log(data);
  });
console.log(promise);
