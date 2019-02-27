import { expect } from 'chai';
import 'mocha';

import { Color, Culture, Relation } from '../src';
import { HSL, RGB, XYZ } from '../src/models';

describe('R channel in RGB', () => {
  it('should set/get R channel', () => {

    const color = new RGB([205, 0.8, 11, 0.5]);

    expect(color.r()).to.equal(205);
    expect(color.r(64).rgba).to.equal('rgba(64,0.8,11,0.5)');
    expect(color.r(364).rgba).to.equal('rgba(255,0.8,11,0.5)');

  });
});

describe('G channel in RGB', () => {
  it('should set/get G channel', () => {

    const color = new RGB([205, 0.8, 11, 0.5]);

    expect(color.g()).to.equal(0.8);
    expect(color.g(64).rgba).to.equal('rgba(205,64,11,0.5)');
    expect(color.g(color.g() + 64).rgba).to.equal('rgba(205,64.8,11,0.5)');
    expect(color.g(364).rgba).to.equal('rgba(205,255,11,0.5)');
    expect(color.g(-364).rgba).to.equal('rgba(205,0,11,0.5)');
    expect(color.g(Infinity).rgba).to.equal('rgba(205,255,11,0.5)');

  });
});


describe('B channel in RGB', () => {
  it('should set/get B channel', () => {

    const color = new RGB([205, 0.8, 11, 0.5]);

    expect(color.b()).to.equal(11);
    expect(color.b(64).rgba).to.equal('rgba(205,0.8,64,0.5)');
    expect(color.b(364).rgba).to.equal('rgba(205,0.8,255,0.5)');
    expect(color.b(-Infinity).rgba).to.equal('rgba(205,0.8,0,0.5)');

  });
});


describe('H channel in HSL', () => {
  it('should set/get Hue channel', () => {

    const color = new HSL([205, 0.8, 11, 0.5]);

    expect(color.h()).to.equal(205);
    expect(color.h(64).toString()).to.equal('hsl(64,0.8,11,0.5)');
    expect(color.h(364).toString()).to.equal('hsl(4,0.8,11,0.5)');
    expect(color.h(-Infinity).toString()).to.equal('hsl(0,0.8,11,0.5)');
    expect(color.h(Infinity).toString()).to.equal('hsl(0,0.8,11,0.5)');

  });
});


describe('S channel in HSL', () => {
  it('should set/get S channel', () => {

    const color = new HSL([205, 0.8, 11, 0.5]);

    expect(color.s()).to.equal(0.8);
    expect(color.s(64).toString()).to.equal('hsl(205,64,11,0.5)');
    expect(color.s(364).toString()).to.equal('hsl(205,100,11,0.5)');
    expect(color.s(-364).toString()).to.equal('hsl(205,0,11,0.5)');
    expect(color.s(Infinity).toString()).to.equal('hsl(205,100,11,0.5)');
    expect(color.s(-Infinity).toString()).to.equal('hsl(205,0,11,0.5)');

  });
});


describe('L channel in HSL', () => {
  it('should set/get L channel', () => {

    const color = new HSL([205, 0.8, 11, 0.5]);

    expect(color.l()).to.equal(11);
    expect(color.l(64).toString()).to.equal('hsl(205,0.8,64,0.5)');
    expect(color.l(364).toString()).to.equal('hsl(205,0.8,100,0.5)');
    expect(color.l(-364).toString()).to.equal('hsl(205,0.8,0,0.5)');
    expect(color.l(Infinity).toString()).to.equal('hsl(205,0.8,100,0.5)');
    expect(color.l(-Infinity).toString()).to.equal('hsl(205,0.8,0,0.5)');

  });
});


describe('rgba method', () => {
  it('should clamp values', () => {

    const color = new RGB([705, -0.8, 111111, -10.5], false);

    expect(color.toString()).to.equal('rgb(705,-0.8,111111,-10.5)');
    expect(color.rgba).to.equal('rgba(255,0,255,0)');

  });

  it('should convert to RGB', () => {

    const color = new HSL([0, 100, 50, 1]);

    expect(color.toString()).to.equal('hsl(0,100,50,1)');
    expect(color.rgba).to.equal('rgba(255,0,0,1)');

  });
});


describe('Channel clamp', () => {
  it('should respect clamp when set channel', () => {

    const color = new RGB([205, 0.8, 11, 0.5]);

    expect(color.r(364).rgba).to.equal('rgba(255,0.8,11,0.5)');
    expect(color.r(-364).rgba).to.equal('rgba(0,0.8,11,0.5)');
    expect(color.r(-764, false).toString()).to.equal('rgb(-764,0.8,11,0.5)');

  });
});




