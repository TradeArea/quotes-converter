/**
 * Created by KlimMalgin on 27.03.2015.
 */

var Reflux = require('reflux');

var ResolutionActions = require('../actions/ResolutionActions');

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

        this.listenTo(ResolutionActions.emitResolutions, this.handleEmitResolutions);
        this.listenTo(ResolutionActions.checkResolution, this.handleCheckResolution);
    },

    getDefaultData: function() {
        return this.resolutions;
    },

    update : function(resolutions) {
        this.trigger(this.resolutions = resolutions);
    },

    /**
     * Уведомляем подписчиков о текущем состоянии стора
     */
    handleEmitResolutions: function () {
        this.update(this.resolutions);
    },

    handleCheckResolution: function (resolutionItem) {
        var rr = this.resolutions,
            ln = rr.length;

        for (var i = 0;i<ln;i++) {
            if (rr[i].name == resolutionItem.name) {
                rr[i].checked = !rr[i].checked;
            }
        }

        this.update(rr);
    }

});

module.exports = ResolutionStore;