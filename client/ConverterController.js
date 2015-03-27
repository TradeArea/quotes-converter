/**
 * Created by KlimMalgin on 22.03.2015.
 */
'use strict';


var Reflux = require('reflux');
var FilesActions = require('./actions/FilesActions'),
    ResolutionActions = require('./actions/ResolutionActions');

var SourceFilesStore = require('./stores/SourceFilesStore'),
    ResultFilesStore = require('./stores/ResultFilesStore'),
    ResolutionStore = require('./stores/ResolutionStore');

var CreateFileReader = require('./mixins/FileReaderMixin').createReader;
var CreateConverter = require('./mixins/QuotesConverterMixin').createConverter;

var ConvertController = Reflux.createStore({
    init: function () {
        this.state = {
            sourceFileProcessed: null,
            convertProgress: 0,
            sourceFiles: [],
            resultFiles: [],
            resolutions: []
        };

        this.listenTo(SourceFilesStore, this.changeSourceFiles);
        this.listenTo(ResultFilesStore, this.changeResultFiles);
        this.listenTo(ResolutionStore, this.changeResolutions);

        this.listenTo(FilesActions.convertNextFile, this.convertNextFile);
        this.listenTo(FilesActions.convertProgress, this.handleConvertProgress);
        this.listenTo(FilesActions.convertComplete, this.handleConvertComplete);

        ResolutionActions.emitResolutions();
    },

    getDefaultData: function() {
        return this.state;
    },

    update : function(state) {
        this.trigger(this.state = state);
    },

    changeResolutions: function (resolutions) {
        this.state.resolutions = resolutions;
        this.update(this.state);
    },

    changeSourceFiles: function (sourceFiles) {
        this.state.sourceFiles = sourceFiles;
        this.update(this.state);
    },

    changeResultFiles: function (resultFiles) {
        this.state.resultFiles = resultFiles;
        this.update(this.state);
    },

    handleConvertProgress: function (progress) {
        this.state.convertProgress = progress;
        this.update(this.state);
    },

    convertNextFile: function () {
        var files = this.state.sourceFiles.filter(function (item) {
            return /*item.complete != true &&*/ !!item.resolutions && item.resolutions.length > 0;
        });

        if (!!files.length) {
            this.state.sourceFileProcessed = files[0];
            this.update(this.state);
            this.readFile(files[0]);
        }
    },

    // --

    readFile: function (fileObject) {
        CreateFileReader()
            .readFile(fileObject)
            .beforeRead(FilesActions.createResultFile)
            .done(this.fileDataAnalizer);
    },

    fileDataAnalizer: function (e) {
        var FileArray = e.target.result.split('\n'),
            faLn = FileArray.length,
            fileInfo = this.state.sourceFileProcessed,
            targetResolution = fileInfo.resolutions.shift();

        this.state.sourceFileProcessed = fileInfo;
        this.update(this.state);

        for (var i = 0; i<faLn; i++) {
            FileArray[i] = FileArray[i].split(',');
        }

        CreateConverter()
            .params({
                sourceData: FileArray,
                targetResolution: targetResolution
            })
            .convert(function (index, count) {
                var onePercent = count / 100,
                    progress = (index / onePercent).toFixed(1);
                FilesActions.convertProgress(progress);
            });
    },

    handleConvertComplete: function (resultArray) {
        var sourceFile = this.state.sourceFileProcessed,
            ln = resultArray.length,
            resultData;

        console.log(resultArray);

        for (var i = 0;i<ln;i++) {
            resultArray[i] = resultArray[i].join(',');
        }

        resultData = resultArray.join('\n');
        FilesActions.completeResultFile(sourceFile.file, resultData);
    }

});


module.exports = ConvertController;