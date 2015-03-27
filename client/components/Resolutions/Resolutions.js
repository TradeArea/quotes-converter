/**
 * Created by KlimMalgin on 27.03.2015.
 */
'use strict';

var React = require('react');

var hcx = require('../../utils/hcx');
/*var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;*/

var ResolutionActions = require('../../actions/ResolutionActions');

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
        //return <div className="resolution-item">{item.name}</div>;
        var cls = {
            btn: true,
            btnPrimary: true,
            active: item.checked
        };

        return (
            <div className="btn-group resolution-item" onClick={ResolutionActions.checkResolution.handler(item)}>
                <label className={hcx(cls)}>
                    {item.name}
                </label>
            </div>
        );
    },

    render: function () {
        return (
            <div className="resolutions-component" data-toggle="buttons">
                {this.renderResolutions()}
            </div>
        );
    }

});

module.exports = Resolutions;