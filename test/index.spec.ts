import { expect } from 'chai';
import 'mocha';

import { Color } from '../src//models/color';
import { CSS } from '../src//models/css';
import { HSL } from '../src//models/hsl';
import { RGB } from '../src//models/rgb';
import { ColorCulture } from '../src';

let cc = new ColorCulture();

describe('RGB tests', () => {
  it('should have RGB signature', () => {
    let rgb = new RGB(0, 0, 0);
    var result = RGB.model;
    expect(result).to.equal(rgb.signature);
  });
});

describe('HSL tests', () => {
  it('should have HSL signature', () => {
    let color = new HSL(0, 0, 0);
    var result = HSL.model;
    expect(result).to.equal(color.signature);
  });
});

describe('Convert tests', () => {
  const rgb = new RGB(255, 0, 128);

  it('should convert rgb to hsl', () => {
    //    var result: HSL = rgb.as(HSL);
    const result = rgb.to(HSL.model);
    const confirm = new HSL(330, 100, 50);
    expect(result.toString()).to.equal(confirm.toString());

  });
});


describe('Convert tests', () => {
  const rgb = new RGB(255, 0, 128);

  it('should convert rgb to hsl using as', () => {
    var result = rgb.as(HSL);
    const confirm = new HSL(330, 100, 50);
    expect(result.toString()).to.equal(confirm.toString());

  });
});


describe('Convert CSS named tests', () => {
  const css = new CSS("ReD");

  it('should convert named to hex', () => {
    expect(css.hexValue).to.equal("FF0000");
  });

  const rebecca = new CSS("rebeccapurple");
  it('should convert rebeccapurple to 663399', () => {
    expect(rebecca.hexValue).to.equal("663399");
  });

});


describe('Convert CSS rgb(x,x,x) tests', () => {
  //according to:
  //https://developer.mozilla.org/en-US/docs/Web/CSS/color_value

  const t0 = new CSS("rgb(255,0,153)");
  it('should convert rgb(255,0,153) to FF0099', () => {
    expect(t0.hexValue).to.equal("FF0099");
  });

  const t1 = new CSS("rgb(255, 0, 153)");
  it('should convert rgb(255, 0, 153) to FF0099', () => {
    expect(t1.hexValue).to.equal("FF0099");
  });


  const t4 = new CSS("rgb(100%,0%,60%)");
  it('should convert rgb(100%,0%,60%) to FF0099', () => {
    expect(t4.hexValue).to.equal("FF0099");
  });

  const t5 = new CSS("rgb(100%, 0%, 60%)");
  it('should convert rgb(100%, 0%, 60%) to FF0099', () => {
    expect(t5.hexValue).to.equal("FF0099");
  });

  it('should error on rgb(100%, 0, 60%). Don\'t mix integers and percentages', () => {
    expect(function () {
      const t6 = new CSS("rgb(100%, 0, 60%)");
    }).to.throw(Error);
  });

  const t7 = new CSS("rgb(255 0 153)");
  it('Whitespace syntax should convert rgb(255 0 153) to FF0099', () => {
    expect(t7.hexValue).to.equal("FF0099");
  });

  const t8 = new CSS("rgb(255 0 153 / 1)");
  it('Whitespace syntax should convert rgb(255 0 153 / 1) to FF0099 alpha 1', () => {
    expect(t8.hexValue).to.equal("FF0099");
    expect(t8.alpha).to.equal(1);
  });

  const t9 = new CSS("rgb(255 0 153 / 100%)");
  it('Whitespace syntax should convert rgb(255 0 153 / 100%) to FF0099 alpha 1', () => {
    expect(t9.hexValue).to.equal("FF0099");
    expect(t9.alpha).to.equal(1);
  });

  const t10 = new CSS("rgb(255, 0, 153, 1)");
  it('Functional syntax with alpha value should convert rgb(255, 0, 153, 1) to FF0099 alpha 1', () => {
    expect(t10.hexValue).to.equal("FF0099");
    expect(t10.alpha).to.equal(1);
  });

  const t11 = new CSS("rgb(255, 0, 153, 100%)");
  it('Functional syntax with alpha value should convert rgb(255, 0, 153, 100%) to FF0099 alpha 1', () => {
    expect(t11.hexValue).to.equal("FF0099");
    expect(t11.alpha).to.equal(1);
  });

  const t12 = new CSS("rgb(+255e0, 0.0e1, 152.9e0, 1e2%)");
  it('Functional syntax with floats value should convert rgb(+255e0, 0.0e1, 152.9e0, 1e2%) to FF0099 alpha 1', () => {
    expect(t12.hexValue).to.equal("FF0099");
    expect(t12.alpha).to.equal(1);
  });

});

describe('control group', () => {

  it('if not even this one is passing something else is wrong...', () => {
    expect(true).to.equal(true);

  });
});
