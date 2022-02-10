var fs = require("fs");

console.log("Program started");

fs.readdir('../', function (err,data) {
    if(err) throw err;
    console.log('Results of readdir:');
    console.log(data.toString());
    console.log(data);
});
     