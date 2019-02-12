var express = require('express');
var router = express.Router();

const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('video');
});

/**
 * 通过流将视频发给客户端
 */
router.get('/video1', function(req, res, next) {

    let path = './assets/sintel.mp4';
    let stat = fs.statSync(path);
    let fileSize = stat.size;

    let head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4'
    };
    //需要设置HTTP HEAD
    res.writeHead(200, head);

    fs.createReadStream(path)
        .pipe(res);

});

/**
 * 通过流将视频发给客户端： Partial Content
 * http://blog.csdn.net/lv18092081172/article/details/51457525
 */
router.get('/video', function(req, res, next) {
    let path = './assets/sintel.mp4';
    let stat = fs.statSync(path);
    let fileSize = stat.size;
    let range = req.headers.range;

    // fileSize 3332038

    if (range) {
        let parts = range.replace(/bytes=/, "").split("-");
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

        // end 在最后取值为 fileSize - 1 
        end = end > fileSize - 1 ? fileSize - 1 : end;

        let chunksize = (end - start) + 1;
        let file = fs.createReadStream(path, { start, end });
        let head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        let head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }

});

module.exports = router;
