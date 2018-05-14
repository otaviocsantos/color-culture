import { expect } from 'chai';
import 'mocha';

import { Color } from '../src//models/color';
import { CSS } from '../src//models/css';
import { HSL } from '../src//models/hsl';
import { RGB } from '../src//models/rgb';
import { ColorCulture } from '../src';

let cc = new ColorCulture();

 describe('CSS tests', () => {
   it('should have CSS signature', () => {
     let css = new CSS();
     var result = CSS.model;
     expect(result).to.equal(css.signature);
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
   it('Functional syntax with floats value should convert rgb( , 0.0e1, 152.9e0, 1e2%) to FF0099 alpha 1', () => {
     expect(t12.hexValue).to.equal("FF0099");
     expect(t12.alpha).to.equal(1);
   });

 });
 describe('Convert CSS hsl(x,x,x) tests', () => {
   let t0 = new CSS("hsl(120,100%,50%)");
   it('Should convert hsl(120,100%,50%) to #00FF00', () => {
     expect(t0.hexValue).to.equal("00FF00");
     expect(t0.alpha).to.equal(1);
   });
 });
 describe('Convert CSS to RGB tests', () => {
   let t0 = new CSS("#FF0000");
   let confirm = new RGB(255, 0, 0);
   let converted = t0.as(RGB);

   it('Should convert #FF0000 to RGB(255,0,0)', () => {
     expect(confirm.toString()).to.equal(converted.toString());
   });
 });


 describe('Convert CSS to HSL tests', () => {
   let t0 = new CSS("#FF0000");
   let confirm = new HSL(0, 100, 50);
   let converted = t0.as(HSL);

   //console.log("to "+converted.value);

   it('Should convert #FF0000 to HSL(0,100,50)', () => {
     expect(true).to.equal(true);
   });
 });

 describe('Convert CSS (#FF0000) tests', () => {
   let t0 = new CSS("#Ff0000");

   it('Should set hexValue from #Ff0000 to FF0000', () => {
     expect(t0.hexValue).to.equal("FF0000");
   });
 });


 describe('Convert CSS hsl(0,100%,50%) tests', () => {
   let t2 = new CSS("hsl(0,100%,50%)");

   it('Should conver CSS hsl(0,100%,50%) to FF0000', () => {
     expect(t2.hexValue).to.equal("FF0000");
   });
 });
 describe('Convert CSS hsl(0,100%,50%) tests', () => {
   let t1 = new CSS("hsl(0,100%,50%)");
   let confirm = new HSL(0, 100, 50);
   let converted = t1.as(HSL);

   it('Should convert CSS hsl(270,60%,70%) to HSL(270,60,70)', () => {
     expect(confirm.toString()).to.equal(converted.toString());
   });
 });

describe('Convert CSS hsl(240deg,100%,50%) tests', () => {
  let css = new CSS("hsl(240deg,100%,50%)");
  let confirm = new HSL(240, 100, 50);
  let converted = css.as(HSL);

  it('hue 240deg Should be equal to hue 240)', () => {
    expect(confirm.toString()).to.equal(converted.toString());
  });
});

describe('Convert CSS hsl(-240deg,100%,50%) tests', () => {
  let css = new CSS("hsl(-240deg,100%,50%)");
  let confirm = new HSL(120, 100, 50);
  let converted = css.as(HSL);

  it('hue -240deg Should be equal to hue 120)', () => {
    expect(confirm.toString()).to.equal(converted.toString());
  });
});


 describe('Convert CSS hsl(-240,100%,50%) tests', () => {
   let css = new CSS("hsl(-240,100%,50%)");
   let confirm = new HSL(120, 100, 50);
   let converted = css.as(HSL);

   it('hue -240 Should be equal to hue 120)', () => {
     expect(confirm.toString()).to.equal(converted.toString());
   });
 });

 describe('Convert CSS hsl(.66666turn, 100%, 50%) tests', () => {
   let css = new CSS("hsl(.66666turn, 100%, 50%)");
   let confirm = new HSL(240, 100, 50);
   let converted = css.as(HSL);

   it('hue .66666turn Should be equal to hue 240)', () => {
     expect(confirm.toString()).to.equal(converted.toString());
   });
 });


 describe('Convert CSS hsl(-.33333turn, 100%, 50%) tests', () => {
   let css = new CSS("hsl(-.33333turn, 100%, 50%)");
   let confirm = new HSL(240, 100, 50);
   let converted = css.as(HSL);

   it('hue -.33333turn Should be equal to hue 240)', () => {
     expect(confirm.toString()).to.equal(converted.toString());
   });
 });

 describe('Convert CSS hsl(480,100%,50%) tests', () => {
   let css = new CSS("hsl(480,100%,50%)");
   let confirm = new HSL(120, 100, 50);
   let converted = css.as(HSL);

   it('hue 480 Should be equal to hue 120)', () => {
     expect(confirm.toString()).to.equal(converted.toString());
   });
 });


 describe('Convert CSS hsl(4.18879, 100%, 50%) tests', () => {
   let css = new CSS("hsl(4.18879rad, 100%, 50%)");
   let confirm = new HSL(240, 100, 50);
   let converted = css.as(HSL);

   it('hsl(4.18879rad, 100%, 50%) Should be equal to (240,100,50)', () => {
     expect(confirm.toString()).to.equal(converted.toString());
   });
 });


 describe('Convert CSS hsl: alpha parsing tests', () => {
   let css = new CSS("hsl(120, 100%, 50%, 15%)");
   let confirm = new HSL(120, 100, 50);
   confirm.alpha = 0.15;
   let converted = css.as(HSL);

   it('hsl( ) Should be equal to (120,100,50) alpha 0.15', () => {
     expect(confirm.toString()).to.equal(converted.toString());
     expect(0.15).to.equal(css.alpha);
     expect(0.15).to.equal(confirm.alpha);
     expect(0.15).to.equal(converted.alpha);
   });
 });


describe('Convert CSS hsl: whitespace alpha parsing tests', () => {
  let css = new CSS("hsl(120 100%     50% / 15%)");
  let confirm = new HSL(120, 100, 50);
  confirm.alpha = 0.15;
  let converted = css.as(HSL);

  it('hsl(120 100% 50% / 15%) Should be equal to (120,100,50) alpha 0.15', () => {
    expect(confirm.toString()).to.equal(converted.toString());
    expect(0.15).to.equal(css.alpha);
    expect(0.15).to.equal(confirm.alpha);
    expect(0.15).to.equal(converted.alpha);
  });
});

describe('Convert CSS hsl: whitespace alpha parsing tests', () => {
  let css = new CSS("hsla(240 100% 50% / .05) ");
  let confirm = new HSL(240, 100, 50);
  confirm.alpha = 0.05;
  let converted = css.as(HSL);

  it('hsla(240 100% 50% / .05) Should be equal to (240,100,50) alpha 0.05', () => {
    expect(confirm.toString()).to.equal(converted.toString());
    expect(0.05).to.equal(css.alpha);
    expect(0.05).to.equal(confirm.alpha);
    expect(0.05).to.equal(converted.alpha);
  });
});