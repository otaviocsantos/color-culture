import 'mocha';

import { expect } from 'chai';

import { HSV, RGB } from '../src/models';

describe('HSV tests', () => {
  it('should have HSV signature', () => {
    const color = new HSV([0, 100, 100, 1]);
    const result = HSV.MODEL;
    expect(result).to.equal(color.model);
    expect(result).to.equal('hsv');
    expect(color.model).to.equal('hsv');

  });
});

describe('HSV Convert tests', () => {

  it('HSV (0, 100, 100) should convert to RGB(255, 0, 0)', () => {
    const color = new HSV([0, 100, 100, 1]);
    const result = color.to(RGB.MODEL);
    const confirm = new RGB([255, 0, 0, 1]);
    expect(result.toString()).to.equal(confirm.toString());

  });


  it('RGB(255, 0, 0) should convert to  HSV (0, 100, 100)', () => {
    const color = new RGB([255, 0, 0, 1]);
    const result = color.to(HSV.MODEL);
    const confirm = new HSV([0, 100, 100, 1]);
    expect(result.toString()).to.equal(confirm.toString());

  });


  it('RGB(128, 128, 128, 0.5) should convert to  HSV (0, 0, 50, 0.5)', () => {
    const color = new RGB([128, 128, 128, 0.5]);
    const result = color.to(HSV.MODEL);
    const confirm = new HSV([0, 0, 50, 0.5]);

    expect(result.channels[0]).to.be.within(confirm.channels[0] - 0.5, confirm.channels[0] + 0.5);
    expect(result.channels[1]).to.be.within(confirm.channels[1] - 0.5, confirm.channels[1] + 0.5);
    expect(result.channels[2]).to.be.within(confirm.channels[2] - 0.5, confirm.channels[2] + 0.5);
    expect(result.channels[3]).to.equal(confirm.channels[3]);

  });

});


