import 'mocha';

import { expect } from 'chai';

import { Color } from '../src/color';
import { HSL, RGB, XYZ } from '../src/models';

describe('XYZ tests', () => {
  it('should have XYZ signature', () => {
    const color = new XYZ();
    const result = XYZ.MODEL;
    expect(result).to.equal(color.model);
    expect(result).to.equal('xyz');
  });
});


describe('XYZ Convert tests', () => {
  const white = new XYZ([100, 100, 100, 0]);
  const black = new XYZ([0, 0, 0, 0]);

  it('XYZ(100, 100, 100) should convert to RGB(255, 249, 244) using function to', () => {
    const result = white.to(RGB.MODEL);
    const confirm = new RGB([255, 249, 244, 0]);
    expect(white.toString()).to.equal('xyz(100, 100, 100, 0)');

    expect(result.channels[0]).to.be.within(confirm.channels[0] - 0.5, confirm.channels[0] + 0.5);
    expect(result.channels[1]).to.be.within(confirm.channels[1] - 0.5, confirm.channels[1] + 0.5);
    expect(result.channels[2]).to.be.within(confirm.channels[2] - 0.5, confirm.channels[2] + 0.5);

  });

  it('(0, 0, 0) should convert to RGB(0, 0, 0) using function as', () => {
    const converted = black.to(RGB.MODEL);
    const rgbBlack = new RGB([0, 0, 0, 0]);
    expect(converted.toString()).to.equal(rgbBlack.toString());

  });
});


