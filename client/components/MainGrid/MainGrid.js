/**
 * Created by KlimMalgin on 16.03.2015.
 */

'use strict';

var React = require('react');

var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

var Bootstrap = require('react-bootstrap'),
    Row = Bootstrap.Row,
    Col = Bootstrap.Col;

var Resolutions = require('../Resolutions/Resolutions');

var FilesActions = require('../../actions/FilesActions');

var ChooseFilesMixin = require('../../mixins/ChooseFilesMixin');

var FilesList = require('../FilesList/FilesList');

var Progress = require('../Progress/Progress');

var ConverterController = require('../../ConverterController');

var MainGrid = React.createClass({

    mixins: [
        ListenerMixin,
        ChooseFilesMixin,
        Reflux.connect(ConverterController)
    ],

    componentDidMount: function () {
        var selectedEl = document.getElementsByClassName('select-files-area')[0];
        this.chooseFilesActivate({
            drugnDropSelect: selectedEl,
            buttonSelect: selectedEl,
            handleFiles: FilesActions.addFiles
        });
    },

    render: function () {
        return (
            <div className="grid-component">
                <Row>
                    <Col className="left-col" md={5} xs={5} sm={5}>
                        <FilesList files={this.state.sourceFiles} />
                    </Col>
                    <Col className="center-col" md={2} xs={2} sm={2}>
                        <div className="select-files-area">Выберите файлы</div>
                        <Resolutions resolutions={this.state.resolutions} />
                        <br/>
                        <button onClick={FilesActions.convertNextFile} className="to-h1">Сконвертировать в H1</button>
                    </Col>
                    <Col className="right-col" md={5} xs={5} sm={5}>
                        <FilesList files={this.state.resultFiles} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Progress fileProgress={this.state.convertProgress} />
                    </Col>
                </Row>
            </div>
        );
    }

});

module.exports = MainGrid;