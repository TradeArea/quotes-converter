/**
 * Created by KlimMalgin on 28.03.2015.
 */

module.exports = {
    mapper: function (resolutionItem) {
        return resolutionItem.size;
    },

    filter: function (resolutions) {
        return resolutions.filter(function (item) {
            return !!item.checked;
        })
        .map(function (item) {
            return item.size;
        });
    }
};