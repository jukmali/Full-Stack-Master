var fs = require("fs");

const path = './combiningfiles.txt';

try {
    fs.unlinkSync(path);
} catch(err) {
    console.log(err);
}
