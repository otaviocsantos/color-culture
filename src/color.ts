import { Base } from './base';
import { Compute } from './compute';
import { Converter } from './converter';
import { Parser } from './parser';

export class Color {

  public base: Base;

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

  get alphaIndex(): number {
    return this.base.alphaIndex;
  }

  get channels(): number[] {
    return this.base.channels;
  }

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
   * Clamp, and returns this color as a string using rgba as its model
   */
  get rgba(): string {
    return 'rgba(' + this.to('rgb').channels.join() + ')';
  }

  /**
   * returns hexadecimal version of this color WITHOUT alpha channel
   */
  get hex(): string {
    const result = this.hexa;
    return result.substr(0, 6);
  }

  /**
   * returns hexadecimal version of this color with alpha channel
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
    return result;
  }

  get isDark(): boolean {
    return Compute.isDark(this);
  }

  get isLight(): boolean {
    return Compute.isLight(this);
  }

  constructor(
    value?: any,
    clampValues = true,
    ranges: number[][] = [[0, 255], [0, 255], [0, 255], [0, 1]],
    model = 'RGB',
    alphaIndex = 3,
    clampFunction: any = null,
  ) {
    if (value instanceof Base) {
      this.base = new Base(value.channels, value.ranges, value.model, value.alphaIndex, value.clampFunction);
    } else if (typeof value === 'string') {
      this.base = Parser.fromString(value.toString(), clampValues);
    } else {
      this.base = new Base(value, ranges, model, alphaIndex, clampFunction);
    }

    if (clampValues) {
      this.clamp(false);
    }
  }

  public channel(model: string = 'rgb', index: number = 0, value?: number, doClamp = true) {
    const clone = this.to(model, doClamp);

    if (value !== undefined) {
      clone.base.channels[index] = value;
      if (doClamp) {
        clone.base.channels[index] = Compute.clampValue(clone.channels[index], clone.ranges[index]);
      }
      return clone;
    }

    return clone.channels[index];
  }

  /**
   * Creates an RGB clone and set Red channel to value, or returns Red channel's value
   * @param value Red channel value
   * @param doClamp Keep value in range, defaults to true
   */
  public r(value?: number, doClamp = true): any {
    return this.channel('rgb', 0, value, doClamp);
  }
  /**
   * Creates an RGB clone and set Green channel to value, or returns Green channel's value
   * @param value Green channel value
   * @param doClamp Keep value in range, defaults to true
   */
  public g(value?: number, doClamp = true): any {
    return this.channel('rgb', 1, value, doClamp);
  }
  /**
   * Creates an RGB clone and set Blue channel to value, or returns Blue channel's value
   * @param value Blue channel value
   * @param doClamp Keep value in range, defaults to true
   */
  public b(value?: number, doClamp = true): any {
    return this.channel('rgb', 2, value, doClamp);
  }

  /**
   * Creates an HSL clone and set Hue channel to value, or returns Hue channel's value
   * @param value Hue channel value
   * @param doClamp Keep value in range, defaults to true
   */
  public h(value?: number, doClamp = true): any {
    const clone = this.to('hsl', doClamp);

    if (value !== undefined) {
      clone.base.channels[0] = value;
      if (doClamp) {
        clone.base.channels[0] = Compute.clampRotation(clone.channels[0]);
      }
      return clone;
    }

    return clone.channels[0];
  }
  /**
   * Creates an HSL clone and set Saturation channel to value, or returns Saturation channel's value
   * @param value Saturation channel value
   * @param doClamp Keep value in range, defaults to true
   */
  public s(value?: number, doClamp = true): any {
    return this.channel('hsl', 1, value, doClamp);
  }

  /**
   * Creates an HSL clone and set Lightness channel to value, or returns Lightness channel's value
   * @param value Lightness channel value
   * @param doClamp Keep value in range, defaults to true
   */
  public l(value?: number, doClamp = true): any {
    return this.channel('hsl', 2, value, doClamp);
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
   * @param doClamp Default is true, clamp channels this clone
   */
  public clone(doClamp = true): Color {
    return new Color(this.base, doClamp);
  }

  /**
   * Convert this color to another color model
   * @param model Model to which this color should be converted
   * @param doClamp Default is true, clamp channels of the color returned
   */
  public to(model = '', doClamp = true): Color {
    const copy = this.clone(doClamp);
    copy.base = Converter.convert(copy.base, model, doClamp);
    return copy;
  }

  /**
   * Returns a copy of this color converted to  RGB model
   * @param doClamp Default is true, clamp channels of the color returned
   */
  public rgb(doClamp = true): Color {
    return this.to('rgb', doClamp);
  }

  /**
   * Returns a copy of this color converted to HSL model
   * @param doClamp Default is true, clamp channels of the color returned
   */
  public hsl(doClamp = true): Color {
    return this.to('hsl', doClamp);
  }

  /**
   * Returns a copy of this color converted to CMYK model
   * @param doClamp Default is true, clamp channels of the color returned
   */
  public cmyk(doClamp = true): Color {
    return this.to('cmyk', doClamp);
  }

  /**
   * Returns a copy of this color converted to LAB model
   * @param doClamp Default is true, clamp channels of the color returned
   */
  public lab(doClamp = true): Color {
    return this.to('lab', doClamp);
  }

  /**
   * Returns a copy of this color converted to XYZ model
   * @param doClamp Default is true, clamp channels of the color returned
   */
  public xyz(doClamp = true): Color {
    return this.to('xyz', doClamp);
  }

  public add(other: Color, doClamp = true): Color {
    return Compute.add(this, other, doClamp);
  }

  public mix(other: Color, amount: number = 0.5, doClamp = true): Color {
    return Compute.mix(this, other, amount, doClamp);
  }

  public blacken(amount: number = 0.25, doClamp = true) {
    return this.mix(
      new Color([0, 0, 0, this.alpha], doClamp, [[0, 255], [0, 255], [0, 255], [0, 1]], 'rgb', 3),
      amount,
    );
  }

  public whiten(amount: number = 0.25, doClamp = true) {
    return this.mix(
      new Color([255, 255, 255, this.alpha], doClamp, [[0, 255], [0, 255], [0, 255], [0, 1]], 'rgb', 3),
      amount,
    );
  }

  public lighten(amount: number = 0.25, doClamp = true) {
    return Compute.lighten(this, amount, doClamp);
  }

  public darken(amount: number = 0.25, doClamp = true) {
    return Compute.darken(this, amount, doClamp);
  }

  public negate(doClamp = true) {
    return Compute.negate(this, doClamp);
  }

  public saturate(amount: number = 0.25, doClamp = true) {
    return Compute.saturate(this, amount, doClamp);
  }

  public desaturate(amount: number = 0.25, doClamp = true) {
    return Compute.desaturate(this, amount, doClamp);
  }

  public grayscale(amount = 1, doClamp = true) {
    return Compute.grayscale(this, amount, doClamp);
  }

  public rotate(amount: number = 180, doClamp = true) {
    return Compute.rotate(this, amount, doClamp);
  }

  public luma(doClamp = true) {
    return Compute.luma(this, doClamp);
  }

  public toString(): string {
    return this.base.model + '(' + this.base.channels.join() + ')';
  }
}
