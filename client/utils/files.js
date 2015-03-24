/**
 * Created by KlimMalgin on 25.03.2015.
 */


module.exports = {

    filesEqual: function (f1, f2) {
        return f1.file.name == f2.file.name && f1.file.size == f2.file.size;
    }

};