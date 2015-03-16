/**
 * Created by KlimMalgin on 16.03.2015.
 */

'use strict';

var React = require('react');

var Bootstrap = require('react-bootstrap'),
    Row = Bootstrap.Row,
    Col = Bootstrap.Col;

var MainGrid = React.createClass({

    render: function () {
        return (
            <div className="grid-component">
                <Row>
                    <Col className="left-col" md={5} xs={5} sm={5}>Left</Col>
                    <Col className="center-col" md={2} xs={2} sm={2}>Center</Col>
                    <Col className="right-col" md={5} xs={5} sm={5}>Right</Col>
                </Row>
            </div>
        );
    }

});

module.exports = MainGrid;