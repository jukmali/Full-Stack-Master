var fs = require("fs");

if(!fs.existsSync('./new_data')){
    fs.mkdirSync('new_data', function(err){
        if(err) throw err;
    });
} else {
    console.log('Directory exists');
};

if(fs.existsSync("./new_data/new_file.js")){
        console.log("file exists");
} else {
    fs.writeFile('./new_data/new_file.js',"new data", function(err){
        if(err) throw err;
        console.log('Write file');
    });
};

/* try{
    fs.unlinkSync('./new_data/new_file.js');
    console.log('file deleted');
} catch (err){
    console.log(err);
}; */




