/**
 * Created by KlimMalgin on 16.03.2015.
 */
'use strict';

var React = require('react');

var Bootstrap = require('react-bootstrap'),
    Row = Bootstrap.Row,
    Col = Bootstrap.Col;

var FilesListItem = React.createClass({

    getDefaultProps: function () {
        return {
            file: {}
        };
    },

    render: function () {
        return (
            <li className="files-list-item">
                <Row>
                    <Col md={7} xs={7} sm={7} className="name">{this.props.file.name}</Col>
                    <Col md={5} xs={5} sm={5}>{this.props.file.size}</Col>
                </Row>
                <Row>
                    <Col md={12} xs={12} sm={12}>Path</Col>
                </Row>
            </li>
        );
    }

});

module.exports = FilesListItem;