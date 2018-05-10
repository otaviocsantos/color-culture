import { ColorCulture } from '../color-culture';
import { Convert } from '../convert';
/**
 * Base Color class
 */
export class Color {
	/**
	 * Read only string constant used to identify this color model
	 */
	static readonly model: string = "";

	/**
	 * alpha channel internal property
	 */
	private _alpha = 1;

	/**
	 * get alpha channel value
	 */
	get alpha(): number {
		return this._alpha;
	}

	/**
	 * set alpha channel value
	 */
	set alpha(val: number) {
		this._alpha = val;
	}

	/**
	 * Returns this color type model. For example a color instance of RGB class will return RGB.model, ie "RGB".
	 */
	get signature(): string {
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
	set value(val: Color) {
		this.alpha = val.alpha;
	}

	/**
	 *  Typed conversion, returns the converted color to the model requested, 
	 *	eg: color.as(<RGB>) will return an RGB object
	 *  @value Type to which this color will be converted, eg: color_instance.as(HSL)
	 */
	as<T extends Color>(val: new () => T): T {
		return Convert.it(this, new val().signature) as T;
	}

	/**
	 * Convert this color to another color model
	 * @param value Color model to which this color will be converted, eg: color_instance.as(HSL.model)
	 */
	to(val: string): Color {
		return Convert.it(this, val);
	}

}