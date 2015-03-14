/**
 * Created by KlimMalgin on 14.03.2015.
 */

QC.handlers.ChooseFilesHandler = (function () {

    function done(result) {

    }

    return function (files) {
        var ln = files.length,
            FileArray = [],
            file = files[0],
            size = file.size - 1,
            r = null;

        r = QC.mixins.FileReaderMixin.createReader().read(file);
        r.range(0, size)
            .done(function (e) {
                FileArray = e.target.result.split('\n');
                var faLn = FileArray.length;

                for (var i = 0; i<faLn; i++) {
                    FileArray[i] = FileArray[i].split(',');
                }

                debugger;
            }).go();

        debugger;
    };
})();