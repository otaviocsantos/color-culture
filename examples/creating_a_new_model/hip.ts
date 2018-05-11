import { Color } from '../../src/models/color';
import { RGB } from '../../src/models/rgb';
/**
 * An example color model
 */
export class Hip extends Color {
  private _decimal = 0;

  constructor(val: number = 0) {
    super();
    this._decimal = val;
  }

  static readonly model: string = "HIP";

  get signature() {
    return Hip.model;
  }

  get decimal():number {
    return this._decimal;
  }

  set decimal(val: number) {
    this._decimal = val;
  }

  set value(val: Hip) {
    super.value = val;
    this.decimal = val.decimal;
  }

  toString(): string {
    return `decimal: ${this.decimal}`;
  }
}