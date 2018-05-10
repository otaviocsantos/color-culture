import { Color } from './color';
/**
 * RGB Color Model
 */
export class RGB extends Color {
	/**
   * internal Red value
   */
	private _r = 0;
	/**
   * internal Green value
   */
	private _g = 0;
	/**
   * internal Blue value
   */
	private _b = 0;

	/**
	 * Instantiate a new RGB color model Class
	 * @param _r Red value, from 0 to 255
	 * @param _g Green value, from 0 to 255
	 * @param _b Blue value, from 0 to 255
	 */
	constructor(_r: number = 0, _g: number = 0, _b: number = 0) {
		super();
		this.r = _r;
		this.g = _g;
		this.b = _b;
	}

	/**
	 * Read only string constant used to identify this color model
	 */
	static readonly model: string = "RGB";

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
	set r(val: number) {
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
	set g(val: number) {
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
	set b(val: number) {
		this._b = val;
	}

	/**
   * Update r, g, b values using val parameter
   */
	set value(val: RGB) {
		super.value = val;
		this.r = val.r;
		this.g = val.g;
		this.b = val.b;
	}

	/**
   * This class representation as a string, with h,s,l vals exposed.
   */
	toString(): string {
		return `r: ${this.r}, g: ${this.g}, b: ${this.b}`;
	}
}