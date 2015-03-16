/**
 * Created by KlimMalgin on 16.03.2015.
 */

var fs = require('fs');
debugger;
fs.writeFile("./test.txt", "Hey there!", function(err) {
    debugger;
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});