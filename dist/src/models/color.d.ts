/**
 * Base Color class
 */
export declare class Color {
    /**
     * Read only string constant used to identify this color model
     */
    static readonly model: string;
    /**
     * alpha channel internal property
     */
    private _alpha;
    /**
     * get alpha channel value
     */
    /**
     * set alpha channel value
     */
    alpha: number;
    /**
     * Returns this color type model. For example a color instance of RGB class will return RGB.model, ie "RGB".
     */
    readonly signature: string;
    /**
   * Update alpha value using val parameter
   */
    value: Color;
    /**
     *  Typed conversion, returns the converted color to the model requested,
     *	eg: color.as(<RGB>) will return an RGB object
     *  @value Type to which this color will be converted, eg: color_instance.as(HSL)
     */
    as<T extends Color>(val: new () => T): T;
    /**
     * Convert this color to another color model
     * @param value Color model to which this color will be converted, eg: color_instance.as(HSL.model)
     */
    to(val: string): Color;
}
