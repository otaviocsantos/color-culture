"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
/**
 * RGB Color Model
 */
class RGB extends color_1.Color {
    /**
     * Instantiate a new RGB color model Class
     * @param _r Red value, from 0 to 255
     * @param _g Green value, from 0 to 255
     * @param _b Blue value, from 0 to 255
     */
    constructor(_r = 0, _g = 0, _b = 0) {
        super();
        /**
       * internal Red value
       */
        this._r = 0;
        /**
       * internal Green value
       */
        this._g = 0;
        /**
       * internal Blue value
       */
        this._b = 0;
        this.r = _r;
        this.g = _g;
        this.b = _b;
    }
    /**
     * Returns this color type model. For example a color instance of RGB class will return RGB.model, ie "RGB".
     */
    get signature() {
        return RGB.model;
    }
    /**
   * get Red channel value
   */
    get r() {
        return this._r;
    }
    /**
   * set Red channel value
   */
    set r(val) {
        this._r = val;
    }
    /**
   * get Green channel value
   */
    get g() {
        return this._g;
    }
    /**
   * set Green channel value
   */
    set g(val) {
        this._g = val;
    }
    /**
   * get Blue channel value
   */
    get b() {
        return this._b;
    }
    /**
   * set Blue channel value
   */
    set b(val) {
        this._b = val;
    }
    /**
   * Update r, g, b values using val parameter
   */
    set value(val) {
        super.value = val;
        this.r = val.r;
        this.g = val.g;
        this.b = val.b;
    }
    /**
   * This class representation as a string, with h,s,l vals exposed.
   */
    toString() {
        return `r: ${this.r}, g: ${this.g}, b: ${this.b}`;
    }
}
/**
 * Read only string constant used to identify this color model
 */
RGB.model = "RGB";
exports.RGB = RGB;
