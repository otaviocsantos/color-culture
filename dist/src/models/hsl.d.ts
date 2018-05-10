import { Color } from './color';
/**
 * HSL Color Model
 */
export declare class HSL extends Color {
    /**
     * internal Hue value
     */
    private _h;
    /**
     * internal Saturation value
     */
    private _s;
    /**
     * internal Lightness value
     */
    private _l;
    /**
     * Instantiate a new HSL color model Class
     * @param _h hue value, from 0 to 359
     * @param _s saturation value, from 0 to 100
     * @param _l lightness value, from 0 to 100
     */
    constructor(_h?: number, _s?: number, _l?: number);
    /**
       * Read only string constant used to identify this color model
       */
    static readonly model: string;
    /**
       * Returns this color type model. For example a color instance of HSL class will return HSL.model, ie "HSL".
       */
    readonly signature: string;
    /**
     * get Hue
     */
    /**
     * set Hue
     */
    h: number;
    /**
     * get Saturation
     */
    /**
     * set Saturation
     */
    s: number;
    /**
     * get Lightness
     */
    /**
     * set Lightness
     */
    l: number;
    /**
     * Update h,s,l vals using val parameter
     */
    value: HSL;
    /**
     * This class representation as a string, with h,s,l vals exposed.
     */
    toString(): string;
}
