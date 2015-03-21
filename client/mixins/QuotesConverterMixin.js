/**
 * Created by KlimMalgin on 18.03.2015.
 */

var moment = require('moment');
var setImmediate = require('setimmediate');

if (setImmediate.constructor !== Function) {
    if (window && window.setImmediate) {
        setImmediate = window.setImmediate;
    }
}

var ConverterActions = require('../actions/ConverterActions');

/**
 * Когда вычисляем дату с которой начнем строить результирующий набор данных - какая-то начальная часть
 * исходных данных всегда отбрасывается. Это сделано просто потому, что так проще, чем вычислять с точностью
 * до минут начало результирующего массива.
 */

/**
 * Форматы даты и времени для указания в moment.js
 */
var dateFormat = "YYYY.MM.DD",  // 2000.05.30
    timeFormat = "HH:mm";       // 17:27

/**
 * Вернет timestamp-точку с которой нужно формировать массив преобразованных данных
 * @param realStartDate Дата с которогй доступны исходные данные
 * @param realStartTime Время с которого доступны исходные данные
 * @param resolution Целевое разрешение для преобразования данных
 * @returns {number} Timestamp с которого будет начинаться результирующий массив
 */
var getStartPoint = function (realStartDate, realStartTime, resolution) {
    var realStartPeriod = realStartDate + " " + realStartTime,
        timeFormatter = dateFormat + " " + timeFormat,
        realStartPeriodM = moment(realStartPeriod, timeFormatter);

    // TODO: Вычисляемое время отличается от ожидаемого на 3 часа. При вычислении нужно учитывать часовые пояса, UTC-время и прочее

    /**
     * Если целевое разрешение находится в пределах чата включительно,
     * то в исходных данных отбрасываем только первый час
     */
    if (resolution <= 60) {
        return realStartPeriodM.startOf('hour').add(1, 'hours').unix();
    }
    /**
     * Если же разрешение больше часа, то отбрасываем первый день
     */
    else {
        return realStartPeriodM.startOf('day').add(1, 'days').unix();
    }
};


function convertIteration (i, timeFormatter, timeItemPrev, resultArrayIndex, calculatePeriodStart, calculatePeriodEnd, resolutionSeconds, resultArray, callback) {
    var timeItem,
        current,
        LOGGED = false;
    //debugger;
    setImmediate(callback.bind({}, i, this.source.length));

    timeItem = moment(this.source[i][0] + " " + this.source[i][1], timeFormatter).unix();
    if (timeItem < this.startMoment) {
        LOGGED && console.log("> Пропускаем " + this.source[i][0] + " " + this.source[i][1]);
        //continue;
        i++;
        if (i < this.source.length) setImmediate((convertIteration).bind(this, i, timeFormatter, timeItemPrev, resultArrayIndex, calculatePeriodStart, calculatePeriodEnd, resolutionSeconds, resultArray, callback));
        else ConverterActions.convertComplete(resultArray);
        return;
    }
    timeItemPrev = i > 0 ? moment(this.source[i-1][0] + " " + this.source[i-1][1], timeFormatter).unix() : -1;

    // Если время обрабатываемого тика в пределах вычисляемого периода
    if (calculatePeriodStart < timeItem && timeItem < calculatePeriodEnd) {
        // Очередной элемент для обработки
        current = this.source[i];

        // Если элемент текущего периода еще небыл создан в массиве-приемнике
        if (!resultArray[resultArrayIndex]) {
            current[0] = moment.unix(calculatePeriodStart).format(dateFormat);
            current[1] = moment.unix(calculatePeriodStart).format(timeFormat);
            resultArray.push(current);
            LOGGED && console.log("Элемент отсутствует. Создаем: " + current[0] + " " + current[1] + ". Ln: " + resultArray.length);
        }
        // Если элемент уже существует
        else {
            if (parseFloat(resultArray[resultArrayIndex][3]) < parseFloat(current[3])) { resultArray[resultArrayIndex][3] = current[3]; }
            if (parseFloat(resultArray[resultArrayIndex][4]) > parseFloat(current[4])) { resultArray[resultArrayIndex][4] = current[4]; }
            resultArray[resultArrayIndex][5] = current[5];
            LOGGED && console.log("Элемент существует. Корректируем параметры.");
        }

    } else
    // Если очередной обрабатываемый тик вышел за пределы целевого диапазона
    if (timeItem >= calculatePeriodEnd) {
        // Переходим в следующий целевой диапазон
        // --
        current = null;

        /**
         * Здесь нужно не просто переходить к следующему диапазону, а проверять timeItem на отставание
         * от i-1 элемента на время меньшее чем targetResolution. Это нужно чтобы обработать
         * белые пятна в исходных данных и исключить появление фантомных элементов в массиве-приемнике
         */

        // Если timeItem отстает от предыдущего элемента на время не большее чем целевое разрешение (условие исключения белых пятен)
        if (timeItem - timeItemPrev <= resolutionSeconds) {
            LOGGED && console.log("Вышли за пределы диапазона. Меняем диапазон.");

            // обозначаем границы нового периода
            calculatePeriodStart = calculatePeriodEnd;
            calculatePeriodEnd = calculatePeriodStart + resolutionSeconds;

            // порядковый номер элемента в массиве-приемнике
            resultArrayIndex++;
        } else {
            LOGGED && console.info('>> История отсутствует! Перескакиваем через белое пятно. <<');

            // обозначаем границы нового периода
            calculatePeriodStart = getStartPoint(this.source[i][0], this.source[i][1], this.targetResolution);
            calculatePeriodEnd = calculatePeriodStart + resolutionSeconds;

            // порядковый номер элемента в массиве-приемнике
            resultArrayIndex++;
        }
    }
    i++;
    if (i < this.source.length) setImmediate((convertIteration).bind(this, i, timeFormatter, timeItemPrev, resultArrayIndex, calculatePeriodStart, calculatePeriodEnd, resolutionSeconds, resultArray, callback));
    else ConverterActions.convertComplete(resultArray);
}

module.exports = {

    createConverter: (function () {

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

            /**
             * Массив с результатами конвертации
             * @type {Array}
             */
            this.resultArray = [];

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
            this.startMoment = getStartPoint(this.source[0][0], this.source[0][1], this.targetResolution);
            //resolutionSeconds = this.targetResolution * 60;
            return this;
        };

        Converter.prototype.convert = function (callback) {
            this.prepare();
            var resolutionSeconds = this.targetResolution * 60,
                timeFormatter = dateFormat + " " + timeFormat,
                calculatePeriodStart = this.startMoment,
                calculatePeriodEnd = calculatePeriodStart + resolutionSeconds,
                ln = this.source.length,
                resultArrayIndex = 0,
                resultArray = [],
                timeItem, timeItemPrev,
                current,
                i = 0;
            var LOGGED = true;

            //           2    3    4   5
            // Date,Time,OPEN,HIGH,LOW,CLOSE,Volume
            LOGGED && console.info('Start convert');
            debugger;
            setImmediate((convertIteration).bind(this, i, timeFormatter, timeItemPrev, resultArrayIndex, calculatePeriodStart, calculatePeriodEnd, resolutionSeconds, resultArray, callback));

            //for (var i = 0;i<ln;i++) {  }

            // this.resultArray = resultArray;
            // callback(this.resultArray, this.source);

            return this;
        };

        /*Converter.prototype.done = function (callback) {
            callback(this.resultArray, this.source);
            return this;
        };*/

        return function () {
            return new Converter();
        };

    })()

};