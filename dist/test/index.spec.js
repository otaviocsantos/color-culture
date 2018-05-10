"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const hsl_1 = require("../src//models/hsl");
const rgb_1 = require("../src//models/rgb");
const src_1 = require("../src");
let cc = new src_1.ColorCulture();
describe('RGB tests', () => {
    it('RGB should have RGB signature', () => {
        let rgb = new rgb_1.RGB(0, 0, 0);
        var result = rgb_1.RGB.model;
        chai_1.expect(result).to.equal(rgb.signature);
    });
});
describe('HSL tests', () => {
    it('HSL should have HSL signature', () => {
        let color = new hsl_1.HSL(0, 0, 0);
        var result = hsl_1.HSL.model;
        chai_1.expect(result).to.equal(color.signature);
    });
});
describe('Convert tests', () => {
    const rgb = new rgb_1.RGB(255, 0, 128);
    it('should convert rgb to hsl', () => {
        const result = rgb.to(hsl_1.HSL.model);
        const confirm = new hsl_1.HSL(330, 100, 50);
        chai_1.expect(result.toString()).to.equal(confirm.toString());
    });
});
describe('Convert tests', () => {
    const rgb = new rgb_1.RGB(255, 0, 128);
    it('should convert rgb to hsl using as', () => {
        var result = rgb.as(hsl_1.HSL);
        const confirm = new hsl_1.HSL(330, 100, 50);
        chai_1.expect(result.toString()).to.equal(confirm.toString());
    });
});
describe('control group', () => {
    it('if not even this one is passing something else is wrong...', () => {
        chai_1.expect(true).to.equal(true);
    });
});
