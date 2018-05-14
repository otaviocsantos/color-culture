import { expect } from 'chai';
import 'mocha';

import { Color } from '../src//models/color';
import { CSS } from '../src//models/css';
import { HSL } from '../src//models/hsl';
import { RGB } from '../src//models/rgb';
import { ColorCulture } from '../src';

let cc = new ColorCulture();

describe('RGB tests', () => {
  it('should have RGB signature', () => {
    let rgb = new RGB(0, 0, 0);
    var result = RGB.model;
    expect(result).to.equal(rgb.signature);
  });
});


describe('HSL Convert tests', () => {
  let color = new RGB(178, 132, 224);

  it('RGB(178, 132, 224) should convert to HSL (270, 60, 70) using function as', () => {
    var result = color.as(HSL);
    const confirm = new HSL(270, 60, 70);
    expect(result.toString()).to.equal(confirm.toString());

  });
});


