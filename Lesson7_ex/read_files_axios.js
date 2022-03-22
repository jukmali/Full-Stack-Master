
/* Tuodaan moduuli ohjelmaan */
const MongoClient = require("mongodb").MongoClient;

/* Haetaan ympäristömuuttujat .env tiedostosta */
require("dotenv").config();

/* console.log(process.env); */
var user = process.env.MONGO_USERID
var pw = process.env.MONGO_PW

const uri = "mongodb+srv://" + user + ":" + pw + "@cluster0.dld5m.mongodb.net/test?retryWrites=true&w=majority";

// const uri = "mongodb+srv://" + user + ":" + salis + "@cluster0.anqd5.mongodb.net/sample_mflix?retryWrites=true&w=majority";

/* Luodaan uusi yhteysolio käyttäen edellä määriteltyä URI:a sekä tarvittavia parametreja */

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* Luodaan yhteys ja tulostetaan tieto virheestä tai onnistumisesta virhetiedot palaututuvat err muuttujaan, hakujen tulokset r-muuttujaan */

client.connect(function (err, r) {
    if (err) throw err;
    else console.log("Connected!");

    // Suljetaan tietokantayhteys
    client.close();
    console.log("Disconnected");
});