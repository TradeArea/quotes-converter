/**
 * Created by KlimMalgin on 14.03.2015.
 */

var fs = require('fs');

QC.init = function () {
    QC.layout.ChooseAreaCreator();
    QC.layout.SaveButtonCreator()
        .click(function () {
            debugger;

            fs.writeFile("./test.txt", "Hey there!", function(err) {
                debugger;
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });

        });
};
