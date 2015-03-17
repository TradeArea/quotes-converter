/**
 * Created by KlimMalgin on 16.03.2015.
 */
'use strict';


var Reflux = require('reflux');
var FilesActions = require('../actions/FilesActions');

function filesEqual(f1, f2) {
    return f1.file.name == f2.file.name && f1.file.size == f2.file.size;
}

var SourceFilesStore = Reflux.createStore({
    init: function () {
        this.files = [];

        this.listenTo(FilesActions.addFiles, this.handleAddFiles);
        this.listenTo(FilesActions.selectFile, this.handleSelectFile);
        this.listenTo(FilesActions.unSelectFile, this.handleUnSelectFile);
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

    // TODO: handleSelectFile/handleUnSelectFile ƒ”¡À»–Œ¬¿Õ»≈!
    handleSelectFile: function (fileObject) {
        var result = this.files.concat([]),
            ln = result.length;

        for (var i = 0;i<ln;i++) {
            if (filesEqual(result[i], fileObject)) {
                result[i].selected = true;
                break;
            }
        }
        this.update(result);
    },

    // TODO: handleSelectFile/handleUnSelectFile ƒ”¡À»–Œ¬¿Õ»≈!
    handleUnSelectFile: function (fileObject) {
        var result = this.files.concat([]),
            ln = result.length;

        for (var i = 0;i<ln;i++) {
            if (filesEqual(result[i], fileObject)) {
                result[i].selected = false;
                break;
            }
        }
        this.update(result);
    },

    excludeDublicate: function (files) {
        var ln = this.files.length,
            nln = files.length || 0,
            result = [];

        for (var i = 0;i<nln;i++) {
            !this.files.filter(function (item) {
                return filesEqual(item, files[i]); //item.file.name == files[i].file.name && item.file.size == files[i].file.size;
            }).length && result.push(files[i]);
        }

        return result;
    }



});

module.exports = SourceFilesStore;