import { Color } from './color';
/**
 * RGB Color Model
 */
export declare class RGB extends Color {
    /**
   * internal Red value
   */
    private _r;
    /**
   * internal Green value
   */
    private _g;
    /**
   * internal Blue value
   */
    private _b;
    /**
     * Instantiate a new RGB color model Class
     * @param _r Red value, from 0 to 255
     * @param _g Green value, from 0 to 255
     * @param _b Blue value, from 0 to 255
     */
    constructor(_r?: number, _g?: number, _b?: number);
    /**
     * Read only string constant used to identify this color model
     */
    static readonly model: string;
    /**
     * Returns this color type model. For example a color instance of RGB class will return RGB.model, ie "RGB".
     */
    readonly signature: string;
    /**
   * get Red channel value
   */
    /**
   * set Red channel value
   */
    r: number;
    /**
   * get Green channel value
   */
    /**
   * set Green channel value
   */
    g: number;
    /**
   * get Blue channel value
   */
    /**
   * set Blue channel value
   */
    b: number;
    /**
   * Update r, g, b values using val parameter
   */
    value: RGB;
    /**
   * This class representation as a string, with h,s,l vals exposed.
   */
    toString(): string;
}
