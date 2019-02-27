import { expect } from 'chai';
import 'mocha';

import { Color } from '../src/color';
import { CMYK, HSL, LAB, RGB, XYZ } from '../src/models';

describe('Color string tests', () => {
  it('should return a corret toString value', () => {
    const color = new Color("#FF0000");
    color.alpha = 0.04;
    const result = color.toString();
    const confirm = 'rgb(255,0,0,0.04)';
    expect(result).to.equal(confirm);
  });
});

describe('Color tame values tests', () => {
  it('should keep values between 0 and 255, 0 and 1 for alpha', () => {
    const web = new Color('rgba( 265, -214, 13.1, -0.3 )');
    const result = web.toString();
    expect(result).to.equal('rgb(255,0,13.1,0)');
  });
});

describe('Color Convert named tests', () => {
  const web = new Color("ReD");

  it('should convert named to hex', () => {
    expect(web.toString()).to.equal("rgb(255,0,0,1)");
  });

  const rebecca = new Color("rebeccapurple");
  it('should convert rebeccapurple to 663399', () => {
    expect(rebecca.hex).to.equal("663399");
  });
});


describe('String("#b284e0") Convert to RGB tests', () => {
  const color = new Color("#b284e0");

  it('String("#b284e0") should convert to RGB (178, 132, 224) using method to', () => {
    const result = color.to(RGB.MODEL);
    const confirm = new RGB([178, 132, 224]);
    expect(result.channels[0]).to.be.within(confirm.channels[0] - 0.5, confirm.channels[0] + 0.5);
    expect(result.channels[1]).to.be.within(confirm.channels[1] - 0.5, confirm.channels[1] + 0.5);
    expect(result.channels[2]).to.be.within(confirm.channels[2] - 0.5, confirm.channels[2] + 0.5);

  });
});