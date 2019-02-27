import { expect } from 'chai';
import 'mocha';

import { Color } from '../src/color';
import { HSL, LAB, RGB, XYZ } from '../src/models';

describe('XYZ tests', () => {
  it('should have XYZ signature', () => {
    const color = new LAB([0, 0, 0]);

    expect(LAB.MODEL).to.equal('lab');
    expect(color.model).to.equal('lab');
    expect(color.model).to.equal(LAB.MODEL);
  });
});

