import { expect } from 'chai';
import 'mocha';

import { Color } from '../src/color';
import { HSL, LAB, RGB, XYZ } from '../src/models';

describe('LAB tests', () => {
  it('should have LAB signature', () => {
    const color = new LAB([0, 0, 0]);

    expect(LAB.MODEL).to.equal('lab');
    expect(color.model).to.equal('lab');
    expect(color.model).to.equal(LAB.MODEL);
  });
});

describe('LAB Convert tests', () => {

  it('LAB (100, 0, 0) should convert to ≈RGB(255, 255, 255)', () => {
    const color = new LAB([100, 0, 0, 1]);
    const result = color.to(RGB.MODEL);
    const confirm = new RGB([255, 255, 255, 1]);
    expect(result.channels[0]).to.be.within(confirm.channels[0] - 0.5, confirm.channels[0] + 0.5);
    expect(result.channels[1]).to.be.within(confirm.channels[1] - 0.5, confirm.channels[1] + 0.5);
    expect(result.channels[2]).to.be.within(confirm.channels[2] - 0.5, confirm.channels[2] + 0.5);

  });

  it('LAB (0, 0, 0) should convert to RGB(0, 0, 0)', () => {
    const color = new LAB([0, 0, 0, 1]);
    const result = color.to(RGB.MODEL);
    const confirm = new RGB([0, 0, 0, 1]);
    expect(result.toString()).to.equal(confirm.toString());

  });
});