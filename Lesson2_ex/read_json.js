var data = require('./persons.json');

for(var i=0; i < data.length; i++){
    console.log(data[i].name);
    console.log(data[i].address)
    // console.log(data[i]);
}