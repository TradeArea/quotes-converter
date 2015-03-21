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

var FilesActions = require('../../actions/FilesActions'),
    ConverterActions = require('../../actions/ConverterActions');

var SourceFilesStore = require('../../stores/SourceFilesStore'),
    ResultFilesStore = require('../../stores/ResultFilesStore');

var ChooseFilesMixin = require('../../mixins/ChooseFilesMixin'),
    QuotesConverterMixin = require('../../mixins/QuotesConverterMixin'),
    FileReaderMixin = require('../../mixins/FileReaderMixin');

var FilesList = require('../FilesList/FilesList');

var MainGrid = React.createClass({

    mixins: [
        ListenerMixin,
        FileReaderMixin,
        ChooseFilesMixin,
        QuotesConverterMixin,
        Reflux.connect(SourceFilesStore, 'files'),
        Reflux.connect(ResultFilesStore, 'resultFiles'),
        Reflux.listenTo(FilesActions.convertNextFile, 'convertNextFile'),
        Reflux.listenTo(ConverterActions.convertComplete, 'convertComplete')
    ],

    getInitialState: function () {
        return {
            cFile: null
        };
    },

    componentDidMount: function () {
        var selectedEl = document.getElementsByClassName('select-files-area')[0];
        this.chooseFilesActivate({
            drugnDropSelect: selectedEl,
            buttonSelect: selectedEl,
            handleFiles: FilesActions.addFiles
        });
    },

    createResultFileData: function (resultArray) {
        var sourceFile = this.state.cFile;
        console.log(resultArray);

        var ln = resultArray.length,
            resultData = "";

        for (var i = 0;i<ln;i++) {
            resultArray[i] = resultArray[i].join(',');
        }

        resultData = resultArray.join('\n');
        FilesActions.completeResultFile(sourceFile.file, resultData);
    },

    fileDataAnalizer: function (file, e) {
        var FileArray = e.target.result.split('\n'),
            faLn = FileArray.length;

        for (var i = 0; i<faLn; i++) {
            FileArray[i] = FileArray[i].split(',');
        }

        this.createConverter()
            .data({
                sourceData: FileArray,
                targetResolution: 60
            })
            .convert(/*this.createResultFileData.bind(this, file)*/);
    },

    readFile: function (fileObject) {
        var file = fileObject.file,
            size = file.size - 1;

        this.createReader()
            .read(file)
            .range(0, size)
            .done(this.fileDataAnalizer.bind(this, file))
            .go(FilesActions.createResultFile);
    },

    convertComplete: function (resultArray) {
        this.createResultFileData(resultArray);
    },

    convertNextFile: function () {
        var selectedFiles = this.state.files.filter(function(f) { return f.selected == true; }),
            ln = selectedFiles.length;
        debugger;
        if (!!ln) {
            this.setState({
                cFile: selectedFiles[0]
            });
            this.readFile(selectedFiles[0]);
        }
    },

    render: function () {
        //var disabledButtonState = !!this.state.files.filter(function(f) { return f.selected == true; }).length ? "enabled": "disabled";
        return (
            <div className="grid-component">
                <Row>
                    <Col className="left-col" md={5} xs={5} sm={5}>
                        <FilesList files={this.state.files} />
                    </Col>
                    <Col className="center-col" md={2} xs={2} sm={2}>
                        <div className="select-files-area">Выберите файлы</div>
                        <button onClick={FilesActions.convertNextFile} className="to-h1">Сконвертировать в H1</button>
                    </Col>
                    <Col className="right-col" md={5} xs={5} sm={5}>
                        <FilesList files={this.state.resultFiles} />
                    </Col>
                </Row>
            </div>
        );
    }

});

module.exports = MainGrid;