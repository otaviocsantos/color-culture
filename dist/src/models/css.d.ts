import { Color } from './color';
/**
 * CSS Color Model
 */
export declare class CSS extends Color {
    /**
     * internal original string value
     */
    private _value;
    private _hexValue;
    /**
     * Instantiate a new CSS color model Class
     * @param val string value, as the form of
     * _named: cyan, red, black, blue, green, white, yellow, etc...
     * hexadecimal: #000 | #FFFFFF
     * rgb|rgba : rgb(0,127,255) , rgba(255,0,127,0.1), rgb(0%,50%,100%)
     * hsl|hsla : hsl(0,0,0) , hsla(20,30,40,0.1), rgb(10%,20%,30%)
     */
    constructor(val?: string);
    private static _named;
    private static setNamedIndex();
    /**
       * Read only string constant used to identify this color model
       */
    static readonly model: string;
    /**
       * Returns this color type model. For example a color instance of HSL class will return HSL.model, ie "HSL".
       */
    readonly signature: string;
    /**
     * get original string value
     */
    /**
     * set string value
     */
    value: any;
    /**
     * get original string value parsed as a hexadecimal value, eg: abcdef
     */
    readonly hexValue: string;
    /**
     * This class representation as a string, with h,s,l vals exposed.
     */
    toString(): string;
}
