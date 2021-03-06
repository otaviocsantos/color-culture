import 'mocha';

import { expect } from 'chai';

import { Color } from '../src/color';
import { CMYK, HSL, HSV, LAB, RGB, XYZ } from '../src/models';

describe('Color creation tests', () => {

  it('Should create a color from a string ', () => {
    const color = new Color('Yellow');
    expect(color.toString()).to.equal('rgb(255, 255, 0, 1)');
  });

  describe('Color Convert named tests', () => {
    const web = new Color("ReD");

    it('should convert named to an RGB color', () => {
      expect(web.toString()).to.equal("rgb(255, 0, 0, 1)");
    });

    it('should understand "transparent" as a named color', () => {
      expect(new Color('transparent').toString()).to.equal("rgb(0, 0, 0, 0)");
    });

    it('should convert rebeccapurple to 663399', () => {
      const rebecca = new Color("rebeccapurple");
      expect(rebecca.hex).to.equal("#663399");
    });

    it('should trim a named color and lower case a named color', () => {
      const rebecca = new Color("    rEbecCApurple ");
      expect(rebecca.hex).to.equal("#663399");
    });

    it('should convert to 8 digits hex when using hexa', () => {
      const rebecca = new Color([255, 128, 0, 0.5]);
      expect(rebecca.hexa).to.equal("#FF800080");
    });

    it('should discard alpha and convert to 6 digits hex when using hex', () => {
      const rebecca = new Color([255, 128, 0, 0.5]);
      expect(rebecca.hex).to.equal("#FF8000");
    });
  });


  it('String("#b284e0") should convert to RGB (178, 132, 224) using method to', () => {
    const color = new Color("#b284e0");
    const result = color.to(RGB.MODEL);
    const confirm = new RGB([178, 132, 224]);
    expect(result.channels[0]).to.be.within(confirm.channels[0] - 0.5, confirm.channels[0] + 0.5);
    expect(result.channels[1]).to.be.within(confirm.channels[1] - 0.5, confirm.channels[1] + 0.5);
    expect(result.channels[2]).to.be.within(confirm.channels[2] - 0.5, confirm.channels[2] + 0.5);

  });

  it('String("#b284e0FF") should convert to RGB (178, 132, 224, 1) using method to', () => {
    const color = new Color("#b284E0fF");
    const result = color.to(RGB.MODEL);
    const confirm = new RGB([178, 132, 224, 1]);
    expect(result.channels[0]).to.be.within(confirm.channels[0] - 0.5, confirm.channels[0] + 0.5);
    expect(result.channels[1]).to.be.within(confirm.channels[1] - 0.5, confirm.channels[1] + 0.5);
    expect(result.channels[2]).to.be.within(confirm.channels[2] - 0.5, confirm.channels[2] + 0.5);
    expect(result.channels[3]).to.equal(1);

  });


  it('String(" #b284e0FF  ") should trimmed and convert to RGB (178, 132, 224, 1) using method to', () => {
    const color = new Color(" #b284E0fF  ");
    const result = color.to(RGB.MODEL);
    const confirm = new RGB([178, 132, 224, 1]);
    expect(result.channels[0]).to.be.within(confirm.channels[0] - 0.5, confirm.channels[0] + 0.5);
    expect(result.channels[1]).to.be.within(confirm.channels[1] - 0.5, confirm.channels[1] + 0.5);
    expect(result.channels[2]).to.be.within(confirm.channels[2] - 0.5, confirm.channels[2] + 0.5);
    expect(result.channels[3]).to.equal(1);
  });

  it('String(" #b284e0CC  ") should trimmed and convert to RGB (178, 132, 224, 0.8) using method to', () => {
    const color = new Color(" #b284E0CC  ");
    const result = color.to(RGB.MODEL);
    const confirm = new RGB([178, 132, 224, 0.8]);
    expect(result.channels[0]).to.be.within(confirm.channels[0] - 0.5, confirm.channels[0] + 0.5);
    expect(result.channels[1]).to.be.within(confirm.channels[1] - 0.5, confirm.channels[1] + 0.5);
    expect(result.channels[2]).to.be.within(confirm.channels[2] - 0.5, confirm.channels[2] + 0.5);
    expect(result.channels[3]).to.equal(0.8);
  });

  it('Should create an RGB color from a hex value ', () => {
    const color = new Color('#C0FFEE', '', false);
    expect(color.toString()).to.equal('rgb(192, 255, 238, 1)');
  });

  it('Should create an RGB color with proper alpha from a hex value with 8 digits ', () => {
    const color = new Color('#C0FFEEFF', '', false);
    expect(color.toString()).to.equal('rgb(192, 255, 238, 1)');
  });

  it('Should create an RGB color with proper alpha from a hex value with 4 digits ', () => {
    const color = new Color('#FEDC', '', false);
    expect(color.toString()).to.equal('rgb(255, 238, 221, 0.8)');
  });

  it('Should create an RGB color from a hex value with 3 digits ', () => {
    const color = new Color('#ABC', '', false);
    expect(color.toString()).to.equal('rgb(170, 187, 204, 1)');
  });

  it('Should create an UNclamped RGB color from a string ', () => {
    const color = new Color('rgba(-255, 1255, -0.00001, 10)', '', false);
    expect(color.toString()).to.equal('rgb(-255, 1255, -0.00001, 10)');
  });

  it('Should create an clamped RGB color from a string ', () => {
    const color = new Color('rgba(-255, 1255, -0.00001, 10)');
    expect(color.toString()).to.equal('rgb(0, 255, 0, 1)');
  });

  it('Should create an clamped RGB color from a string ', () => {
    const color = new Color('rgba(100%, 50%, -0.0000%, 100%)');
    expect(color.toString()).to.equal('rgb(255, 128, 0, 1)');
  });

  it('Should create an clamped HSL color from a string ', () => {
    const color = new Color('hsl(370, 181, -0.0001, 1000)');
    expect(color.toString()).to.equal('hsl(10, 100, 0, 1)');
  });

  it('Should create an clamped HSL color from a string ', () => {
    const color = new Color('hsl(370deg, 182, -0.0001, 1000)');
    expect(color.toString()).to.equal('hsl(10, 100, 0, 1)');
  });

  it('Should create an clamped HSL color from a string ', () => {
    const color = new Color('hsl(1.5turn, 183, -0.0001, 1000)');
    expect(color.toString()).to.equal('hsl(180, 100, 0, 1)');
  });

  it('Should create an clamped HSL color from a string ', () => {
    const color = new Color('hsl(-1.5turn, 183, -0.0001, 1000)');
    expect(color.toString()).to.equal('hsl(180, 100, 0, 1)');
  });

  it('Should create an UNclamped HSL color from a string ', () => {
    const color = new Color('hsl(1.5turn, 183, -0.0001, 1000)', '', false);
    expect(color.toString()).to.equal('hsl(540, 183, -0.0001, 1000)');
  });

  it('Should create an CMYK color from a string ', () => {
    const color = new Color('cmyk(17, 37, 53, 7)');
    expect(color.toString()).to.equal('cmyk(17, 37, 53, 7, 1)');
  });

  it('Should add alpha value of 1 if none is defined in an CMYK color from a string ', () => {
    const color = new Color('cmyk(17.3, 37, 53, 7)');
    expect(color.toString()).to.equal('cmyk(17.3, 37, 53, 7, 1)');
  });

  it('Should create an UNclamped CMYK color from a string ', () => {
    const color = new Color('cmyk(-17, 377, 537, 777, 7)', '', false);
    expect(color.toString()).to.equal('cmyk(-17, 377, 537, 777, 7)');
  });

  it('Should create an clamped CMYK color from a string ', () => {
    const color = new Color('cmyk(177, -37, 531, -27, 1.1)');
    expect(color.toString()).to.equal('cmyk(100, 0, 100, 0, 1)');
  });


});


describe('Color presentation tests', () => {

  it('Should create an RGB color as an RGB string ', () => {
    const color = new Color('Yellow');
    expect(color.toString()).to.equal('rgb(255, 255, 0, 1)');
  });

  it('Should create a CMYK color as a CMYK string ', () => {
    const color = new CMYK('Yellow');
    expect(color.toString()).to.equal('cmyk(0, 0, 100, 0, 1)');
  });

  it('Should accept a color as parameter to create a color ', () => {
    const initial = new CMYK('Yellow');
    const color = new CMYK(initial);
    expect(color.toString()).to.equal('cmyk(0, 0, 100, 0, 1)');
  });

  it('Should accept a color as parameter to create a color ', () => {
    const initial = new HSV([350, 23, 55, 0.5]);
    const color = new HSV(initial);
    expect(color.toString()).to.equal('hsv(350, 23, 55, 0.5)');
  });

  it('Should accept a color as parameter to create a color ', () => {
    const initial = new HSV([350, 23, 55, 0.5]);
    const color = new Color(initial);
    expect(color.toString()).to.equal('hsv(350, 23, 55, 0.5)');
  });


  it('Should round color correctly ', () => {
    const color = new CMYK([0.5, 11.6666, 33.5555, 66.9999, 0.5 ]);
    const check = new CMYK([1, 12, 34, 67, 0.5 ]);
    expect(color.round().toString()).to.equal(check.toString());
  });


  it('Should round alpha when asked to ', () => {
    const color = new CMYK([0.5, 11.6666, 33.5555, 66.9999, 0.5 ]);
    const check = new CMYK([1, 12, 34, 67, 1 ]);
    expect(color.round(false, false).toString()).to.equal(check.toString());
  });

  it('Round should alter original instead of making a copy from when asked to ', () => {
    const color = new CMYK([0.5, 11.6666, 33.5555, 66.9999, 0.5 ]);
    const pointer = color.round(false);
    color.channels[0] = 14.5;
    color.channels[1] = 28.9;
    color.channels[2] = 36.7;
    expect(pointer.toString()).to.equal(color.toString());
  });

  it('Should present color with correct fraction digits ', () => {
    const color = new RGB([0.5, 11.6666, 33.252525, 0.5 ]);
    const check = 'rgb(0.50, 11.67, 33.25, 0.50)';
    expect(color.toFixed()).to.equal(check);
  });

  it('Should present color with correct fraction digits and skip alpha when asked to', () => {
    const color = new RGB([0.5, 11.6666, 33.252525, 0.5 ]);
    const check = 'rgb(0.50000, 11.66660, 33.25252, 0.5)';
    expect(color.toFixed(5,true)).to.equal(check);
  });

  it('Should present color with correct fraction digits', () => {
    const color = new CMYK([0.50005, 11.30035, 22.66665, 33.25256, 0.5 ]);
    const check = 'cmyk(0.5000, 11.3003, 22.6667, 33.2526, 0.5)';
    expect(color.toFixed(4,true)).to.equal(check);
  });

  

  // public toFixed(fractionDigits = 2, skipAlpha = false) 

});


describe('Color clone tests', () => {

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
    expect(result.toString()).to.equal('rgb(4, 3, 2, 1)');
  });

  it('Clone should not clamp if requested not to ', () => {

    const hsl = new HSL([-240, -20, 25, 0], false);
    const mod = hsl.clone(false);

    expect(mod.toString()).to.equal(hsl.toString());
    expect(mod.toString()).to.equal('hsl(-240, -20, 25, 0)');
  });


  it('Add should not clamp if requested not to ', () => {

    const hsl = new HSL([-240, -20, 5, 0], false);
    const mod = new HSL([-40, 20, 100, 10], false);
    const result = hsl.add(mod, false);

    expect(result.toString()).to.equal('hsl(-280, 0, 105, 10)');
  });
})

