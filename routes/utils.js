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
var web3_1 = require("../src/setup/web3");
require('dotenv').config();
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
router.get('/getUserInformation/:address', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, web3_1.contract.methods.getUserInformation(req.params.address)
                    .call({ from: process.env.MY_WALLET })];
            case 1:
                user = _a.sent();
                console.log(user);
                res.send();
                return [2 /*return*/];
        }
    });
}); });
router.get('/getDoctorInformation/:address', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var doctor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, web3_1.contract.methods.getDoctorInformation(req.params.address)
                    .call({ from: process.env.MY_WALLET })];
            case 1:
                doctor = _a.sent();
                console.log(doctor);
                res.send();
                return [2 /*return*/];
        }
    });
}); });
router.get('/getHospitalInformation/:address', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hospital;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, web3_1.contract.methods.getEntityInformation(req.params.address)
                    .call({ from: process.env.MY_WALLET })];
            case 1:
                hospital = _a.sent();
                console.log(hospital);
                res.send();
                return [2 /*return*/];
        }
    });
}); });
router.get('/getRequestsToDoctor/:address', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, web3_1.contract.methods.findRequest(req.params.address)
                    .call({ from: req.params.address })];
            case 1:
                requests = _a.sent();
                console.log(requests);
                res.send();
                return [2 /*return*/];
        }
    });
}); });
router.get('/getCertificates', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, web3_1.contract.methods.getCertificate(req.params.address)
                    .call({ from: req.params.address })];
            case 1:
                requests = _a.sent();
                console.log(requests);
                res.send();
                return [2 /*return*/];
        }
    });
}); });
router.get('/verifyRole/:role/:address', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, web3_1.contract.methods.returnRole(req.params.role, req.params.address)
                    .call({ from: process.env.MY_WALLET })];
            case 1:
                result = _a.sent();
                console.log(result);
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
