/**
 * Created by KlimMalgin on 16.03.2015.
 */
'use strict';


var Reflux = require('reflux');
var FilesActions = require('../actions/FilesActions');

var SourceFilesStore = Reflux.createStore({
    init: function () {
        this.files = [];

        this.listenTo(FilesActions.addFiles, this.handleAddFiles);
    },

    getDefaultData: function() {
        return this.files;
    },

    update : function(files) {
        this.trigger(this.files = files);
    },

    handleAddFiles: function(files) {
        debugger;
        this.update(this.files.concat(files));
    }

});

module.exports = SourceFilesStore;