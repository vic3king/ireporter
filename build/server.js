'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _renderui = require('./src/controllers/renderui');

var _renderui2 = _interopRequireDefault(_renderui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
// server.js
var app = (0, _express2.default)();
// eslint-disable-next-line import/no-cycle


app.use(_express2.default.json());

app.get('/api/v1/ui', _renderui2.default);

app.get('/', function (req, res) {
  return res.status(200).send();
});

app.listen(3000);
console.log('app running on port ', 3000);

exports.default = app;