/**
 * Created by KlimMalgin on 16.03.2015.
 */


function getFileElem () {
    debugger;
    //return document.getElementById('fileElem');
    return document.getElementsByClassName('fileInput')[0];
}

/**
 *
 * - handleFiles
 * - dropbox
 * - button
 **/
function activate (options) {
    var fileElem = getFileElem();
    var dropbox = options.drugnDropSelect;
    var button = options.buttonSelect;

    addEvent('dragenter', dropbox, dragenter);
    addEvent('dragover', dropbox, dragover);
    addEvent('drop', dropbox, drop);
    addEvent('click', button, function (e) {
        debugger;
        if (fileElem) {
            fileElem.onchange = function (){
                options.handleFiles(filterFilesList(this.files));
            };
            fileElem.click();
        }
        e.preventDefault();
    });

    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;

        options.handleFiles(filterFilesList(files));
    }

}

function addEvent (evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
        elem.attachEvent("on"+evnt, func);
    }
    else {
        elem[evnt] = func;
    }
}

/**
 * ≈сли среди выбранного набора файлов встрет€тс€
 * не изображени€, то они будут удалены из массива
 **/
function filterFilesList (files) {
    var ln = files.length,
        result = [];

    for (var i = 0; i < ln; i++) {
        if (files[i] && files[i].name) {
            result.push(files[i]);
        }
    }

    return result;
}

module.exports = {
    chooseFilesActivate: activate
};
