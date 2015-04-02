/**
 * Created by KlimMalgin on 16.03.2015.
 */
'use strict';

var React = require('react');

var Bootstrap = require('react-bootstrap'),
    Row = Bootstrap.Row,
    Col = Bootstrap.Col;

var hcx = require('../../utils/hcx');

var FilesListItem = React.createClass({

    getDefaultProps: function () {
        return {
            fileObject: {}
        };
    },

    render: function () {
        var cls = {
            filesListItem: true,
            selected: !!this.props.fileObject.selected
        },
        progressCls = {
            progressBg: true,
            progressBar: true,
            progressBarStriped: true,
            active: true,
            visible: this.props.fileObject.progress
        };

        return (
            <li className={hcx(cls)}>
                <div className={hcx(progressCls)}></div>
                <Row>
                    <Col md={12} xs={12} sm={12} className="name">{this.props.fileObject.file.name}</Col>
                </Row>
            </li>
        );
    }

});

module.exports = FilesListItem;