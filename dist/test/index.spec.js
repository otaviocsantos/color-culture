"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const css_1 = require("../src//models/css");
const hsl_1 = require("../src//models/hsl");
const rgb_1 = require("../src//models/rgb");
const src_1 = require("../src");
let cc = new src_1.ColorCulture();
describe('RGB tests', () => {
    it('should have RGB signature', () => {
        let rgb = new rgb_1.RGB(0, 0, 0);
        var result = rgb_1.RGB.model;
        chai_1.expect(result).to.equal(rgb.signature);
    });
});
describe('HSL tests', () => {
    it('should have HSL signature', () => {
        let color = new hsl_1.HSL(0, 0, 0);
        var result = hsl_1.HSL.model;
        chai_1.expect(result).to.equal(color.signature);
    });
});
describe('Convert tests', () => {
    const rgb = new rgb_1.RGB(255, 0, 128);
    it('should convert rgb to hsl', () => {
        //    var result: HSL = rgb.as(HSL);
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
describe('Convert CSS named tests', () => {
    const css = new css_1.CSS("ReD");
    it('should convert named to hex', () => {
        chai_1.expect(css.hexValue).to.equal("FF0000");
    });
    const rebecca = new css_1.CSS("rebeccapurple");
    it('should convert rebeccapurple to 663399', () => {
        chai_1.expect(rebecca.hexValue).to.equal("663399");
    });
});
describe('Convert CSS rgb(x,x,x) tests', () => {
    //according to:
    //https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
    const t0 = new css_1.CSS("rgb(255,0,153)");
    it('should convert rgb(255,0,153) to FF0099', () => {
        chai_1.expect(t0.hexValue).to.equal("FF0099");
    });
    const t1 = new css_1.CSS("rgb(255, 0, 153)");
    it('should convert rgb(255, 0, 153) to FF0099', () => {
        chai_1.expect(t1.hexValue).to.equal("FF0099");
    });
    const t4 = new css_1.CSS("rgb(100%,0%,60%)");
    it('should convert rgb(100%,0%,60%) to FF0099', () => {
        chai_1.expect(t4.hexValue).to.equal("FF0099");
    });
    const t5 = new css_1.CSS("rgb(100%, 0%, 60%)");
    it('should convert rgb(100%, 0%, 60%) to FF0099', () => {
        chai_1.expect(t5.hexValue).to.equal("FF0099");
    });
    it('should error on rgb(100%, 0, 60%). Don\'t mix integers and percentages', () => {
        chai_1.expect(function () {
            const t6 = new css_1.CSS("rgb(100%, 0, 60%)");
        }).to.throw(Error);
    });
    const t7 = new css_1.CSS("rgb(255 0 153)");
    it('Whitespace syntax should convert rgb(255 0 153) to FF0099', () => {
        chai_1.expect(t7.hexValue).to.equal("FF0099");
    });
    const t8 = new css_1.CSS("rgb(255 0 153 / 1)");
    it('Whitespace syntax should convert rgb(255 0 153 / 1) to FF0099 alpha 1', () => {
        chai_1.expect(t8.hexValue).to.equal("FF0099");
        chai_1.expect(t8.alpha).to.equal(1);
    });
    const t9 = new css_1.CSS("rgb(255 0 153 / 100%)");
    it('Whitespace syntax should convert rgb(255 0 153 / 100%) to FF0099 alpha 1', () => {
        chai_1.expect(t9.hexValue).to.equal("FF0099");
        chai_1.expect(t9.alpha).to.equal(1);
    });
    const t10 = new css_1.CSS("rgb(255, 0, 153, 1)");
    it('Functional syntax with alpha value should convert rgb(255, 0, 153, 1) to FF0099 alpha 1', () => {
        chai_1.expect(t10.hexValue).to.equal("FF0099");
        chai_1.expect(t10.alpha).to.equal(1);
    });
    const t11 = new css_1.CSS("rgb(255, 0, 153, 100%)");
    it('Functional syntax with alpha value should convert rgb(255, 0, 153, 100%) to FF0099 alpha 1', () => {
        chai_1.expect(t11.hexValue).to.equal("FF0099");
        chai_1.expect(t11.alpha).to.equal(1);
    });
    const t12 = new css_1.CSS("rgb(+255e0, 0.0e1, 152.9e0, 1e2%)");
    it('Functional syntax with floats value should convert rgb(+255e0, 0.0e1, 152.9e0, 1e2%) to FF0099 alpha 1', () => {
        chai_1.expect(t12.hexValue).to.equal("FF0099");
        chai_1.expect(t12.alpha).to.equal(1);
    });
});
describe('control group', () => {
    it('if not even this one is passing something else is wrong...', () => {
        chai_1.expect(true).to.equal(true);
    });
});
