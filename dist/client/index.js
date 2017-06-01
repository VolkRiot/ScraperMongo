"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sample = _react2.default.createClass({
  displayName: "Sample",


  render: function render() {
    return _react2.default.createElement(
      "button",
      {
        className: "TestRun"
      },
      "Button"
    );
  }

}); /* eslint-disable no-console */
exports.default = Sample;