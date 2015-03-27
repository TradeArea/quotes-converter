/**
 * Created by KlimMalgin on 27.03.2015.
 */

var Reflux = require('reflux');

var ResolutionStore = Reflux.createStore({
    init: function () {

        /**
         * ResolutionItem. Формат объекта-разрешения
         * {
         *  name: "H1",
         *  size: 60,
         *  checked: true
         * }
         * name - наименование разрешения
         * size - размер в минутах
         * checked - выбрано ли разрешение для преобразования
         */
        this.resolutions = [
            {
                name: 'M5',
                size: 5,
                checked: false
            },
            {
                name: 'M15',
                size: 15,
                checked: false
            },
            {
                name: 'M30',
                size: 30,
                checked: false
            },
            {
                name: 'H1',
                size: 60,
                checked: false
            },
            {
                name: 'H4',
                size: 240,
                checked: false
            },
            {
                name: 'D1',
                size: 1440,
                checked: false
            },
            {
                name: 'W1',
                size: 10080,
                checked: false
            },
            {
                name: 'MN',
                size: 40320,
                checked: false
            }
        ];

        //this.listenTo(FilesActions.createResultFile, this.handleCreateResultFile);
    },

    getDefaultData: function() {
        return this.resolutions;
    },

    update : function(resolutions) {
        this.trigger(this.resolutions = resolutions);
    }

});

module.exports = ResolutionStore;