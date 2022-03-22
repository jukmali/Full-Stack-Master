// Let's take mysql module
var mysql = require("mysql");

// Define connection parameters
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"company",
});

con.connect(function(err){
    if(err) throw err;
    else console.log("Connected!");

    // Let's make SQL query
    con.query("SELECT * from persons", function(err,result,fields){
        if(err) throw err;
        //Print the result
        console.log(result);
    });
});