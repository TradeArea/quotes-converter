/** @jsx React.DOM */
/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';

require('setimmediate');

/**
 * Use setImmediate for scheduling tasks
 */
require('reflux').nextTick(window.setImmediate);

/**
 * fill action and store methods
 */
require('./actions/ActionMethods');


var React = require('react'),
    Application = require('./components/Application');

window.React = React;
React.renderComponent(<Application />, document.getElementsByClassName('main')[0]);