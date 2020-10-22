import 'mocha';

import { expect } from 'chai';

import { BaseFactory } from '../src/base-factory';
import { Color } from '../src/color';
import { Compute } from '../src/compute';
import { CMYK, HSL, RGB, XYZ } from '../src/models';



describe('random range tests', () => {

  for (let i = 0; i < 25; i++) {
    const color = Compute.randomInRange(0, 25);
    it('random range must remain inside interval', () => {
      expect(color).to.be.gte(0);
      expect(color).to.be.lte(255);

    });
  }
  for (let i = 0; i < 25; i++) {
    const color = Compute.randomInRange(0, 1);
    it('random color must remain inside interval', () => {
      expect(color).to.be.gte(0);
      expect(color).to.be.lte(1);

    });
  }
});

describe('random RGB channels tests', () => {


  for (let i = 0; i < 25; i++) {
    const color = Compute.randomColor();
    it('random range must remain inside interval', () => {
      expect(color.channels[0]).to.be.gte(RGB.RANGES[0][0]);
      expect(color.channels[0]).to.be.lte(RGB.RANGES[0][1]);

      expect(color.channels[1]).to.be.gte(RGB.RANGES[1][0]);
      expect(color.channels[1]).to.be.lte(RGB.RANGES[1][1]);

      expect(color.channels[2]).to.be.gte(RGB.RANGES[2][0]);
      expect(color.channels[2]).to.be.lte(RGB.RANGES[2][1]);

      expect(color.channels[3]).to.be.gte(RGB.RANGES[3][0]);
      expect(color.channels[3]).to.be.lte(RGB.RANGES[3][1]);

    });
  }

});


describe('random CMYK channels tests', () => {

  for (let i = 0; i < 25; i++) {
    const color = Compute.randomColor(CMYK.MODEL);
    it('random range must remain inside interval', () => {
      expect(color.channels[0]).to.be.gte(CMYK.RANGES[0][0]);
      expect(color.channels[0]).to.be.lte(CMYK.RANGES[0][1]);

      expect(color.channels[1]).to.be.gte(CMYK.RANGES[1][0]);
      expect(color.channels[1]).to.be.lte(CMYK.RANGES[1][1]);

      expect(color.channels[2]).to.be.gte(CMYK.RANGES[2][0]);
      expect(color.channels[2]).to.be.lte(CMYK.RANGES[2][1]);

      expect(color.channels[3]).to.be.gte(CMYK.RANGES[3][0]);
      expect(color.channels[3]).to.be.lte(CMYK.RANGES[3][1]);

      expect(color.channels[4]).to.be.gte(CMYK.RANGES[4][0]);
      expect(color.channels[4]).to.be.lte(CMYK.RANGES[4][1]);
    });
  }

});



describe('random HSL channels tests', () => {

  for (let i = 0; i < 25; i++) {
    const color = Compute.randomColor(HSL.MODEL);
    it('random range must remain inside interval', () => {
      expect(color.channels[0]).to.be.gte(HSL.RANGES[0][0]);
      expect(color.channels[0]).to.be.lte(HSL.RANGES[0][1]);

      expect(color.channels[1]).to.be.gte(HSL.RANGES[1][0]);
      expect(color.channels[1]).to.be.lte(HSL.RANGES[1][1]);

      expect(color.channels[2]).to.be.gte(HSL.RANGES[2][0]);
      expect(color.channels[2]).to.be.lte(HSL.RANGES[2][1]);

      expect(color.channels[3]).to.be.gte(HSL.RANGES[3][0]);
      expect(color.channels[3]).to.be.lte(HSL.RANGES[3][1]);

    });
  }

});