/**
 * Created by KlimMalgin on 15.03.2015.
 */

QC.modules.QuotesDataConverter = (function () {

    /**
     * Форматы даты и времени для указания в moment.js
     */
    var dateFormat = "YYYY.MM.DD",  // 2000.05.30
        timeFormat = "HH:mm",       // 17:27

        //startDay = moment(FileArray[0][0], "YYYY.MM.DD"),

        /**
         * Счетчик элементов в массив-приемнике. Инкрементируется когда все элементы исходного массива,
         * входящие в текущий временной промежуток посчитаны и скопированы в массив-приемник.
         * @type {number}
         */
        destinationCount = 0,

        /**
         * Счетчик элементов в исходном массиве. Инкрементируется на каждом элементе исходного массива.
         * @type {number}
         */
        sourceCount = 0;


    function Converter() {
        this.source = [];
    }

    /**
     * Задает исходный массив данных для конвертации
     * @param sourceData
     * @returns {Converter}
     */
    Converter.prototype.data = function (sourceData) {
        this.source = sourceData;
        return this;
    };


    return function (SourceQuotesData) {

    };

})();