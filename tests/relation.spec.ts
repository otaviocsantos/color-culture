import { expect } from 'chai';
import 'mocha';

import { Color, Culture, Relation } from '../src';
import { CMYK, HSL, LAB, RGB, XYZ } from '../src/models';

const white = new RGB([255, 255, 255, 1]);
const gray = new RGB([127, 127, 127, 1]);
const black = new RGB([0, 0, 0, 1]);
const red = new RGB([255, 0, 0, 1]);
const green = new RGB([0, 255, 0, 1]);
const blue = new RGB([0, 0, 255, 1]);
const yellow = new RGB([255, 255, 0, 1]);

describe('Color relation tests', () => {

  it('Relation should return modifier color if it is not linked to anything else', () => {
    const culture = new Culture();

    culture.addColor(green);

    const relation = new Relation(red);
    culture.addRelation(relation);
    expect(relation.result).to.equal(red);
  });

  it('Relation modifier color should modify indexed color', () => {
    const culture = new Culture();

    const rel = culture.addColor(green);


    const relation = culture.addRelation(new RGB([255, 0, 0, 0]), rel);
    expect(relation.result.toString()).to.equal(yellow.toString());
  });



  it('RGB(65,214,137,0.21) + RGB(0) should be RGB(65,214,137,0.21)', () => {
    const A = new RGB([65, 214, 137, 0.21]);
    const B = new RGB([0, 0, 0, 0]);

    const culture = new Culture();

    const from = culture.addColor(A);

    const relation = culture.addRelation(B, from);

    const result = relation.result;
    expect(result.toString()).to.be.equal(A.toString());
  });

  it('arrays should be computed correctly', () => {
    const A = new RGB([20, 30, 40, 0.41], false);
    const B = new RGB([-20, 0, 50, 0.51], false);
    const C = new RGB([0, 30, 90, 0.92], false);

    const culture = new Culture();
    const from = culture.addColor(A);
    const relation = culture.addRelation(B, from);


    const result = relation.result.to(RGB.MODEL);
    expect(result.channels[0]).to.equal(C.channels[0]);
    expect(result.channels[1]).to.equal(C.channels[1]);
    expect(result.channels[2]).to.equal(C.channels[2]);
    expect(result.alpha).to.be.within(C.alpha - 0.00001, C.alpha + 0.00001);
  });


  it('RGB yellow plus CMYK K20% should result in dark CMYK yellow', () => {
    const darkCMKYYellow = new CMYK([0, 0, 100, 20, 1]);
    const cmykMod = new CMYK([0, 0, 0, 20, 0]);

    const culture = new Culture();
    const from = culture.addColor(yellow);


    const relation = culture.addRelation(cmykMod, from);
    const result = relation.result;
    expect(result.toString()).to.equal(darkCMKYYellow.toString());
  });



  it('a negative value for a channel sould be accepted', () => {
    const A = new RGB([0, 30, 40, 0.41], false);
    const B = new RGB([-20, 0, 50, -0.51], false);
    const C = new RGB([-20, 30, 90, -0.10], false);

    const culture = new Culture();
    const from = culture.addColor(A);
    const relation = culture.addRelation(B, from);


    const result = relation.result.to(RGB.MODEL, false);
    expect(result.channels[0]).to.equal(C.channels[0]);
    expect(result.channels[1]).to.equal(C.channels[1]);
    expect(result.channels[2]).to.equal(C.channels[2]);
    expect(result.alpha).to.be.within(C.alpha - 0.00001, C.alpha + 0.00001);
  });

  it('HSL cyan (180,100,50) plus HSL (180,0,0) should result HSL red (0,100,50)', () => {
    const hsl = new HSL([180, 100, 50]);
    const mod = new HSL([180, 0, 0]);
    mod.alpha = 0;
    const expected = new HSL([0, 100, 50]);


    const culture = new Culture();
    const from = culture.addColor(hsl);

    const relation = culture.addRelation(mod, from);

    const result = relation.result;

    expect(result.rgba).to.equal(expected.rgba);
  });


  it('HSL cyan (180,100,50) plus HSL (-240,-20,25) should result HSL (300,80,75)', () => {
    const hsl = new HSL([180, 100, 50]);
    const mod = new HSL([-240, -20, 25], false);
    mod.alpha = 0;
    const expected = new HSL([300, 80, 75]);


    const culture = new Culture();
    const from = culture.addColor(hsl);
    const relation = culture.addRelation(mod, from);

    const result = relation.result;
    expect(result.clamp().toString()).to.equal(expected.toString());
  });
});