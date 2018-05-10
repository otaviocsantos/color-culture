"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
/**
 * HSL Color Model
 */
class HSL extends color_1.Color {
    /**
     * Instantiate a new HSL color model Class
     * @param _h hue value, from 0 to 359
     * @param _s saturation value, from 0 to 100
     * @param _l lightness value, from 0 to 100
     */
    constructor(_h = 0, _s = 0, _l = 0) {
        super();
        /**
         * internal Hue value
         */
        this._h = 0;
        /**
         * internal Saturation value
         */
        this._s = 0;
        /**
         * internal Lightness value
         */
        this._l = 0;
        this.h = _h;
        this.s = _s;
        this.l = _l;
    }
    /**
       * Returns this color type model. For example a color instance of HSL class will return HSL.model, ie "HSL".
       */
    get signature() {
        return HSL.model;
    }
    /**
     * get Hue
     */
    get h() {
        return this._h;
    }
    /**
     * set Hue
     */
    set h(val) {
        this._h = Math.round(val);
    }
    /**
     * get Saturation
     */
    get s() {
        return this._s;
    }
    /**
     * set Saturation
     */
    set s(val) {
        this._s = Math.round(val);
    }
    /**
     * get Lightness
     */
    get l() {
        return this._l;
    }
    /**
     * set Lightness
     */
    set l(val) {
        this._l = Math.round(val);
    }
    /**
     * Update h,s,l vals using val parameter
     */
    set value(val) {
        super.value = val;
        this.h = val.h;
        this.s = val.s;
        this.l = val.l;
    }
    /**
     * This class representation as a string, with h,s,l vals exposed.
     */
    toString() {
        return `h: ${this.h}, s: ${this.s}, l: ${this.l}`;
    }
}
/**
   * Read only string constant used to identify this color model
   */
HSL.model = "HSL";
exports.HSL = HSL;
