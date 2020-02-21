import { Base } from './base';
import { BaseFactory } from './base-factory';
import { Compute } from './compute';
import { Converter } from './converter';
import { Parser } from './parser';

export class Color {

  /**
   * get alpha channel value
   */
  get alpha(): number {
    return this.base.channels[this.base.alphaIndex];
  }

  /**
   * set alpha channel value
   */
  set alpha(value: number) {
    this.base.channels[this.base.alphaIndex] = value;
  }

  /**
   * returns position in the matrix that contains value for the alpha channel 
   */
  get alphaIndex(): number {
    return this.base.alphaIndex;
  }

  /**
   * returns colors and alpha values
   */
  get channels(): number[] {
    return this.base.channels;
  }

  /**
   * sets colors and alpha values
   */
  set channels(value: number[]) {
    if (value !== undefined) {
      this.base.channels = [...value];
    }
  }

  /**
   * Ranges of minium and maximum values channels may be set to.
   * Ranges are used when clamping said values.
   */
  get ranges(): any[] {
    return this.base.ranges;
  }

  /**
   * Returns this color type model. For example a color instance of RGB class will return RGB.MODEL, ie "rgb".
   */
  get model(): string {
    return this.base.model;
  }

  /**
   * CSS helper method
   * Clamp, ROUND and returns this color as a string using rgba as its model
   * Alpha value is not rounded, for obvious reasons
   */
  get rgba(): string {
    const c = this.to('rgb');
    let result = 'rgba(';
    for (let i = 0; i < 3; i++) {
      result += Math.round(c.channels[i]).toString() + ', ';
    }
    result += c.alpha.toString();
    result += ')';
    return result;
  }

  /**
   * Returns hexadecimal version of this color WITHOUT alpha channel
   */
  get hex(): string {
    const result = this.hexa;
    return result.substr(0, 7);
  }

  /**
   * Returns eight digits hexadecimal version of this color, last two digits represent the alpha channel
   */
  get hexa(): string {
    const rgb = this.to('rgb');

    let result = '';
    let asNumber = 0;

    for (let i = 0; i < 3; i++) {
      asNumber = rgb.channels[i]; // Color.clamp(Number(rgb.channels[i]), 0, 255, 0);
      result += ('0' + Number(asNumber.toFixed(0)).toString(16)).slice(-2).toUpperCase();
    }

    result += ('0' + Number((rgb.alpha * 255).toFixed(0)).toString(16)).slice(-2).toUpperCase();
    return '#' + result;
  }

  /**
   * Boolean, is this a dark color ?
   */
  get isDark(): boolean {
    return Compute.isDark(this);
  }

  /**
   * Boolean, is this a light color ?
   */
  get isLight(): boolean {
    return Compute.isLight(this);
  }

  public base: Base;

  /**
   * Create a new color.
   * @param value Values that will compose this color
   * @param model Model to which this color will be outputed.
   * @param clampValues Should channels values be kept with range? Defaults to true.
   */
  constructor(
    value?: any,
    model = 'rgb',
    clampValues = true,
  ) {
    if (model === '') {
      model = 'rgb';
    }

    if (value instanceof Base) {
      this.base = new Base(value.channels, value.ranges, value.model, value.alphaIndex, value.clampFunction);
    } else if (typeof value === 'string') {

      this.base = Parser.fromString(value.toString(), clampValues);
      if (model !== 'rgb') {
        this.base = this.to(model).base;
      }
    } else {
      this.base = BaseFactory.createGeneric(value, model, clampValues);
    }

    if (clampValues) {
      this.clamp(false);
    }
  }


  /**
   * Auxiliar method, convert a clone of this color to model and set this channel's value or return this channel's value
   * @param model model to which this color's clone should be converted
   * @param index channel's index
   * @param value channel's value
   * @param clampValues boolean, should this value be clamped ?
   */
  public channel(model: string = 'rgb', index: number = 0, value?: number, clampValues = true) {
    const clone = this.to(model, clampValues);

    if (value !== undefined) {
      clone.base.channels[index] = value;
      if (clampValues) {
        clone.base.channels[index] = Compute.clampValue(clone.channels[index], clone.ranges[index]);
      }
      return clone;
    }

    return clone.channels[index];
  }

  /**
   * Creates an RGB clone and set Red channel to value, or returns Red channel's value
   * @param value Red channel value
   * @param clampValues Keep value in range, defaults to true
   */
  public r(value?: number, clampValues = true): any {
    return this.channel('rgb', 0, value, clampValues);
  }

  /**
   * Creates an RGB clone and set Green channel to value, or returns Green channel's value
   * @param value Green channel value
   * @param clampValues Keep value in range, defaults to true
   */

  public g(value?: number, clampValues = true): any {
    return this.channel('rgb', 1, value, clampValues);
  }

  /**
   * Creates an RGB clone and set Blue channel to value, or returns Blue channel's value
   * @param value Blue channel value
   * @param clampValues Keep value in range, defaults to true
   */
  public b(value?: number, clampValues = true): any {
    return this.channel('rgb', 2, value, clampValues);
  }

  /**
   * Creates an HSL clone and set Hue channel to value, or returns Hue channel's value
   * @param value Hue channel value
   * @param clampValues Keep value in range, defaults to true
   */
  public h(value?: number, clampValues = true): any {
    const clone = this.to('hsl', clampValues);

    if (value !== undefined) {
      clone.base.channels[0] = value;
      if (clampValues) {
        clone.base.channels[0] = Compute.clampRotation(clone.channels[0]);
      }
      return clone;
    }

    return clone.channels[0];
  }

  /**
   * Creates an HSL clone and set Saturation channel to value, or returns Saturation channel's value
   * @param value Saturation channel value
   * @param clampValues Keep value in range, defaults to true
   */
  public s(value?: number, clampValues = true): any {
    return this.channel('hsl', 1, value, clampValues);
  }

  /**
   * Creates an HSL clone and set Lightness channel to value, or returns Lightness channel's value
   * @param value Lightness channel value
   * @param clampValues Keep value in range, defaults to true
   */
  public l(value?: number, clampValues = true): any {
    return this.channel('hsl', 2, value, clampValues);
  }

  /**
   * Clamp channels values based on color's own ranges
   * @param makeCopy True return a copy of this color, false just modify this color's channels
   */
  public clamp(makeCopy = true): Color {
    if (makeCopy) {
      return this.clone(true);
    } else {
      this.base.clamp();
      return this;
    }
  }

  /**
   * Return a copy of this color
   * @param clampValues Default is true, clamp channels this clone
   */
  public clone(clampValues = true): Color {
    return new Color(this.base, this.model, clampValues);
  }

  /**
   * Convert this color to another color model
   * @param model Model to which this color should be converted
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public to(model = '', clampValues = true): Color {
    const copy = this.clone(clampValues);
    copy.base = Converter.convert(copy.base, model, clampValues);
    return copy;
  }

  /**
   * Returns a copy of this color converted to  RGB model
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public rgb(clampValues = true): Color {
    return this.to('rgb', clampValues);
  }

  /**
   * Returns a copy of this color converted to HSL model
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public hsl(clampValues = true): Color {
    return this.to('hsl', clampValues);
  }

  /**
   * Returns a copy of this color converted to CMYK model
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public cmyk(clampValues = true): Color {
    return this.to('cmyk', clampValues);
  }

  /**
   * Returns a copy of this color converted to LAB model
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public lab(clampValues = true): Color {
    return this.to('lab', clampValues);
  }

  /**
   * Returns a copy of this color converted to LCH model
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public lch(clampValues = true): Color {
    return this.to('lch', clampValues);
  }

  /**
   * Returns a copy of this color converted to XYZ model
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public xyz(clampValues = true): Color {
    return this.to('xyz', clampValues);
  }

  /**
   * Returns  a new color after summing up this color channels to another's
   * @param other Second color that will be added to this
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public add(other: Color, clampValues = true): Color {
    return Compute.add(this, other, clampValues);
  }

  /**
   * Returns a new color after mixing this color to another by an x amount
   * 0 = this color, 0.5 halfway between the two, 1 = another color
   * @param other Second color that will be added to this
   * @param amount Amount by wich each color will be represented, default is 0.5 a perfect mix
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public mixChannels(other: Color, amount: number = 0.5, clampValues = true): Color {
    return Compute.mixChannels(this, other, amount, clampValues);
  }

  /**
   * Returns a new color after mixing this color to black by an x amount
   * 0 = this color, 0.5 halfway between the two, 1 = black
   * @param amount Amount by wich this color will turn black, default is 0.5
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public blacken(amount: number = 0.25, clampValues = true) {
    return this.mixChannels(
      new Color([0, 0, 0, this.alpha]),
      amount,
    );
  }

  /**
   * Returns a new color after mixing this color to white by an x amount
   * 0 = this color, 0.5 halfway between the two, 1 = white
   * @param amount Amount by wich this color will turn white, default is 0.5
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public whiten(amount: number = 0.25, clampValues = true) {
    return this.mixChannels(
      new Color([255, 255, 255, this.alpha]),
      amount,
    );
  }

  /**
   * Returns a new color after making this color lighter by an x amount
   * @param amount Amount by wich this color will be lighten, default is 0.5
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public lighten(amount: number = 0.25, clampValues = true) {
    return Compute.lighten(this, amount, clampValues);
  }

  /**
   * Returns a new color after making this color darker by an x amount
   * @param amount Amount by wich this color will be darker, default is 0.5
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public darken(amount: number = 0.25, clampValues = true) {
    return Compute.darken(this, amount, clampValues);
  }

  /**
   * Returns a new color after making a negative version of this color
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public negate(clampValues = true) {
    return Compute.negate(this, clampValues);
  }

  /**
   * Clones this color and returns a saturated version
   * @param amount How much should be changed 0 = no change, 1 = completly saturated
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public saturate(amount: number = 0.25, clampValues = true) {
    return Compute.saturate(this, amount, clampValues);
  }

  /**
   * Clones this color and returns a grayscale version
   * @param amount How much should be changed 0 = no change, 1 = only gray tones
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public desaturate(amount: number = 0.25, clampValues = true) {
    return Compute.desaturate(this, amount, clampValues);
  }

  /**
   * Clones this color and returns a desaturated version
   * @param amount How much should be changed 0 = no change, 1 = completly desaturated
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public grayscale(amount = 1, clampValues = true) {
    return Compute.grayscale(this, amount, clampValues);
  }

  /**
   * Clones this color as an HSL model and rotates Hue value amount degrees
   * @param amount degrees by which Hue should be rotate
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public rotate(amount: number = 180, clampValues = true) {
    return Compute.rotate(this, amount, clampValues);
  }

  /**
   * Calculates luma of this color
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public luma(clampValues = true) {
    return Compute.luma(this, clampValues);
  }

  public distance(other: Color, clampValues = true) {
    return Compute.distance(this, other, clampValues);
  }

  /**
   * String representation of this color
   */
  public toString(): string {
    return this.base.model + '(' + this.base.channels.join(', ') + ')';
  }

  /**
   * Returns channel value in fixed-point notation.
   * @param fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
   * @param skipAlpha Should alpha channel be ignored when values are processed.
   */
  public toFixed(fractionDigits = 2, skipAlpha = false) {
    const result = new Array<string>();
    this.channels.map((o, i) => {
      if (i !== this.alphaIndex) {
        result.push(o.toFixed(fractionDigits));
      } else {
        result.push(skipAlpha ? o.toString() : o.toFixed(fractionDigits));
      }
    });
    return this.base.model + '(' + result.join(', ') + ')';
  }


}
