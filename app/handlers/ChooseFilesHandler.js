/**
 * Created by KlimMalgin on 14.03.2015.
 */

var fs = require('fs');

QC.handlers.ChooseFilesHandler = (function () {

    function createResultFileData(resultArray) {
        console.log(resultArray);

        var ln = resultArray.length,
            resultData = "";

        for (var i = 0;i<ln;i++) {
            resultArray[i] = resultArray[i].join(',');
        }

        resultData = resultArray.join('\n');
        debugger;
        fs.writeFile("./test.csv", resultData, function(err) {
            debugger;
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

    }

    function fileDataAnalizer(e) {
        var FileArray = e.target.result.split('\n'),
            faLn = FileArray.length;

        for (var i = 0; i<faLn; i++) {
            FileArray[i] = FileArray[i].split(',');
        }

        debugger;
        QC.modules.QuotesDataConverter()
            .data({
                sourceData: FileArray,
                targetResolution: 60
            })
            .convert()
            .done(createResultFileData);
    }

    return function (files) {
        var file = files[0],
            size = file.size - 1;

        QC.mixins.FileReaderMixin.createReader()
            .read(file)
            .range(0, size)
            .done(fileDataAnalizer)
            .go();
    };
})();