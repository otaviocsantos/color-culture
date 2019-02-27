
import { BaseFactory } from '../src/base-factory';
import { Color } from '../src/color';
import { CMYK, HSL, RGB, XYZ } from '../src/models';


import { expect } from 'chai';
import 'mocha';


describe('RGB Convert tests', () => {
  const color = new RGB([178, 132, 224, 1]);

  it('RGB(178, 132, 224) should convert to HSL (270, 60, 70) using method to', () => {
    const result = color.to(HSL.MODEL);
    const confirm = new HSL([270, 60, 70, 1]);
    expect(result.channels[0]).to.be.within(confirm.channels[0] - 0.5, confirm.channels[0] + 0.5);
    expect(result.channels[1]).to.be.within(confirm.channels[1] - 0.5, confirm.channels[1] + 0.5);
    expect(result.channels[2]).to.be.within(confirm.channels[2] - 0.5, confirm.channels[2] + 0.5);

  });
});

describe('RGB Convert tests', () => {
  const color = new RGB([255, 255, 255, 1]);

  it('RGB(255, 255, 255) should convert to XYZ (95,100,109) using method to', () => {
    const result = color.to(XYZ.MODEL);
    // result.clamp(false);
    const confirm = new XYZ([95, 100, 100, 1]);

    expect(result.channels[0]).to.be.within(confirm.channels[0] - 0.5, confirm.channels[0] + 0.5);
    expect(result.channels[1]).to.be.within(confirm.channels[1] - 0.5, confirm.channels[1] + 0.5);
    expect(result.channels[2]).to.be.within(confirm.channels[2] - 0.5, confirm.channels[2] + 0.5);


  });
});

describe('RGB Convert tests', () => {
  const color = new RGB([0, 0, 0]);

  it('RGB(0, 0, 0) should convert to XYZ (0, 0, 0) using method to', () => {
    const result = color.to(XYZ.MODEL);
    const confirm = new XYZ([0, 0, 0]);
    expect(result.toString()).to.equal(confirm.toString());

  });
});

describe('RGB Convert tests', () => {
  const color = new RGB([255, 255, 0, 1]);

  it('RGB(255, 255, 0) should convert to CMYK (0, 0, 100, 0) using function to', () => {
    const result = color.to(CMYK.MODEL);
    const confirm = new CMYK([0, 0, 100, 0, 1]);
    expect(result.toString()).to.equal(confirm.toString());

  });
});