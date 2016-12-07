(function () {
    'use strict';

    const express = require('express'),
        request = require('request'),
        path = require('path');

    // toggle for basic request console output
    // require('request-debug')(request);

    var app = express();

    app.use(express.static(path.join(__dirname, 'app')));

    app.use('/proxy', function(req, res) {
        var url = req.url.replace('/?url=','');
        req.pipe(request(url)).pipe(res);
    });

    app.listen(3000, function () {
        console.info('app listening on port ' + this.address().port);
    });

})();