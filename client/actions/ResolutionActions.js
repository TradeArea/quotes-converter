/**
 * Created by KlimMalgin on 27.03.2015.
 */

var Reflux = require('reflux');

var ResolutionActions = {

    emitResolutions: Reflux.createAction(),
    checkResolution: Reflux.createAction()

};

module.exports = ResolutionActions;