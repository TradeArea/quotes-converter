/**
 * Created by KlimMalgin on 16.03.2015.
 */

'use strict';

var React = require('react');

var Bootstrap = require('react-bootstrap'),
    Row = Bootstrap.Row,
    Col = Bootstrap.Col;

var ChooseFilesMixin = require('../../mixins/ChooseFilesMixin');

var MainGrid = React.createClass({

    mixins: [
        ChooseFilesMixin
    ],

    componentDidMount: function () {
        var selectedEl = document.getElementsByClassName('select-files-area')[0];
        this.chooseFilesActivate({
            drugnDropSelect: selectedEl,
            buttonSelect: selectedEl,
            handleFiles: this.chooseFilesHandler
        });
    },

    chooseFilesHandler: function () {
        debugger;
    },

    render: function () {
        return (
            <div className="grid-component">
                <Row>
                    <Col className="left-col" md={5} xs={5} sm={5}>Left</Col>
                    <Col className="center-col" md={2} xs={2} sm={2}>
                        Center
                        <div className="select-files-area">Выберите файлы</div>
                    </Col>
                    <Col className="right-col" md={5} xs={5} sm={5}>Right</Col>
                </Row>
            </div>
        );
    }

});

module.exports = MainGrid;