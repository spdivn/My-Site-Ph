
var fs = require('fs'),
    walkPath = 'app/img/',
    direct = 'img/',
    obj = {
        table: []
    };

var walk = function (dir, done) {
    fs.readdir(dir, function (error, list) {
        if (error) {
            return done(error);
        }

        var i = 0;

        (function next() {
            var file = list[i++];

            if (!file) {
                return done(null);
            }

            file = direct + '/' + file;

            fs.stat(file, function (error, stat) {

                if (stat && stat.isDirectory()) {
                    walk(file, function (error) {
                        next();
                    });
                } else {
                    console.log(file);
                    obj.table.push({ id: i, url: file });
                    next();
                }
            });
        })();
    });
};

process.argv.forEach(function (val, index, array) {
    if (val.indexOf('source') !== -1) {
        walkPath = val.split('=')[1];
    }
});

console.log('-------------------------------------------------------------');
console.log('processing...');
console.log('-------------------------------------------------------------');


walk(walkPath, function (error) {
    if (error) {
        throw error;
    } else {
        console.log('-------------------------------------------------------------');
        console.log('finished.');
        console.log('-------------------------------------------------------------');
        var json = JSON.stringify(obj);
        fs.writeFile('myjsonfile.json', json, 'utf8');
    }
});