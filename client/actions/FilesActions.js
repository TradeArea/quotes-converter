/**
 * Created by KlimMalgin on 16.03.2015.
 */

var Reflux = require('reflux');

var addFilesDef = {
    preEmit : function(files) {
        var ss = files.map(function (item) {
            return {
                file: item,
                complete: false,
                progress: false
            };
        });
        return [ss];
    }
};

var saveFileDef = {
    preEmit: function (fileObject) {
        try {
            if (FS && FS.writeFile && FS.writeFile) {
                FS.writeFile("D:\\" + fileObject.name, fileObject.resultData, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    FilesActions.savedFileComplete(fileObject);
                    FilesActions.convertNextFile();
                    console.log("The file was saved!");
                });
            } else {
                console.warn('Try: writeFile function is not defined!');
            }
        } catch (e) {
            console.warn('Catch: writeFile function is not defined! %o', e);
            // TODO: Для браузерного тестирования
            FilesActions.savedFileComplete(fileObject);
            FilesActions.convertNextFile();
        }
    }
};

var FilesActions = {
    // Добавить набор файлов в список исходных
    addFiles: Reflux.createAction(addFilesDef),
    /*selectFile: Reflux.createAction(),
    unSelectFile: Reflux.createAction(),*/
    // --
    // Сконвертировать следующий файл
    convertNextFile: Reflux.createAction(),
    // Вернет текущий прогресс процесса конвертации
    convertProgress: Reflux.createAction(),
    // Конвертация очередного набора данных завершена
    convertComplete: Reflux.createAction(),
    // --
    // Создать файл в списке результирующих файлов
    createResultFile: Reflux.createAction(),
    //progressResultFile: Reflux.createAction(),
    // Пост-обработка сконвертированных данных завершена - нужно перейти к их сохранению
    completeResultFile: Reflux.createAction(),
    // --
    // Сохранение файла на диске
    saveFile: Reflux.createAction(saveFileDef),
    // Уведомление о том, что файл сохранен
    savedFileComplete: Reflux.createAction(),

    // --
    targetFileName: Reflux.createAction()

};

module.exports = FilesActions;