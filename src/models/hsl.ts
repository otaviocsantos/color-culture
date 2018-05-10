import { Color } from './color';
/**
 * HSL Color Model
 */
export class HSL extends Color {
  /**
   * internal Hue value
   */
  private _h = 0;
  /**
   * internal Saturation value
   */
  private _s = 0;
  /**
   * internal Lightness value
   */
  private _l = 0;

  /**
   * Instantiate a new HSL color model Class
   * @param _h hue value, from 0 to 359
   * @param _s saturation value, from 0 to 100
   * @param _l lightness value, from 0 to 100
   */
  constructor(_h: number = 0, _s: number = 0, _l: number = 0) {
    super();
    this.h = _h;
    this.s = _s;
    this.l = _l;
  }

  /**
	 * Read only string constant used to identify this color model
	 */
  static readonly model: string = "HSL";

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
  set h(val: number) {
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
  set s(val: number) {
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
  set l(val: number) {
    this._l = Math.round(val);
  }

  /**
   * Update h,s,l vals using val parameter
   */
  set value(val: HSL) {
    super.value = val;
    this.h = val.h;
    this.s = val.s;
    this.l = val.l;
  }

  /**
   * This class representation as a string, with h,s,l vals exposed.
   */
  toString(): string {
    return `h: ${this.h}, s: ${this.s}, l: ${this.l}`;
  }
}