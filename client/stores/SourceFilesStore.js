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


        this.update(this.files.concat(this.excludeDublicate(files)));
    },

    excludeDublicate: function (files) {
        var ln = this.files.length,
            nln = files.length || 0,
            result = [],
            filtr = [];

        for (var i = 0;i<nln;i++) {
            !this.files.filter(function (item) {
                return item.name == files[i].name && item.size == files[i].size;
            }).length && result.push(files[i]);
        }

        return result;
    }



});

module.exports = SourceFilesStore;