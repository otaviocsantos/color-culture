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


  /**
   * Creates a Base using the model defined in model parameter
   * @param values channel values
   * @param model channel values
   * @param doClamp if values should be clamped, default is true
   */
  public static createGeneric(values?:number[], model = 'rgb', doClamp = true): Base {
    switch (model) {
      case 'cmyk':
        return this.createCMYK(values!=null ? values : [0, 0, 0, 0, 1], doClamp);
      case 'hsl':
        return this.createHSL(values!=null ? values : [0, 0, 0, 1], doClamp);
      case 'lab':
        return this.createLAB(values!=null ? values : [0, 0, 0, 1], doClamp);
      case 'rgb':
        return this.createRGB(values!=null ? values : [0, 0, 0, 1], doClamp);
      case 'xyz':
        return this.createXYZ(values!=null ? values : [0, 0, 0, 1], doClamp);
    }
    throw new Error('BaseFactory cannot recognise creation parameters');
  }


  /**
   * Creates a Base using the RGB model
   * @param values channel values
   * @param doClamp if values should be clamped, default is true
   */
  public static createRGB(values = [0, 0, 0, 1], doClamp = true): Base {
    const result = new Base(values, [[0, 255], [0, 255], [0, 255], [0, 1]], 'rgb', 3);
    if (doClamp) {
      result.clamp();
    }
    return result;
  }

  /**
   * Creates a Base using the HSL model
   * @param values channel values
   * @param doClamp if values should be clamped, default is true
   */
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

  /**
   * Creates a Base using the CMYK model
   * @param values channel values
   * @param doClamp if values should be clamped, default is true
   */
  public static createCMYK(values = [0, 0, 0, 0, 1], doClamp = true): Base {
    const result = new Base(values, [[0, 100], [0, 100], [0, 100], [0, 100], [0, 1]], 'cmyk', 4, (scope: Base) => {

      for (let i = 0; i < scope.channels.length; i++) {
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

  /**
   * Creates a Base using the LAB model
   * @param values channel values
   * @param doClamp if values should be clamped, default is true
   */
  public static createLAB(values = [0, 0, 0, 1], doClamp = true): Base {
    const result = new Base(values, [[0, 100], [-128, 128], [-128, 128], [0, 1]], 'lab', 3, (scope: Base) => {

      for (let i = 0; i < scope.channels.length; i++) {
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

  /**
   * Creates a Base using the XYZ model
   * @param values channel values
   * @param doClamp if values should be clamped, default is true
   */
  public static createXYZ(values = [0, 0, 0, 1], doClamp = true): Base {
    const result = new Base(values, [[0, 100], [0, 100], [0, 100], [0, 1]], 'xyz', 3, (scope: Base) => {

      for (let i = 0; i < scope.channels.length; i++) {
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
