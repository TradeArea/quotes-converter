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
var ChooseFilesMixin = require('../../mixins/ChooseFilesMixin'),
    QuotesConverterMixin = require('../../mixins/QuotesConverterMixin'),
    FileReaderMixin = require('../../mixins/FileReaderMixin');

var FilesList = require('../FilesList/FilesList');

var fs = require('fs');

var MainGrid = React.createClass({

    mixins: [
        ListenerMixin,
        FileReaderMixin,
        ChooseFilesMixin,
        QuotesConverterMixin,
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

    createResultFileData: function (resultArray) {
        console.log(resultArray);

        var ln = resultArray.length,
            resultData = "";

        for (var i = 0;i<ln;i++) {
            resultArray[i] = resultArray[i].join(',');
        }

        resultData = resultArray.join('\n');
        debugger;
        fs.writeFile("./test.csv", resultData, function(err) {
            debugger;
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

    },

    fileDataAnalizer: function (e) {
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
            .convert()
            .done(this.createResultFileData);
    },

    handleClickButton: function () {
        var selectedFiles = this.state.files.filter(function(f) { return f.selected == true; }),
            ln = selectedFiles.length;

        /*!!ln &&
        this.createConverter()*/

        var file = selectedFiles[0].file,
            size = file.size - 1;

        this.createReader()
            .read(file)
            .range(0, size)
            .done(this.fileDataAnalizer)
            .go();
    },

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
                        <button onClick={this.handleClickButton} className="to-h1">Сконвертировать в H1</button>
                    </Col>
                    <Col className="right-col" md={5} xs={5} sm={5}>Right</Col>
                </Row>
            </div>
        );
    }

});

module.exports = MainGrid;