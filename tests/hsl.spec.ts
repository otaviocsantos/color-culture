import { expect } from 'chai';
import 'mocha';

import { Color } from '../src/color';
import {Culture} from '../src/culture';
import { HSL, LAB, RGB, XYZ } from '../src/models';

describe('HSL tests', () => {
  it('should have HSL signature', () => {
    const color = new HSL([0, 0, 0, 1]);
    const result = HSL.MODEL;
    expect(result).to.equal(color.model);
    expect(result).to.equal('hsl');
    expect(color.model).to.equal('hsl');
  });
});

describe('HSL Convert tests', () => {
  const color = new HSL([0, 100, 50]);

  it('HSL (0, 100, 50) should convert to RGB(255, 0, 0) using function as', () => {
    const result = color.to(RGB.MODEL);
    const confirm = new RGB([255, 0, 0]);
    expect(result.toString()).to.equal(confirm.toString());

  });

});


