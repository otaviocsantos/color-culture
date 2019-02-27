import { expect } from 'chai';
import 'mocha';

import { Color } from '../src/color';
import { CMYK, HSL, LAB, RGB, XYZ } from '../src/models';


describe('CMYK string tests', () => {
  it('should have CMYK signature', () => {
    const color = new CMYK();
    const result = CMYK.MODEL;
    expect(result).to.equal(color.model);
    expect(result).to.equal('cmyk');
  });

  it('should return a corret toString value', () => {
    const color = new CMYK([12, 34, 45, 56, 0.34]);
    const result = color.toString();
    const confirm = 'cmyk(12,34,45,56,0.34)';
    expect(result).to.equal(confirm);
  });
});


describe('CMYK Convert tests', () => {
  const white = new CMYK([0, 0, 0, 0]);
  const black = new CMYK([0, 0, 0, 100]);

  it('CMYK(0, 0, 0, 0) should convert to RGB(255, 255, 255) using function as', () => {
    const result = white.to(RGB.MODEL);
    const confirm = new RGB([255, 255, 255]);
    expect(result.toString()).to.equal(confirm.toString());

  });

  it('(0, 0, 0, 100) should convert to RGB(0, 0, 0) using function as', () => {
    const converted = black.to(RGB.MODEL);
    const rgbBlack = new RGB([0, 0, 0]);
    expect(converted.toString()).to.equal(rgbBlack.toString());

  });
});
