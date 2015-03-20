/**
 * Created by KlimMalgin on 18.03.2015.
 */

module.exports = (function () {

    function Reader() {
        this.reader = null;
        this.file = null;
        this.blob = null;
    }

    Reader.prototype.read = function (file) {
        this.file = file;
        this.reader = new FileReader();
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

    Reader.prototype.done = function (callback) {
        this.reader.onloadend = function(evt) {
            if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                callback.apply(this, arguments);
            } else {
                console.error('State is not DONE!');
            }
        };
        return this;
    };

    Reader.prototype.go = function (beforeRead) {
        beforeRead && beforeRead(this.file);
        this.reader.readAsBinaryString(this.blob);
        return this;
    };




    return {
        createReader:function () {
            return new Reader();
        }
    };
})();