"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert_1 = require("../convert");
/**
 * Base Color class
 */
class Color {
    constructor() {
        /**
         * alpha channel internal property
         */
        this._alpha = 1;
    }
    /**
     * get alpha channel value
     */
    get alpha() {
        return this._alpha;
    }
    /**
     * set alpha channel value
     */
    set alpha(val) {
        this._alpha = val;
    }
    /**
     * Returns this color type model. For example a color instance of RGB class will return RGB.model, ie "RGB".
     */
    get signature() {
        /*
        could not use
        Object.getPrototypeOf(this).model <- Object.getPrototypeOf(this) returns an empty object as in RGB{} without properties nor methods
        this.constructor.name <- class changes names when minified
        */
        return Color.model;
    }
    /**
   * Update alpha value using val parameter
   */
    set value(val) {
        this.alpha = val.alpha;
    }
    /**
     *  Typed conversion, returns the converted color to the model requested,
     *	eg: color.as(<RGB>) will return an RGB object
     *  @value Type to which this color will be converted, eg: color_instance.as(HSL)
     */
    as(val) {
        return convert_1.Convert.it(this, new val().signature);
    }
    /**
     * Convert this color to another color model
     * @param value Color model to which this color will be converted, eg: color_instance.as(HSL.model)
     */
    to(val) {
        return convert_1.Convert.it(this, val);
    }
}
/**
 * Read only string constant used to identify this color model
 */
Color.model = "";
exports.Color = Color;
