/**
 * Created by KlimMalgin on 20.03.2015.
 */
'use strict';

var Reflux = require('reflux');
var FilesActions = require('../actions/FilesActions');

function filesEqual(f1, f2) {
    return f1.name == f2.name && f1.size == f2.size;
}

var ResultFilesStore = Reflux.createStore({
    init: function () {
        this.resultFiles = [];

        this.listenTo(FilesActions.createResultFile, this.handleCreateResultFile);
        this.listenTo(FilesActions.completeResultFile, this.handleCompleteResultFile);
        this.listenTo(FilesActions.savedFileComplete, this.handleSavedFileComplete);
    },

    getDefaultData: function() {
        return this.resultFiles;
    },

    update : function(files) {
        this.trigger(this.resultFiles = files);
    },

    /**
     * Добавляем файл в список обрабатываемых
     */
    handleCreateResultFile: function(file) {
        this.update(this.resultFiles.concat([{
            file: file,
            progress: true,
            complete: false,
            saved: false
        }]));
    },

    /**
     * Помечаем файл как сконвертированный и генерируем событие на сохранение
     * @param sourceFile
     * @param resultData
     */
    handleCompleteResultFile: function (sourceFile, resultData) {
        var files = this.resultFiles.concat([]),
            arrName = sourceFile.name.split('.'),
            name = arrName[0] + "_CONVER_TO_60" + arrName[1],
            ln = files.length,
            result = null;

        for (var i = 0;i<ln;i++) {
            if (filesEqual(files[i].file, sourceFile)) {
                result = files[i] = {
                    file: files[i].file,
                    name: name,
                    resultData: resultData,
                    progress: false,
                    complete: true,
                    saved: false
                };
                break;
            }
        }

        !!result && FilesActions.saveFile(result, resultData);

        this.update(files);
    },

    handleSavedFileComplete: function (fileObject) {
        var files = this.resultFiles.concat([]),
            ln = files.length;

        debugger;
        for (var i = 0;i<ln;i++) {
            if (filesEqual(files.file, fileObject.file)) {
                files[i].saved = true;
                break;
            }
        }

        this.update(files);
    }

});

module.exports = ResultFilesStore;