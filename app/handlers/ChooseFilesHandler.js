/**
 * Created by KlimMalgin on 14.03.2015.
 */

QC.handlers.ChooseFilesHandler = (function () {
    return function (files) {
        var ln = files.length,
            r = null;

        //for (var i = 0; i<ln; i++) {
            r = QC.mixins.FileReaderMixin.createReader();
            r.read(files[0])
                .range(0, 55)
                .done(function () {
                    debugger;
                }).go();
        //}

        debugger;
    };
})();