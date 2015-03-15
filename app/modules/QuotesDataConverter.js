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
        this.startMoment = QC.modules.TimeMapper.getStartPoint(this.source[0][0], this.source[0][1], this.targetResolution);
            //resolutionSeconds = this.targetResolution * 60;
        return this;
    };

    Converter.prototype.convert = function () {
        this.prepare();
        var resolutionSeconds = this.targetResolution * 60,
            timeFormatter = dateFormat + " " + timeFormat,
            calculatePeriodStart = this.startMoment,
            calculatePeriodEnd = calculatePeriodStart + resolutionSeconds,
            ln = this.source.length,
            resultArrayIndex = 0,
            resultArray = [],
            timeItem, timeItemPrev,
            current;

        //           2    3    4   5
        // Date,Time,OPEN,HIGH,LOW,CLOSE,Volume
        console.info('Start convert');

        for (var i = 0;i<ln;i++) {
            timeItem = moment(this.source[i][0] + " " + this.source[i][1], timeFormatter).unix();
            if (timeItem < this.startMoment) {
                console.log("> Пропускаем " + this.source[i][0] + " " + this.source[i][1]);
                continue;
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
                    console.log("Элемент отсутствует. Создаем: " + current[0] + " " + current[1] + ". Ln: " + resultArray.length);
                }
                // Если элемент уже существует
                else {
                    if (parseFloat(resultArray[resultArrayIndex][3]) < parseFloat(current[3])) { resultArray[resultArrayIndex][3] = current[3]; }
                    if (parseFloat(resultArray[resultArrayIndex][4]) > parseFloat(current[4])) { resultArray[resultArrayIndex][4] = current[4]; }
                    resultArray[resultArrayIndex][5] = current[5];
                    console.log("Элемент существует. Корректируем параметры.");
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
                    console.log("Вышли за пределы диапазона. Меняем диапазон.");

                    // обозначаем границы нового периода
                    calculatePeriodStart = calculatePeriodEnd;
                    calculatePeriodEnd = calculatePeriodStart + resolutionSeconds;

                    // порядковый номер элемента в массиве-приемнике
                    resultArrayIndex++;
                } else {
                    console.info('>> История отсутствует! Перескакиваем через белое пятно. <<');

                    // обозначаем границы нового периода
                    calculatePeriodStart = QC.modules.TimeMapper.getStartPoint(this.source[i][0], this.source[i][1], this.targetResolution);
                    calculatePeriodEnd = calculatePeriodStart + resolutionSeconds;

                    // порядковый номер элемента в массиве-приемнике
                    resultArrayIndex++;
                }

            }

        }

        this.resultArray = resultArray;

        return this;
    };

    Converter.prototype.done = function (callback) {
        callback(this.resultArray);
        return this;
    };

    return function () {
        return new Converter();
    };

})();