"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("regenerator-runtime/runtime.js");

var fs = _interopRequireWildcard(require("fs"));

var tfnode = _interopRequireWildcard(require("@tensorflow/tfjs-node"));

var tf = _interopRequireWildcard(require("@tensorflow/tfjs"));

var _tfjsConverter = require("@tensorflow/tfjs-converter");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var MODEL_URL = 'fastdepth_opset9_v2_tfjs/model.json';

var readImage = function readImage(path) {
  var imageBuffer = fs.readFileSync(path);
  var tfimage = tfnode.node.decodeImage(imageBuffer);
  return tfimage;
};

var getTestImage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var image, reshaped_image, big_image, float_img;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            image = readImage("224x224-sample.jpg");
            console.log(image.shape);
            reshaped_image = tf.transpose(image, [2, 0, 1]);
            big_image = reshaped_image.reshape([1, 3, 224, 224]);
            float_img = big_image.asType('float32');
            return _context.abrupt("return", float_img.div(255));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getTestImage() {
    return _ref.apply(this, arguments);
  };
}();

var loadRunModel = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var handler, model, input, output, raw, outReshape, outResize, fileOut, fileOutPath;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            handler = tfnode.io.fileSystem(MODEL_URL);
            _context2.next = 3;
            return tf.loadGraphModel(handler);

          case 3:
            model = _context2.sent;
            console.log("Model loaded");
            _context2.next = 7;
            return getTestImage();

          case 7:
            input = _context2.sent;
            _context2.next = 10;
            return model.predict(input);

          case 10:
            output = _context2.sent;
            console.log(output);
            output.print();
            console.log("Model run");
            _context2.next = 16;
            return output.array();

          case 16:
            raw = _context2.sent;
            fs.writeFileSync('raw-depth.txt', raw);
            outReshape = tf.transpose(output, [2, 3, 1, 0]).reshape([224, 224, 1]);
            console.log(tf.max(outReshape));
            outResize = tf.mul(tf.div(outReshape, tf.max(outReshape)), 255).asType('int32');
            outResize.print();
            _context2.next = 24;
            return tfnode.node.encodeJpeg(outResize, 'grayscale');

          case 24:
            fileOut = _context2.sent;
            console.log(fileOut);
            fileOutPath = "output".concat(Date.now(), ".jpg");
            fs.writeFileSync(fileOutPath, fileOut);
            console.log("Output saved to ".concat(fileOutPath));

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function loadRunModel() {
    return _ref2.apply(this, arguments);
  };
}();

loadRunModel();