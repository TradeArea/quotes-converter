/**
 * Created by KlimMalgin on 14.03.2015.
 */

QC.layout.ChooseAreaCreator = (function () {

    var chooseAreaCls = '.choose-area',
        $chooseArea = $('#choose-area-tpl').html();

    function createArea() {
        if (!$APP.find(chooseAreaCls).length) {
            $APP.append($chooseArea);
        }
    }

    function activateAreaEvents() {
        QC.mixins.ChooseFilesMixin.activate({
            drugnDropSelect: $(chooseAreaCls).get(0),
            buttonSelect: $(chooseAreaCls).get(0),
            handleFiles: QC.handlers.ChooseFilesHandler
        });
    }

    return function () {
        createArea();
        activateAreaEvents();
    };
})();