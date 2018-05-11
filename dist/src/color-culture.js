"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert_1 = require("./convert");
const rgb_1 = require("./models/rgb");
const hsl_1 = require("./models/hsl");
const css_1 = require("./models/css");
/**
 * Color Culture, the shortest path between two colors
 */
class ColorCulture {
    /**
      * When Color Culture is instantiated it register basic conversion functions
      */
    constructor() {
        // include batteries, set conversion for commonly used color classes
        // Convert from RGB to HSL
        convert_1.Convert.register(rgb_1.RGB.model, hsl_1.HSL.model, function (rgb) {
            rgb = rgb;
            const fr = rgb.r / 255;
            const fg = rgb.g / 255;
            const fb = rgb.b / 255;
            const min = Math.min(fr, fg, fb);
            const max = Math.max(fr, fg, fb);
            const delta = max - min;
            let h = 0;
            let s;
            let l;
            if (max === min) {
                h = 0;
            }
            else if (fr === max) {
                h = (fg - fb) / delta;
            }
            else if (fg === max) {
                h = 2 + (fb - fr) / delta;
            }
            else if (fb === max) {
                h = 4 + (fr - fg) / delta;
            }
            h = Math.min(h * 60, 360);
            if (h < 0) {
                h += 360;
            }
            l = (min + max) / 2;
            if (max === min) {
                s = 0;
            }
            else if (l <= 0.5) {
                s = delta / (max + min);
            }
            else {
                s = delta / (2 - max - min);
            }
            let result = new hsl_1.HSL(h, s * 100, l * 100);
            return result;
        });
        // Convert from HSL to RGB
        if (!convert_1.Convert.has(hsl_1.HSL.model, rgb_1.RGB.model)) {
            convert_1.Convert.register(hsl_1.HSL.model, rgb_1.RGB.model, function (hsl) {
                let fh = hsl._h / 360;
                let fs = hsl._s / 100;
                let fl = hsl._l / 100;
                let t1;
                let t2;
                let t3;
                let val;
                if (fs === 0) {
                    val = fl * 255;
                    new rgb_1.RGB(val, val, val);
                }
                if (fl < 0.5) {
                    t2 = fl * (1 + fs);
                }
                else {
                    t2 = fl + fs - fl * fs;
                }
                t1 = 2 * fl - t2;
                let channel = [0, 0, 0];
                for (let i = 0; i < 3; i++) {
                    t3 = fh + 1 / 3 * -(i - 1);
                    if (t3 < 0) {
                        t3++;
                    }
                    if (t3 > 1) {
                        t3--;
                    }
                    if (6 * t3 < 1) {
                        val = t1 + (t2 - t1) * 6 * t3;
                    }
                    else if (2 * t3 < 1) {
                        val = t2;
                    }
                    else if (3 * t3 < 2) {
                        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
                    }
                    else {
                        val = t1;
                    }
                    channel[i] = val * 255;
                }
                const result = new rgb_1.RGB(channel[0], channel[1], channel[2]);
                return result;
            });
        }
        // Convert from CSS to RGB
        if (!convert_1.Convert.has(css_1.CSS.model, rgb_1.RGB.model)) {
            convert_1.Convert.register(css_1.CSS.model, rgb_1.RGB.model, function (css) {
                const hexVal = css.hexValue;
                const result = new rgb_1.RGB(parseInt(hexVal.substr(0, 2), 16), parseInt(hexVal.substr(2, 2), 16), parseInt(hexVal.substr(4, 2), 16));
                return result;
            });
        }
    }
    /**
     * Convenience method, provide conversion without the need to import Converter
     * @param from Color signature from wich the conversion will be made, eg: "RGB"
       * @param to Color signature to wich the conversion will be made, eg: "HSL"
       * @param func Function that does the color conversion
     */
    register(from, to, func) {
        convert_1.Convert.register(from, to, func);
    }
}
/**
 * this module version
 */
ColorCulture.version = '1.0.0';
exports.ColorCulture = ColorCulture;
