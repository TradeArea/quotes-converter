/**
 * Created by KlimMalgin on 20.03.2015.
 */
'use strict';

var Reflux = require('reflux');
var FilesActions = require('../actions/FilesActions');

function filesEqual(f1, f2) {
    return f1.file.name == f2.file.name && f1.file.size == f2.file.size;
}

var ResultFilesStore = Reflux.createStore({
    init: function () {
        this.resultFiles = [];

        this.listenTo(FilesActions.createResultFile, this.handleCreateResultFile);
    },

    getDefaultData: function() {
        return this.resultFiles;
    },

    update : function(files) {
        this.trigger(this.resultFiles = files);
    },

    handleCreateResultFile: function(file) {
        this.update(this.resultFiles.concat([{
            source: file,
            complete: false
        }]));
    }

});

module.exports = ResultFilesStore;