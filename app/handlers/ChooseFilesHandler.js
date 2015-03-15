/**
 * Created by KlimMalgin on 14.03.2015.
 */

QC.handlers.ChooseFilesHandler = (function () {

    function fileDataAnalizer(e) {
        var FileArray = e.target.result.split('\n'),
            faLn = FileArray.length;

        for (var i = 0; i<faLn; i++) {
            FileArray[i] = FileArray[i].split(',');
        }

        debugger;
        QC.modules.QuotesDataConverter
            .data({
                sourceData: FileArray,
                targetResolution: 60
            })
            .convert()
            .done(function (resultArray) {
                debugger;
            });
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