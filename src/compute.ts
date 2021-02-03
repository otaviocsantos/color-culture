import { BaseFactory } from '.';
import { Color } from './color';
import { Range } from './range';

export class Compute {
  /**
   * Clamp and return value to stay inside range
   * @param value Value to be clamped
   * @param range Two numbers array, index 0 is the minimum , index 1 is the maximum
   */
  public static clampValue(value: number, range: number[]): number {
    return range[0] > value ? range[0] : range[1] < value ? range[1] : value;
  }

  /**
   * Clamps a rotation between 0 and 360
   * @param value value to be clamped
   */
  public static clampRotation(value: number): number {
    if (value === Infinity || value === -Infinity) {
      return 0;
    }
    return ((value % 360) + 360) % 360;
  }

  public static add(source: Color, destiny: Color, clampValues = true): Color {
    const copy = source.to(destiny.model, false);
    copy.channels.map((o, i, l) => {
      l[i] = l[i] + destiny.channels[i];
    });
    if (clampValues) {
      copy.clamp(false);
    }
    return copy;
  }

  // According to https://sighack.com/post/averaging-rgb-colors-the-right-way, https://www.youtube.com/watch?v=LKnqECcg6Gw
  /**
   * Average color of the items in this Culture
   */
  public static average(values: Color[], model = 'rgb'): Color {
    if (values === undefined || values.length === 0) {
      throw new Error('Cannot compute average of an empty array of colors');
    }

    const result = new Color('transparent', model, false);
    values.map(e => {
      const color = e.to(model);
      result.channels.map((o, i) => {
        if (i !== result.alphaIndex) {
          result.channels[i] += color.channels[i] * color.channels[i];
        } else {
          result.alpha += color.alpha;
        }
      });
    });

    const size = values.length;

    result.channels.map((o, i) => {
      if (i !== result.alphaIndex) {
        result.channels[i] = result.channels[i] / size;
      } else {
        result.alpha = result.alpha / size;
      }
    });

    return result;
  }

  /**
   * Returns true if this is a dark color, false otherwise
   * @param value Color to be evaluated
   */
  public static isDark(value: Color): boolean {
    // YIQ equation from http://24ways.org/2010/calculating-color-contrast
    const copy = value.rgb();
    const yiq = (copy.channels[0] * 299 + copy.channels[1] * 587 + copy.channels[2] * 114) / 1000;
    return yiq < 128;
  }

  /**
   * Returns true if this is a light color, false otherwise
   * @param value Color to be evaluated
   */
  public static isLight(value: Color): boolean {
    return !Compute.isDark(value);
  }

  public static darken(color: Color, amount: number = 0.25, clampValues = true) {
    const hsl = color.to('hsl', clampValues);

    hsl.channels[2] -= hsl.channels[2] * amount;

    return hsl.to(color.model, clampValues);
  }

  public static desaturate(color: Color, amount: number = 0.25, clampValues = true) {
    const hsl = color.to('hsl', clampValues);
    hsl.channels[1] -= hsl.channels[1] * amount;
    return hsl.to(color.model, clampValues);
  }

  public static distance(source: Color, destiny: Color, clampValues = true): number {
    const s = source.lab(clampValues);
    const d = destiny.lab(clampValues);

    return Math.sqrt(
      Math.pow(s.channels[0] - d.channels[0], 2) +
        Math.pow(s.channels[1] - d.channels[1], 2) +
        Math.pow(s.channels[2] - d.channels[2], 2),
    );
  }

  public static fade(color: Color, amount = 1, clampValues = true) {
    const copy = color.clone(clampValues);
    color.alpha = copy.alpha - copy.alpha * amount;
    if (clampValues) {
      color.alpha = Compute.clampValue(color.alpha, color.ranges[color.alphaIndex]);
    }
    return color;
  }

  public static grayscale(color: Color, amount = 1, clampValues = true) {
    const rgb = color.to('rgb', clampValues);

    const gray = rgb.channels[0] * 0.21 * amount + rgb.channels[1] * 0.72 * amount + rgb.channels[2] * 0.07 * amount;
    rgb.channels = [gray, gray, gray, color.alpha];

    return rgb.to(color.model, clampValues);
  }

  public static interpolate(source: Color, destiny: Color, amount = 0.5, clampValues = true): Color {
    const copy = source.clone(false);
    destiny = destiny.to(copy.model, false);
    copy.channels.map((o, i, l) => {
      l[i] = l[i] + (destiny.channels[i] - l[i]) * amount;
    });
    if (clampValues) {
      copy.clamp(false);
    }
    return copy;
  }

  public static lighten(color: Color, amount: number = 0.25, clampValues = true) {
    const hsl = color.to('hsl', clampValues);
    hsl.channels[2] += hsl.ranges[2][1] * amount;
    return hsl.to(color.model, clampValues);
  }

  /**
   * Returns luma of a color
   * Following: https://www.itu.int/dms_pubrec/itu-r/rec/bt/R-REC-BT.601-7-201103-I!!PDF-E.pdf
   * @param color
   * @param clampValues
   */
  public static luma(color: Color, clampValues = true): number {
    const rgb = color.to('rgb', clampValues);
    return (
      Math.sqrt(
        0.299 * rgb.channels[0] * rgb.channels[0] +
          0.587 * rgb.channels[1] * rgb.channels[1] +
          0.114 * rgb.channels[2] * rgb.channels[2],
      ) / 255
    );
  }

  /**
   * Returns a new color after mixing this color to another by an x amount
   * 0 = this color, 0.5 halfway between the two, 1 = another color
   * Tries to approach values used by a CSS Gradient method, since it behaves differently
   * when any alpha channel is 0.
   * @param other Second color that will be added to this
   * @param amount Amount by which each color will be represented, default is 0.5 a perfect mix
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public static mix(source: Color, destiny: Color, amount = 0.5, clampValues = true): Color {
    let src: Color;
    let dest: Color;

    if (source.alpha === 0 || destiny.alpha === 0) {
      src = source.rgb(false);
      dest = destiny.rgb(false);

      for (let i = 0; i <= 2; i++) {
        src.channels[i] = src.channels[i] * source.alpha + dest.channels[i] * dest.alpha;
      }

      src.alpha = src.alpha + (dest.alpha - src.alpha) * amount;

      return src.to(source.model, clampValues);
    }

    src = source.lab(false);
    dest = destiny.lab(false);

    src.channels.map((o, i, l) => {
      l[i] = l[i] + (dest.channels[i] - l[i]) * amount;
    });

    return src.to(source.model, clampValues);
  }

  /**
   * Returns a new color after mixing this color to another by an x amount
   * 0 = this color, 0.5 halfway between the two, 1 = another color
   * @param other Second color that will be added to this
   * @param amount Amount by which each color will be represented, default is 0.5 a perfect mix
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public static mixChannels(source: Color, destiny: Color, amount = 0.5, clampValues = true): Color {
    const copy = source.clone(false);
    destiny = destiny.to(copy.model, false);
    copy.channels.map((o, i, l) => {
      l[i] = l[i] + (destiny.channels[i] - l[i]) * amount;
    });
    if (clampValues) {
      copy.clamp(false);
    }
    return copy;
  }

  /**
   * Returns a new color after making a negative version of this color
   * @param color source color
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public static negate(color: Color, clampValues = true) {
    const rgb = color.to('rgb', clampValues);
    for (let i = 0; i < 3; i++) {
      rgb.channels[i] = 255 - rgb.channels[i];
    }
    return rgb.to(color.model, clampValues);
  }

  public static opaque(color: Color, amount = 1, clampValues = true) {
    const copy = color.clone(clampValues);
    if (color.alpha !== 0) {
      color.alpha = copy.alpha + copy.alpha * amount;
    } else {
      color.alpha = amount;
    }

    if (clampValues) {
      color.alpha = Compute.clampValue(color.alpha, color.ranges[color.alphaIndex]);
    }
    return color;
  }

  /**
   * Return a random color in the desired model
   * @param model In which model the random color should be represented
   * @param clampValues
   */
  public static randomColor(model = 'rgb'): Color {
    const color = new Color([0, 0, 0, 1]).to(model);

    color.ranges.map((o, i, l) => {
      color.channels[i] = Compute.randomInRange(o[0], o[1]);
    });
    return color;
  }

  public static randomInRange(start: number, end: number): number {
    return Math.random() * (end - start) + start;
  }

  /**
   * Clones this color as an HSL model and rotates Hue value amount degrees
   * @param color source color
   * @param amount degrees by which Hue should be rotate
   * @param clampValues Default is true, clamp channels of the color returned
   */
  public static rotate(color: Color, amount: number = 180, clampValues = true) {
    const hsl = color.to('hsl', clampValues);
    let hue = hsl.channels[0];
    hue = (((hue + amount) % 360) + 360) % 360;
    hsl.channels[0] = hue;
    return hsl.to(color.model);
  }

  /**
   * Increase or decrease saturation in a color
   * @param color
   * @param amount between -1 and 1
   * @param clampValues
   */
  public static saturate(color: Color, amount: number = 0.25, clampValues = true) {
    const hsl = color.to('hsl', clampValues);
    if (hsl.channels[1] !== 0) {
      hsl.channels[1] += hsl.channels[1] * amount;
    } else {
      hsl.channels[1] = amount;
    }
    return hsl.to(color.model, clampValues);
  }

  /**
   * Increase or decrease contrast in a color
   * @param color
   * @param amount between -1 and 1
   * @param clampValues
   */
  public static contrast(color: Color, amount: number = 0.25, clampValues = true) {
    if (0 < -1 || amount > +1) {
      return new Error('contrast amount must be a number between 0 and +1');
    }

    const ranged = amount * 255;
    const factor = (259 * (ranged + 255)) / (255 * (259 - ranged));
    const result = new Color(
      [
        factor * (color.channels[0] - 127.5) + 127.5,
        factor * (color.channels[1] - 127.5) + 127.5,
        factor * (color.channels[2] - 127.5) + 127.5,
        color.channels[3],
      ],
      'rgb',
      clampValues,
    );

    return result.to(color.model, clampValues);
  }
}
