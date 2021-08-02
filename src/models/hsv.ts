import { Color } from '../color';

export class HSV extends Color {
  public static readonly MODEL: string = 'hsv';
  public static readonly ALPHA_INDEX = 3;
  public static readonly RANGES = [
    [0, 360],
    [0, 100],
    [0, 100],
    [0, 1],
  ];

  constructor(value?: any, clampValues = true) {
    super(value, HSV.MODEL, clampValues);
  }
}
