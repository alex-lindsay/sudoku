"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PencilMark_module_css_1 = require("./PencilMark.module.css");
var PencilMark = function (props) {
    return (<div className={[PencilMark_module_css_1.default.PencilMark, PencilMark_module_css_1.default["PencilMark" + props.number]].join(" ")}>
      {props.number}
    </div>);
};
exports.default = PencilMark;
