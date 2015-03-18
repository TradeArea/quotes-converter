/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';

var React = require('react/addons'),
    cs = React.addons.classSet;

var MainGrid = require('./MainGrid/MainGrid');

var Application = React.createClass({

    render: function () {
        var classes = {
            application : true
        };

        return (
            <div className={cs(classes)}>
                <MainGrid />
            </div>
        );
    }

});

module.exports = Application;