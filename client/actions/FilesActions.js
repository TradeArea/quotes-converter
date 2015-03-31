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
            // TODO: ��� ����������� ������������
            FilesActions.savedFileComplete(fileObject);
            FilesActions.convertNextFile();
        }
    }
};

var FilesActions = {
    // �������� ����� ������ � ������ ��������
    addFiles: Reflux.createAction(addFilesDef),
    /*selectFile: Reflux.createAction(),
    unSelectFile: Reflux.createAction(),*/
    // --
    // ��������������� ��������� ����
    convertNextFile: Reflux.createAction(),
    // ������ ������� �������� �������� �����������
    convertProgress: Reflux.createAction(),
    // ����������� ���������� ������ ������ ���������
    convertComplete: Reflux.createAction(),
    // --
    // ������� ���� � ������ �������������� ������
    createResultFile: Reflux.createAction(),
    //progressResultFile: Reflux.createAction(),
    // ����-��������� ����������������� ������ ��������� - ����� ������� � �� ����������
    completeResultFile: Reflux.createAction(),
    // --
    // ���������� ����� �� �����
    saveFile: Reflux.createAction(saveFileDef),
    // ����������� � ���, ��� ���� ��������
    savedFileComplete: Reflux.createAction(),

    // --
    targetFileName: Reflux.createAction()

};

module.exports = FilesActions;