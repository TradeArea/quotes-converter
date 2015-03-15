/**
 * Created by KlimMalgin on 15.03.2015.
 */

QC.modules.QuotesDataConverter = (function () {

    /**
     * Форматы даты и времени для указания в moment.js
     */
    var dateFormat = "YYYY.MM.DD",  // 2000.05.30
        timeFormat = "HH:mm";       // 17:27

    /** !!TODO!!
     * ВременнЫе расчеты рекомендуется проводить в timestamp-секундах.
     * - Вычисление целевого промежутка в секундах
     * - Проход по источнику в пределах целевого промежутка
     * - Соответствующие вычисления
     * !!TODO!!
     * @constructor
     */

    function Converter() {
        /**
         * Исходный массив данных для конвертации
         * @type {Array}
         */
        this.source = [];

        /**
         * Счетчик элементов в массив-приемнике. Инкрементируется когда все элементы исходного массива,
         * входящие в текущий временной промежуток посчитаны и скопированы в массив-приемник.
         * @type {number}
         */
        this.destinationCount = 0;

        /**
         * Счетчик элементов в исходном массиве. Инкрементируется на каждом элементе исходного массива.
         * @type {number}
         */
        this.sourceCount = 0;

        /**
         * Разрешение в которое нужно сконвертировать исходные данные.
         * В минутах.
         * @type {number}
         */
        this.targetResolution = 0;

        /**
         * Timestamp того момента с которого начнется набор сконвертированных данных
         * @type {number}
         */
        this.startMoment = -1;


        this.clear();
    }

    /**
     * Очистит все результаты вычислений.
     * Используется для подготовки к конвертации нового набора данных
     * @returns {Converter}
     */
    Converter.prototype.clear = function () {
        this.source = [];
        this.destinationCount = 0;
        this.sourceCount = 0;
        return this;
    };

    /**
     * Задает исходный массив данных для конвертации
     * @param options
     * @returns {Converter}
     */
    Converter.prototype.data = function (options) {
        this.source = options.sourceData || [];
        this.targetResolution = options.targetResolution || 0;
        return this;
    };

    /**
     * Производит все необходимые подготовительные работы перед конвертацией
     * @returns {Converter}
     */
    Converter.prototype.prepare = function () {
        this.startMoment = QC.modules.TimeMapper.getStartPoint(this.source[0][0], this.source[0][1], this.targetResolution);
            //resolutionSeconds = this.targetResolution * 60;
        return this;
    };

    Converter.prototype.convert = function () {
        this.prepare();
        var resolutionSeconds = this.targetResolution * 60,
            timeFormatter = dateFormat + " " + timeFormat,
            startPeriod = this.startMoment,
            ln = this.source.length,
            resultArray = [],
            timeItem;


        for (var i = 0;i<ln;i++) {
            timeItem = moment(this.source[i][0] + " " + this.source[i][1]).unix();

            //if () {}

        }


        return this;
    };


    return function () {
        return new Converter();
    };

})();