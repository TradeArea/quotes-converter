/**
 * Created by KlimMalgin on 16.03.2015.
 */
'use strict';


var Reflux = require('reflux');
var FilesActions = require('../actions/FilesActions');

function filesEqual(f1, f2) {
    return f1.name == f2.name && f1.size == f2.size;
}

var SourceFilesStore = Reflux.createStore({
    init: function () {
        this.files = [];

        this.listenTo(FilesActions.addFiles, this.handleAddFiles);
        this.listenTo(FilesActions.selectFile, this.handleSelectFile);
        this.listenTo(FilesActions.unSelectFile, this.handleUnSelectFile);
        // --
        this.listenTo(FilesActions.createResultFile, this.handleCreateResultFile);
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

    // TODO: handleSelectFile/handleUnSelectFile ДУБЛИРОВАНИЕ!
    handleSelectFile: function (fileObject) {
        var result = this.files.concat([]),
            ln = result.length;

        for (var i = 0;i<ln;i++) {
            if (filesEqual(result[i].file, fileObject.file)) {
                result[i].selected = true;
                break;
            }
        }
        this.update(result);
    },

    // TODO: handleSelectFile/handleUnSelectFile ДУБЛИРОВАНИЕ!
    handleUnSelectFile: function (fileObject) {
        var result = this.files.concat([]),
            ln = result.length;

        for (var i = 0;i<ln;i++) {
            if (filesEqual(result[i].file, fileObject.file)) {
                result[i].selected = false;
                break;
            }
        }
        this.update(result);
    },

    /**
     * Удаляем обрабатываемый файл из списка исходных
     * @param file
     */
    handleCreateResultFile: function (file) {
        var files = this.files.concat([]),
            ln = files.length,
            index = -1;

        for (var i = 0;i<ln;i++) {
            if (filesEqual(files[i].file, file)) {
                index = i;
                break;
            }
        }

        files.splice(index, 1);
        this.update(files);
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