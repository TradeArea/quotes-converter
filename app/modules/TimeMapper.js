/**
 * Created by KlimMalgin on 15.03.2015.
 */

/**
 * Модуль для операций со временем
 * @type {{}}
 */
QC.modules.TimeMapper = (function () {
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

    return {
        getStartPoint: getStartPoint
    };
})();