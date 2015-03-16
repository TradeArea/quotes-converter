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

var SourceFilesStore = require('../../stores/SourceFilesStore');
var FilesActions = require('../../actions/FilesActions');
var ChooseFilesMixin = require('../../mixins/ChooseFilesMixin');

var FilesList = require('../FilesList/FilesList');

var MainGrid = React.createClass({

    mixins: [
        ListenerMixin,
        ChooseFilesMixin,
        Reflux.connect(SourceFilesStore, 'files')
    ],

    componentDidMount: function () {
        var selectedEl = document.getElementsByClassName('select-files-area')[0];
        this.chooseFilesActivate({
            drugnDropSelect: selectedEl,
            buttonSelect: selectedEl,
            handleFiles: FilesActions.addFiles
        });
    },

    /*chooseFilesHandler: function () {
        debugger;
        FilesActions.addFiles();
    },*/

    render: function () {
        return (
            <div className="grid-component">
                <Row>
                    <Col className="left-col" md={5} xs={5} sm={5}>
                        <FilesList files={this.state.files} />
                    </Col>
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