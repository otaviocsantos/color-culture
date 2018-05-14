import { expect } from 'chai';
import 'mocha';

import { Color } from '../src//models/color';
import { CSS } from '../src//models/css';
import { HSL } from '../src//models/hsl';
import { RGB } from '../src//models/rgb';
import { ColorCulture } from '../src';

let cc = new ColorCulture();

describe('HSL tests', () => {
  it('should have HSL signature', () => {
    let color = new HSL(0, 0, 0);
    var result = HSL.model;
    expect(result).to.equal(color.signature);
  });
});

describe('HSL Convert tests', () => {
  let color = new HSL(0, 100, 50);

  it('HSL (0, 100, 50) should convert to RGB(255, 0, 0) using function as', () => {
    var result = color.as(RGB);
    const confirm = new RGB(255, 0, 0);
    expect(result.toString()).to.equal(confirm.toString());

  });
});


