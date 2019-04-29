import { expect } from 'chai';
import 'mocha';

import { Color } from '../src/color';
import { CMYK, HSL, LAB, RGB, XYZ } from '../src/models';

describe('Color creation tests', () => {

  it('Should create a color from a string ', () => {
    const color = new Color('Yellow');
    expect(color.toString()).to.equal('rgb(255,255,0,1)');
  });

  describe('Color Convert named tests', () => {
    const web = new Color("ReD");
  
    it('should convert named to hex', () => {
      expect(web.toString()).to.equal("rgb(255,0,0,1)");
    });
  
    it('should convert rebeccapurple to 663399', () => {
    const rebecca = new Color("rebeccapurple");
    expect(rebecca.hex).to.equal("663399");
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

  it('Should create an UNclamped RGB color from a string ', () => {
    const color = new Color('rgba(-255,1255,-0.00001,10)', false);
    expect(color.toString()).to.equal('rgb(-255,1255,-0.00001,10)');
  });

  it('Should create an clamped RGB color from a string ', () => {
    const color = new Color('rgba(-255,1255,-0.00001,10)', true);
    expect(color.toString()).to.equal('rgb(0,255,0,1)');
  });

  it('Should create an clamped RGB color from a string ', () => {
    const color = new Color('rgba(100%,50%,-0.0000%,100%)', true);
    expect(color.toString()).to.equal('rgb(255,128,0,1)');
  });

  it('Should create an clamped HSL color from a string ', () => {
    const color = new Color('hsl(370,181,-0.0001,1000)', true);
    expect(color.toString()).to.equal('hsl(10,100,0,1)');
  });

  it('Should create an clamped HSL color from a string ', () => {
    const color = new Color('hsl(370deg,182,-0.0001,1000)', true);
    expect(color.toString()).to.equal('hsl(10,100,0,1)');
  });

  it('Should create an clamped HSL color from a string ', () => {
    const color = new Color('hsl(1.5turn,183,-0.0001,1000)', true);
    expect(color.toString()).to.equal('hsl(180,100,0,1)');
  });

  it('Should create an clamped HSL color from a string ', () => {
    const color = new Color('hsl(-1.5turn,183,-0.0001,1000)', true);
    expect(color.toString()).to.equal('hsl(180,100,0,1)');
  });

  it('Should create an UNclamped HSL color from a string ', () => {
    const color = new Color('hsl(1.5turn,183,-0.0001,1000)', false);
    expect(color.toString()).to.equal('hsl(540,183,-0.0001,1000)');
  });


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
})

