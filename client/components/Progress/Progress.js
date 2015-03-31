/**
 * Created by KlimMalgin on 28.03.2015.
 */
'use strict';

var React = require('react');

var Progress = React.createClass({

    getDefaultProps: function () {
        return {
            targetFileName: "",
            fileProgress: 0,
            totalProgress: 0
        };
    },

    renderProgress: function () {
        var styles = {
            width: this.props.fileProgress + "%"
        };
        /*return (<div className="progress-bar" role="progressbar" aria-valuenow={this.props.fileProgress} aria-valuemin="0" aria-valuemax="100" style={styles}>
            {this.props.fileProgress + "%"}
        </div>);*/
        return (<span>
            {this.props.fileProgress + "%"}
        </span>);
    },

    render: function () {
        return (
            <div className="progress-component">
                <div className="progress">
                    {this.renderProgress()}
                    <div className="file-name">{this.props.targetFileName}</div>
                </div>
            </div>
        );
    }

});

module.exports = Progress;