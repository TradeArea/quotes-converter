/**
 * Created by KlimMalgin on 31.03.2015.
 */
'use strict';

var Reflux = require('reflux');
var FilesActions = require('../actions/FilesActions');

var TargetFileNameStore = Reflux.createStore({
    init: function () {
        this.targetFileName = "";

        this.listenTo(FilesActions.targetFileName, this.changeTargetFileName);
    },

    getDefaultData: function() {
        return this.targetFileName;
    },

    update : function(fileName) {
        this.trigger(this.targetFileName = fileName);
    },

    changeTargetFileName: function (fileName) {
        this.update(fileName);
    }

});

module.exports = TargetFileNameStore;