/**
 * Created by KlimMalgin on 27.03.2015.
 */
'use strict';

var React = require('react');

/*var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;*/

var Bootstrap = require('react-bootstrap'),
    Row = Bootstrap.Row,
    Col = Bootstrap.Col;

var Resolutions = React.createClass({

    getDefaultProps: function () {
        return {
            resolutions: []
        };
    },

    renderResolutions: function () {
        return this.props.resolutions.map(this.renderResolutionItem);
    },

    renderResolutionItem: function (item) {
        return <div className="resolution-item">{item.name}</div>;
    },

    render: function () {
        return (
            <div className="resolutions-component">
                {this.renderResolutions()}
            </div>
        );
    }

});

module.exports = Resolutions;