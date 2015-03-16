/** @jsx React.DOM */
/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';


var React = require('react'),
    Router = require('./components/Router');

window.React = React;
debugger;
React.renderComponent(<Router />, document.getElementsByClassName('main')[0]);