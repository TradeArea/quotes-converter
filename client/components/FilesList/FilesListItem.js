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
                    <Col md={7} xs={7} sm={7} className="name">{this.props.fileObject.file.name}</Col>
                    <Col md={5} xs={5} sm={5}>{this.props.fileObject.file.size}</Col>
                </Row>
                <Row>
                    <Col md={12} xs={12} sm={12}>Path</Col>
                </Row>
            </li>
        );
    }

});

module.exports = FilesListItem;