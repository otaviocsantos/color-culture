import 'mocha';

import { expect } from 'chai';

import { BaseFactory } from '../src/base-factory';
import { Color } from '../src/color';
import { Compute } from '../src/compute';
import { CMYK, HSL, RGB, XYZ } from '../src/models';




describe('Luma tests', () => {
  const white = new RGB([255, 255, 255, 1]);
  const blue = new RGB('blue');
  const black = new RGB([0, 0, 0, 1]);

  it('White luma should be 1', () => {
    const result = white.luma();
    expect(result).to.be.equal(1);
  });

  it('Black luma should be 1', () => {
    expect( black.luma()).to.be.equal(0);
  });

  it('Blue luma should be 0.33763886032268264', () => {
    expect( blue.luma()).to.be.equal(0.33763886032268264);
  });


});



describe('Distance tests', () => {
  const white = new RGB([255, 255, 255, 1]);
  const black = new RGB([0, 0, 0, 1]);

  it('White distnace from White should be 0', () => {
    expect( white.distance(white)).to.be.equal(0);
  });

  it('Black distance from Black should be 0', () => {
    expect( black.distance(black)).to.be.equal(0);
  });

  it('Black distance from White should be >100', () => {
    expect( black.distance(white)).to.be.gt(100);
  });

});


describe('contrast tests', () => {
 

  it('Contrast should be properly enhanced ', () => {

    const middle = new RGB([200, 55, 127.5, 1]);
    const contrasted = new RGB([255, 0, 127.5, 1]);

    const result = middle.contrast(1);

    expect(result.toString()).to.equal(contrasted.toString());
  });

  it('Contrast should be properly diminished ', () => {

    const middle = new RGB([200, 55, 127.5, 1]);
    const contrasted = new RGB([127.5, 127.5, 127.5, 1]);

    const result = middle.contrast(-1);

    expect(result.toString()).to.equal(contrasted.toString());
  });

  it('Contrast should keep alpha value ', () => {

    const middle = new RGB([200, 55, 127.5, 0.12]);
    const contrasted = new RGB([127.5, 127.5, 127.5, 0.12]);

    const result = middle.contrast(-1);
    if(result instanceof Color){
      expect(result.alpha.toString()).to.equal(contrasted.alpha.toString());
    }else{
      throw result;
    }
  });

  it('Contrast should keep alpha value when used with a non RGB model', () => {

    const middle = new HSL([120, 30, 40, 0.67]);
    const contrasted = new HSL([120, 30, 40, 0.67]);

    const result = middle.contrast(1);
    if(result instanceof Color){
      expect(result.alpha.toString()).to.equal(contrasted.alpha.toString());
    }else{
      throw result;
    }
  });

  it('Non RGB model should be properly contrasted ', () => {

    const middle = new HSL([200, 55, 60.5, 0.61]);
    const contrasted = new HSL([200, 71.2779047739692, 62.811349036402575, 0.61]);

    const result = middle.contrast(0.1);
    console.log('--------------------------------------------------------',result.toString())
    expect(result.toString()).to.equal(contrasted.toString());
  });


  it('Non RGB model should be properly diminished ', () => {

    const middle = new HSL([200, 55, 60.5, 0.461]);
    const contrasted = new HSL([0, 0, 50, 0.461]);

    const result = middle.contrast(-1);
    expect(result.toString()).to.equal(contrasted.toString());
  });

});

