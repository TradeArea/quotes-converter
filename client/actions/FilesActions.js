/**
 * Created by KlimMalgin on 16.03.2015.
 */

var Reflux = require('reflux');

var addFilesDef = {
    preEmit : function(files) {
        var ss = files.map(function (item) {
            return {
                file: item
            };
        });
        return [ss];
    }
};


var FilesActions = {
    addFiles: Reflux.createAction(addFilesDef),
    selectFile: Reflux.createAction(),
    unSelectFile: Reflux.createAction(),
    // --
    createResultFile: Reflux.createAction(),
    completeResultFile: Reflux.createAction()
};

module.exports = FilesActions;