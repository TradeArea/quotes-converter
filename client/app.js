/** @jsx React.DOM */
/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';


var React = require('react'),
    Application = require('./components/Application');

window.React = React;
React.renderComponent(<Application />, document.getElementsByClassName('main')[0]);