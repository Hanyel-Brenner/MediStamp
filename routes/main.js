"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_app_1 = require("../src/db-control/prisma-app");
var user_1 = require("../src/models/user");
var express = require('express');
var router = express.Router();
var fs = require('fs');
var viewsPath = './db-views/';
var bodyParser = require('body-parser');
require('dotenv').config();
router.use(bodyParser.json());
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));
var session = require('express-session');
//router.set('trust proxy', 1) // trust first proxy
router.use(session({
    genid: function (req) {
        return crypto.randomUUID(); // use UUIDs for session IDs
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, expires: 18000 }
}));
/*async function verifySession(req, res, next){
    //1.session already exists, so we should verify if the sessionID belongs to an email on the database.
    //2.if so, just set authSucess = true in the request body and go to next.
    //3.if not, set authSucess = false in the request body, so the user will need to insert ther credentials to login and set the sessionID on the database.
    if(req.session.userEmail){
        const cookie:Cookie = await app.getCookie(req.sessionID);
        if(!cookie) {
            req.body.authSucess = false;
            next();
        }
        req.body.authSucess = true;
        next();
    }
    req.body.authSucess = false;
    next();
}*/
router.get('/endCookie', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("session before ending cookie : " + req.session);
        res.session = null;
        console.log("session after ending cookie : ", req.session);
        res.send();
        return [2 /*return*/];
    });
}); });
router.get('/getCookie', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cookie;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_app_1.default.getCookie(req.sessionID)];
            case 1:
                cookie = _a.sent();
                if (cookie) {
                    res.send(cookie);
                }
                res.send();
                return [2 /*return*/];
        }
    });
}); });
router.get('/', function (request, response) {
    fs.readFile(viewsPath + 'index.html', 'utf-8', function (err, html) {
        if (err != null) {
            response.status(500).send('Sorry, the server is out of order!');
        }
        response.send(html);
    });
});
router.get('/home', function (req, res) {
    fs.readFile(viewsPath + 'home.html', 'utf-8', function (err, content) {
        if (err != null) {
            res.status(500).send('Sorry, the server is out of order!');
        }
        res.send(content);
    });
});
router.get('/register', function (req, res) {
    fs.readFile(viewsPath + 'register.html', 'utf-8', function (err, content) {
        if (err != null) {
            res.status(500).send('Sorry, the server is out of  order!');
        }
        res.send(content);
    });
});
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, email, password;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, prisma_app_1.default.registerUser(new user_1.User(username, email, password))];
            case 1:
                _a.sent();
                res.send("<h1> username :" + username + "<h1/>" + "<h1> email : " + email + "<h1/>" + "<h1> password : " + password + "<h1/>");
                return [2 /*return*/];
        }
    });
}); });
router.get('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fs.readFile(viewsPath + 'login.html', 'utf-8', function (err, content) {
            if (err != null) {
                res.status(500).send('Sorry, the server is out of order!');
            }
            res.send(content);
        });
        return [2 /*return*/];
    });
}); });
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, authenticated, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, prisma_app_1.default.authenticateUser(email, password)];
            case 1:
                authenticated = _b.sent();
                if (!(authenticated == false)) return [3 /*break*/, 2];
                res.status(403).send('<p>login falhou</p>');
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, prisma_app_1.default.createCookie(email, req.sessionID)];
            case 3:
                _b.sent();
                _a = req.session;
                return [4 /*yield*/, prisma_app_1.default.getCookie(req.sessionID)];
            case 4:
                _a.userEmail = (_b.sent()).email;
                res.status(200).send('<p>usuario logou e cookie foi criado e mandado para o banco de dados</p>');
                _b.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get('/about', function (req, res) {
    fs.readFile(viewsPath + 'about.html', 'utf-8', function (err, content) {
        if (err != null) {
            res.status(500).send('Sorry, the server is out  of order!');
        }
        res.send(content);
    });
});
router.get('/policy', function (req, res) {
    fs.readFile(viewsPath + 'policy.html', 'utf-8', function (err, content) {
        if (err != null) {
            res.status(500).send('Sorry, the server is out  of order!');
        }
        res.send(content);
    });
});
exports.default = router;
