import { expect } from 'chai';
import 'mocha';

import { Color } from '../src/color';
import { CMYK, HSL, LAB, RGB, XYZ } from '../src/models';

describe('Color tests', () => {

  it('should clone', () => {
    const color = new RGB([98, 76, 54, 0.5]);
    const result = color.clone();
    expect(result.toString()).to.equal(color.toString());
  });

  it('clone should not affect original', () => {
    const color = new RGB([98, 76, 54, 0.5]);
    const original = color.toString();
    const result = color.clone();
    const clone = result.toString();
    result.channels = [4, 3, 2, 1];
    expect(result.toString()).to.not.equal(color.toString());
    expect(original).to.equal(clone);
    expect(result.toString()).to.not.equal(clone);
    expect(result.toString()).to.equal('rgb(4,3,2,1)');
  });

  it('Clone should not clamp if requested not to ', () => {

    const hsl = new HSL([-240, -20, 25, 0], false);
    const mod = hsl.clone(false);

    expect(mod.toString()).to.equal(hsl.toString());
    expect(mod.toString()).to.equal('hsl(-240,-20,25,0)');
  });


  it('Add should not clamp if requested not to ', () => {

    const hsl = new HSL([-240, -20, 5, 0], false);
    const mod = new HSL([-40, 20, 100, 10], false);
    const result = hsl.add(mod, false);

    expect(result.toString()).to.equal('hsl(-280,0,105,10)');
  });
});
