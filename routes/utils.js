"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var fs = require('fs');
var viewsPath = './views/';
var bodyParser = require('body-parser');
var crypto = require('crypto');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.get('/generateNonce', function (req, res) {
    var nonce = crypto.randomBytes(32).toString('hex');
    res.json({ nonce: nonce });
});
router.get('/verifyProvider', function (req, res) {
    fs.readFile(viewsPath + 'verifyProvider.html', 'utf-8', function (err, content) {
        if (err) {
            res.send('cannot acess page');
        }
        res.send(content);
    });
});
exports.default = router;
