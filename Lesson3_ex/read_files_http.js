//const { response } = require('express');
var https = require('https')
var options = {
  hostname: 'www.omdbapi.com',
  //port: '1137',
  path: '/?s=star+wars&apikey=cbbc6750',
  //method: 'GET'
};


const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  var data = '';
  res.on('data', chunck => {
    data += chunck;
    
    process.stdout.write(chunck);
  });
  res.on('end' ,function() {
    jsData = JSON.parse(data);
    console.log(jsData);
  });
});

req.on('error', error => {
  console.error(error)
})

req.end()
