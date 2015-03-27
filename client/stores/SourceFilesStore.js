/**
 * Created by KlimMalgin on 16.03.2015.
 */
'use strict';

var Reflux = require('reflux');
var FilesActions = require('../actions/FilesActions');
var filesEqual = require('../utils/files').filesEqual;

var SourceFilesStore = Reflux.createStore({
    init: function () {
        this.files = [];

        this.listenTo(FilesActions.addFiles, this.handleAddFiles);
        // --
        this.listenTo(FilesActions.createResultFile, this.handleCreateResultFile);
        this.listenTo(FilesActions.savedFileComplete, this.handleSavedFileComplete);
    },

    getDefaultData: function() {
        return this.files;
    },

    update : function(files) {
        this.trigger(this.files = files);
    },

    handleAddFiles: function(files) {
        var prep = this.excludeDublicate(files);
        this.update(this.files.concat(prep));
    },

    /**
     * Ставим файлу состояние progress
     * @param fileObject
     */
    handleCreateResultFile: function (fileObject) {
        var files = this.files.concat([]),
            ln = files.length,
            index = -1;

        for (var i = 0;i<ln;i++) {
            if (filesEqual(files[i], fileObject)) {
                index = i;
                break;
            }
        }

        files[index] = this.setFileAsProgress(files[index]);
        this.update(files);
    },

    handleSavedFileComplete: function (fileObject) {
        var files = this.files.concat([]),
            ln = files.length;

        for (var i = 0;i<ln;i++) {
            if (filesEqual(files[i], fileObject)) {
                files[i].complete = true;
                files[i].progress = false;
            }
        }

        this.update(this.files);
    },

    excludeDublicate: function (files) {
        var ln = this.files.length,
            nln = files.length || 0,
            result = [];

        for (var i = 0;i<nln;i++) {
            !this.files.filter(function (item) {
                return filesEqual(item, files[i]);
            }).length && result.push(files[i]);
        }

        return result;
    },

    setFileAsProgress: function (fileObject) {
        fileObject.progress = true;
        return fileObject;
    }



});

module.exports = SourceFilesStore;