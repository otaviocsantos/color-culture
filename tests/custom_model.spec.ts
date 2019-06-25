import { expect } from 'chai';
import 'mocha';

import { Base, BaseFactory, Color, Converter } from '../src';
import { CMYK, HSL, LAB, XYZ } from '../src/models';

describe('Should accept a new color model', () => {

  it('should provide a correct toString() to a new color model', () => {
    const color = new Color([10, 20, 30, 0.5], 'hip');
    expect(color.toString()).to.equal('hip(10,20,30,0.5)');
  });

  it('should clamp correctly a new color model', () => {
  
    BaseFactory.setModel('hip', [[0, 25], [0, 250], [0, 2500], [0, 2.5]], 3);

    const color = new Color([1000, -2000, 128, 10.5], 'hip');
    expect(color.toString()).to.equal('hip(25,0,128,2.5)');
  });

  it('should NOT clamp a new color model when requested', () => {
    const color = new Color([1000, -2000, 128, 10.5], 'hip', false);
    expect(color.toString()).to.equal('hip(1000,-2000,128,10.5)');
  });



  it('should create a new color model with minimal arguments', () => {

    BaseFactory.setModel('hip', [[0, 25], [0, 250], [0, 2500], [0, 2.5]], 3);
    const color = new Color([1000, -2000, 128000, 10.5], 'hip');
    // console.log('color', color.base.clampFunction);
    expect(color.toString()).to.equal('hip(25,0,2500,2.5)');

  });



  it('should convert to a new color model', () => {
    Converter.register('hsl', 'hip',
      (value: Base): Base => {

        const h = value.channels[0] / 360;
        const s = value.channels[1] / 100;
        const l = value.channels[2] / 100;
        let t1;
        let t2;
        let t3;
        let hip;
        let val;

        if (s === 0) {
          val = l * 255;
          value.channels = [val, val, val, value.alpha];
          value.ranges = [[0, 255], [0, 255], [0, 255], [0, 1]];
          value.model = 'hip';
          return value;
        }

        if (l < 0.5) {
          t2 = l * (1 + s);
        } else {
          t2 = l + s - l * s;
        }

        t1 = 2 * l - t2;

        hip = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
          t3 = h + 1 / 3 * -(i - 1);
          if (t3 < 0) {
            t3++;
          }
          if (t3 > 1) {
            t3--;
          }

          if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
          } else if (2 * t3 < 1) {
            val = t2;
          } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
          } else {
            val = t1;
          }

          hip[i] = val * 255;
        }

        value.channels = [hip[0], hip[1], hip[2], value.alpha];
        value.ranges = [[0, 255], [0, 255], [0, 255], [0, 1]];
        value.model = 'hip';
        return value;

      })
    const hsl = new HSL([0, 100, 50, 1]);
    const result = new Color([255, 0, 0, 1], 'hip');
    expect(hsl.to('hip').toString()).to.equal('hip(255,0,0,1)');
  });




  it('should convert from a new color model', () => {

    Converter.register('hip', 'hsl',
      (value: Base): Base => {

        const fr = value.channels[0] / 255;
        const fg = value.channels[1] / 255;
        const fb = value.channels[2] / 255;
        const min = Math.min(fr, fg, fb);
        const max = Math.max(fr, fg, fb);
        const delta = max - min;
        let h = 0;
        let s;
        let l;

        if (max === min) {
          h = 0;
        } else if (fr === max) {
          h = (fg - fb) / delta;
        } else if (fg === max) {
          h = 2 + (fb - fr) / delta;
        } else if (fb === max) {
          h = 4 + (fr - fg) / delta;
        }

        h = Math.min(h * 60, 360);

        if (h < 0) {
          h += 360;
        }

        l = (min + max) / 2;

        if (max === min) {
          s = 0;
        } else if (l <= 0.5) {
          s = delta / (max + min);
        } else {
          s = delta / (2 - max - min);
        }

        return BaseFactory.createHSL([h, s * 100, l * 100, value.alpha]);

      });
    BaseFactory.setModel('hip', [[0, 255], [0, 255], [0, 255], [0, 1]], 3);

    const hip = new Color([255, 0, 0, 1],'hip');
    const result = new HSL([0, 100, 50, 1]);
    expect(hip.to(HSL.MODEL).toString()).to.equal(result.toString());
  });


  it('should create from a string', () => {

    BaseFactory.setModel('hip', [[0, 255], [0, 255], [0, 255], [0, 1]], 3);

    const hip = new Color('hip(255, 0, 0, 1)');

    expect(hip.toString()).to.equal('hip(255,0,0,1)');
  });

});
