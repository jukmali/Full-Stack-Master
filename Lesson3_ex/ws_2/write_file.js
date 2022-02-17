var fs = require("fs");

console.log("Program started...");

// Combine two files to one file
var comb ="";
fs.readFile('example.txt', function(err,data){
    if(err) console.log(err);
    console.log("File was read");

    fs.readFile("example2.txt", function(err,data2){
        if(err) throw err;
        console.log('Another file is read!');

        comb = data.toString() +"\n" + data2.toString();
        fs.writeFile('combiningfiles.txt',comb, function(err){
            if(err) throw err;
            console.log('Files are written!');
            //fs.close();

            console.log("Append text");
            // Append text beginning of file and end of file
            fs.readFile('./combiningfiles.txt', function(err,data3){
                if(err) throw err;
                console.log('Third file is read');
                buf = "I added new text \n" + data3;
                fs.writeFile('./combiningfiles.txt', buf, function(err){
                    if(err) throw err;
                    console.log('Top text included');
                });

                buf = '\nThis is the text in the end'

                fs.appendFile('./combiningfiles.txt', buf, function(err){
                    if(err) throw err;
                    console.log("End text included");
                });

            });
            

        });
        
    });
});


console.log("Program ended");