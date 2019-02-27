import { Base } from '../base';
import { Color } from '../color';

export class HSL extends Color {
  public static readonly MODEL: string = 'hsl';
  public static readonly ALPHA_INDEX = 3;
  public static readonly RANGES = [[0, 360], [0, 100], [0, 100], [0, 1]];

  constructor(value?: any, clampValues = true) {
    super(value, clampValues, HSL.RANGES, HSL.MODEL, HSL.ALPHA_INDEX, (scope: Base) => {
      scope.channels[0] = ((scope.channels[0] % 360) + 360) % 360;
      for (let i = 1; i < scope.channels.length; i++) {
        scope.channels[i] =
          scope.ranges[i][0] > scope.channels[i]
            ? scope.ranges[i][0]
            : scope.ranges[i][1] < scope.channels[i]
            ? scope.ranges[i][1]
            : scope.channels[i];
      }
    });
  }
}
