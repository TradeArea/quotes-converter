/**
 * Created by KlimMalgin on 16.03.2015.
 */
'use strict';

var React = require('react');
var FilesListItem = require('./FilesListItem');

var FilesList = React.createClass({

    getDefaultProps: function () {
        return {
            files: []
        };
    },

    prepareFilesList: function () {
        return this.props.files.map(this.createFilesListItem);
    },

    createFilesListItem: function (fileObject) {
        return <FilesListItem fileObject={fileObject} />;
    },

    render: function () {
        return (
            <ul className="files-list">
                {this.prepareFilesList()}
            </ul>
        );
    }

});

module.exports = FilesList;