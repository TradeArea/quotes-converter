/**
 * Created by KlimMalgin on 27.03.2015.
 */

var ActionMethods = require('reflux').ActionMethods;

/**
 * Returns handler function witch can be used for handle events
 *
 * @returns {Function}
 */
ActionMethods.handler = function() {
    var action = this,
        args = arguments,
        prevent = true;
    return function(event) {
        prevent && event ? event.preventDefault() : null;
        action.apply(null, args);
    }
};

