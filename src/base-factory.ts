import { Base } from './base';

export class BaseFactory {
  public static create(
    values: any,
    doClamp: boolean,
    ranges: number[][],
    model: string,
    alphaIndex = 3,
    clampFunction: any = null,
  ) {
    const result = new Base(values, ranges, model, alphaIndex, clampFunction);
    if (doClamp) {
      result.clamp();
    }
    return result;
  }

  public static createRGB(values = [0, 0, 0, 1], doClamp = true): Base {
    const result = new Base(values, [[0, 255], [0, 255], [0, 255], [0, 1]], 'rgb', 3);
    if (doClamp) {
      result.clamp();
    }
    return result;
  }

  public static createHSL(values = [0, 0, 0, 1], doClamp = true): Base {
    const result = new Base(values, [[0, 360], [0, 100], [0, 100], [0, 1]], 'hsl', 3, (scope: Base) => {
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
    if (doClamp) {
      result.clamp();
    }
    return result;
  }
}
