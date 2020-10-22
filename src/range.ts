import { Color } from './color';

export class Range {
  public _steps = 0;
  /**
   * Number of divisions between start and end,
   * 0 for a continuous gradient,
   * 1 for a mix between 50% start - 50% end; 2 for start, 25%, 25%, end; 3 for start, 33%, 33%, 33%, end...
   */
  set steps(v: number) {
    if (v < 0 || isNaN(v) || Math.round(v) !== v) {
      throw new Error('Range: Invalid steps value');
    }
    this._steps = v;
  }
  get steps() {
    return this._steps;
  }

  /**
   * Color at start of range
   */
  public _start = new Color();
  set start(v: Color) {
    this._start = v;
  }
  get start() {
    return this._start;
  }

  /**
   * Color at end of range
   */
  public _end = new Color();
  set end(v: Color) {
    this._end = v;
  }
  get end() {
    return this._end;
  }

  public setValue(index: number, v: Color) {
    if ((index !== 0 && index !== 1) || isNaN(index)) {
      throw new Error('Range: Invalid index');
    }

    if (index === 0) {
      this.start = v;
    } else {
      this.end = v;
    }
  }
}
