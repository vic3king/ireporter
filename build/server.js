'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./src/controllers/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

app.use(_express2.default.json());
app.use('/', _express2.default.static('UI'));

app.post('/api/v1/user', _user2.default.createUser);
app.post('/api/v1/record', _user2.default.createRecord);
app.get('/api/v1/records', _user2.default.getAllRecords);
app.get('/api/v1/records/:id', _user2.default.getOneRecord);
app.put('/api/v1/:id/location', _user2.default.updatedLocation);
app.put('/api/v1/:id/comment', _user2.default.updatedComment);
app.delete('/api/v1/record/:id', _user2.default.deleteOneRecord);

// server
app.listen(port, function () {
  console.log('Server Started On Port ' + port);
});

exports.default = app;