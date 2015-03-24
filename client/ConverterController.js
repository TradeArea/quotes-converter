/**
 * Created by KlimMalgin on 22.03.2015.
 */
'use strict';


var Reflux = require('reflux');
var FilesActions = require('./actions/FilesActions'),
    ConverterActions = require('./actions/ConverterActions');

var SourceFilesStore = require('./stores/SourceFilesStore'),
    ResultFilesStore = require('./stores/ResultFilesStore');


var ConvertController = Reflux.createStore({
    init: function () {
        this.state = {
            fileProcessing: null,
            sourceFiles: [],
            resultFiles: []
        };

        this.listenTo(SourceFilesStore, this.changeSourceFiles);
        this.listenTo(ResultFilesStore, this.changeResultFiles);
    },

    getDefaultData: function() {
        return this.state;
    },

    update : function(state) {
        this.trigger(this.state = state);
    },

    changeSourceFiles: function (sourceFiles) {
        debugger;
        this.state.sourceFiles = sourceFiles;
        this.update(this.state);
    },

    changeResultFiles: function (resultFiles) {
        debugger;
        this.state.resultFiles = resultFiles;
        this.update(this.state);
    },

    nextFileProcess: function () {

    }

});


module.exports = ConvertController;