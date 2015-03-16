/**
 * Created by KlimMalgin on 16.03.2015.
 */

QC.layout.SaveButtonCreator = (function () {

    var saveButton = $('#save-button-tpl').html();

    return function () {
        $APP.append(saveButton);
        return $('.save-btn');
    }

})();