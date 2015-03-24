/**
 * Created by KlimMalgin on 18.03.2015.
 */

module.exports = (function () {

    function Reader() {
        this.beforeCallback = function () {};
        this.reader = null;
        this.fileObject = null;
        this.file = null;
        this.blob = null;
    }

    Reader.prototype.readFile = function (fileObject) {
        this.fileObject = fileObject;
        this.file = fileObject.file;
        this.reader = new FileReader();
        return this.range(0, this.file.size - 1);
    };

    Reader.prototype.beforeRead = function (beforeCallback) {
        this.beforeCallback = beforeCallback;
        return this;
    };

    Reader.prototype.range = function (startByte, endByte) {
        if (this.file.slice) {
            this.blob = this.file.slice(startByte, endByte + 1);
        } else
        if (this.file.webkitSlice) {
            this.blob = this.file.webkitSlice(startByte, endByte + 1);
        } else
        if (this.file.mozSlice) {
            this.blob = this.file.mozSlice(startByte, endByte + 1);
        }
        return this;
    };

    Reader.prototype.done = function (success, error) {
        this.reader.onloadend = function(evt) {
            if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                success && success.apply(this, arguments);
            } else {
                console.error('State is not DONE!');
                error && error.apply(this, arguments);
            }
        };
        return this.start();
    };

    Reader.prototype.start = function () {
        this.beforeCallback(this.fileObject);
        this.reader.readAsBinaryString(this.blob);
        return this;
    };




    return {
        createReader:function () {
            return new Reader();
        }
    };
})();