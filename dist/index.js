"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("regenerator-runtime/runtime.js");

var tfnode = _interopRequireWildcard(require("@tensorflow/tfjs-node"));

var tf = _interopRequireWildcard(require("@tensorflow/tfjs"));

var _tfjsConverter = require("@tensorflow/tfjs-converter");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var MODEL_URL = 'fastdepth_opset9_tfjs/model.json';

function loadRunModel() {
  return _loadRunModel.apply(this, arguments);
}

function _loadRunModel() {
  _loadRunModel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var handler, model, input, output;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            handler = tfnode.io.fileSystem(MODEL_URL);
            _context.next = 3;
            return tf.loadGraphModel(handler);

          case 3:
            model = _context.sent;
            console.log("Model loaded");
            input = tf.ones([1, 3, 480, 640], 'float32');
            _context.next = 8;
            return model.execute(input);

          case 8:
            output = _context.sent;
            console.log(output);
            output.print();
            console.log("Model run");

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadRunModel.apply(this, arguments);
}

loadRunModel(); //let output = runModel(model);