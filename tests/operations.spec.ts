import 'mocha';

import { expect } from 'chai';

import { BaseFactory } from '../src/base-factory';
import { Color } from '../src/color';
import { CMYK, HSL, RGB } from '../src/models';




describe('CMYK operation tests', () => {
  const cmyk = new CMYK([0, 100, 100, 0, 1]);

  it('CMYK+CMYK should ADD properly', () => {
    const mod = new CMYK([100, 0, 0, 0, 0]);

    const result = cmyk.add(mod);


    expect(result.channels[0]).to.be.equal(100);
    expect(result.channels[1]).to.be.equal(100);
    expect(result.channels[2]).to.be.equal(100);
    expect(result.channels[3]).to.be.equal(0);
    expect(result.channels[4]).to.be.equal(1);

  });

  it('RGB+CMYK should ADD properly', () => {
    const rgb = new RGB([0, 255, 255, 0]);

    const result = rgb.add(cmyk);


    expect(result.channels[0]).to.be.equal(100);
    expect(result.channels[1]).to.be.equal(100);
    expect(result.channels[2]).to.be.equal(100);
    expect(result.channels[3]).to.be.equal(0);
    expect(result.channels[4]).to.be.equal(1);

  });

  it('transparent RGB+CMYK should ADD properly', () => {
    const rgb = new Color([0, 0, 0, 0]);

    const result = rgb.add(cmyk);

    expect(result.channels[0]).to.be.equal(0);
    expect(result.channels[1]).to.be.equal(100);
    expect(result.channels[2]).to.be.equal(100);
    expect(result.channels[3]).to.be.equal(100);
    expect(result.channels[4]).to.be.equal(1);

  });

  it('RGB+RGB should MIX properly', () => {
    const first = new Color([0, 0, 0, 0]);
    const second = new Color([255, 255, 255, 1]);

    const result = first.mixChannels(second);

    expect(result.channels[0]).to.be.equal(127.5);
    expect(result.channels[1]).to.be.equal(127.5);
    expect(result.channels[2]).to.be.equal(127.5);
    expect(result.channels[3]).to.be.equal(0.5);

  });


  it('RGB+RGB should MIX properly', () => {
    const first = new Color([255, 255, 255, 1]);
    const second = new Color([0, 0, 0, 0]);

    const result = first.mixChannels(second);

    expect(result.channels[0]).to.be.equal(127.5);
    expect(result.channels[1]).to.be.equal(127.5);
    expect(result.channels[2]).to.be.equal(127.5);
    expect(result.channels[3]).to.be.equal(0.5);

  });

  it('HSL+HSL should MIX properly', () => {
    const first = new HSL([0, 100, 100, 1]);
    const second = new HSL([358, 0, 0, 0]);

    const result = first.mixChannels(second);

    expect(result.channels[0]).to.be.equal(179);
    expect(result.channels[1]).to.be.equal(50);
    expect(result.channels[2]).to.be.equal(50);
    expect(result.channels[3]).to.be.equal(0.5);

  });

  it('HSL+HSL should MIX properly', () => {
    const first = new HSL([358, 0, 0, 0]);
    const second = new HSL([0, 100, 100, 1]);

    const result = first.mixChannels(second);

    expect(result.channels[0]).to.be.equal(179);
    expect(result.channels[1]).to.be.equal(50);
    expect(result.channels[2]).to.be.equal(50);
    expect(result.channels[3]).to.be.equal(0.5);

  });

  it('HSL+HSL should MIX properly', () => {
    const first = new HSL([100, 51, 100, 0.6]);
    const second = new HSL([300, 50, 60, 0.8]);

    const result = first.mixChannels(second);

    expect(result.channels[0]).to.be.equal(200);
    expect(result.channels[1]).to.be.equal(50.5);
    expect(result.channels[2]).to.be.equal(80);
    expect(result.channels[3]).to.be.equal(0.7);

  });
});
