import { expect } from 'chai';
import 'mocha';

import { BaseFactory, Color } from '../src';
import { CMYK, HSL, LAB, RGB, XYZ } from '../src/models';

describe('create Base tests', () => {

  it('Should create a Clamped RGB Base', () => {
    const rgbBase = BaseFactory.createRGB([325, -26, 27, 0.5]);
    expect(rgbBase.channels.join()).to.equal([255, 0, 27, 0.5].join());
    expect(rgbBase.ranges.join()).to.equal([[0, 255], [0, 255], [0, 255], [0, 1]].join());
    expect(rgbBase.alpha).to.equal(0.5);
    expect(rgbBase.model).to.equal(RGB.MODEL);
  });

  it('Should create a UNclamped RGB Base', () => {
    const rgbBase = BaseFactory.createRGB([325, -26, 0, 3.5], false);
    expect(rgbBase.channels.join()).to.equal([325, -26, 0, 3.5].join());
    expect(rgbBase.ranges.join()).to.equal([[0, 255], [0, 255], [0, 255], [0, 1]].join());
    expect(rgbBase.alpha).to.equal(3.5);
    expect(rgbBase.model).to.equal(RGB.MODEL);
  });

  it('Should create a Clamped HSL Base', () => {
    const hslBase = BaseFactory.createHSL([370, -26, 27, 0.5]);
    expect(hslBase.channels.join()).to.equal([10, 0, 27, 0.5].join());
    expect(hslBase.ranges.join()).to.equal([[0, 360], [0, 100], [0, 100], [0, 1]].join());
    expect(hslBase.alpha).to.equal(0.5);
    expect(hslBase.model).to.equal(HSL.MODEL);
  });

  it('Should create a UNclamped HSL Base', () => {
    const hslBase = BaseFactory.createHSL([370, -26, 27, 0.5], false);
    expect(hslBase.channels.join()).to.equal([370, -26, 27, 0.5].join());
    expect(hslBase.ranges.join()).to.equal([[0, 360], [0, 100], [0, 100], [0, 1]].join());
    expect(hslBase.alpha).to.equal(0.5);
    expect(hslBase.model).to.equal(HSL.MODEL);
  });

  it('Should create a Clamped LAB Base', () => {
    const labBase = BaseFactory.createLAB([370, -226, 270, 4.5]);
    expect(labBase.channels.join()).to.equal([100, -128, 128, 1].join());
    expect(labBase.ranges.join()).to.equal([[0, 100], [-128, 128], [-128, 128], [0, 1]].join());
    expect(labBase.alpha).to.equal(1);
    expect(labBase.model).to.equal(LAB.MODEL);
  });

  it('Should create a UNclamped LAB Base', () => {
    const labBase = BaseFactory.createLAB([370, -226, 270, 4.5], false);
    expect(labBase.channels.join()).to.equal([370, -226, 270, 4.5].join());
    expect(labBase.ranges.join()).to.equal([[0, 100], [-128, 128], [-128, 128], [0, 1]].join());
    expect(labBase.alpha).to.equal(4.5);
    expect(labBase.model).to.equal(LAB.MODEL);
  });

  it('Should create a Clamped CMYK Base', () => {
    const cmykBase = BaseFactory.createCMYK([370, -226, 270, -0.0001, 4.5]);
    expect(cmykBase.channels.join()).to.equal([100, 0, 100, 0, 1].join());
    expect(cmykBase.ranges.join()).to.equal([[0, 100], [0, 100], [0, 100], [0, 100], [0, 1]].join());
    expect(cmykBase.alpha).to.equal(1);
    expect(cmykBase.model).to.equal(CMYK.MODEL);
  });

  it('Should create a UNclamped CMYK Base', () => {
    const cmykBase = BaseFactory.createCMYK([370, -226, 270, -0.0001, 4.5], false);
    expect(cmykBase.channels.join()).to.equal([370, -226, 270, -0.0001, 4.5].join());
    expect(cmykBase.ranges.join()).to.equal([[0, 100], [0, 100], [0, 100], [0, 100], [0, 1]].join());
    expect(cmykBase.alpha).to.equal(4.5);
    expect(cmykBase.model).to.equal(CMYK.MODEL);
  });

  it('Should create a Clamped XYZ Base', () => {
    const xyzBase = BaseFactory.createXYZ([370, -226, 270, 4.5]);
    expect(xyzBase.channels.join()).to.equal([100, 0, 100, 1].join());
    expect(xyzBase.ranges.join()).to.equal([[0, 100], [0, 100], [0, 100], [0, 1]].join());
    expect(xyzBase.alpha).to.equal(1);
    expect(xyzBase.model).to.equal(XYZ.MODEL);
  });

  it('Should create a UNclamped CMYK Base', () => {
    const xyzBase = BaseFactory.createXYZ([370, -226, -0.0001, 4.5], false);
    expect(xyzBase.channels.join()).to.equal([370, -226, -0.0001, 4.5].join());
    expect(xyzBase.ranges.join()).to.equal([[0, 100], [0, 100], [0, 100], [0, 1]].join());
    expect(xyzBase.alpha).to.equal(4.5);
    expect(xyzBase.model).to.equal(XYZ.MODEL);
  });


  it('Should create CMYK Base using generic method', () => {
    const cmykBase = BaseFactory.createGeneric([370, -226, 270, -0.0001, 4.5], CMYK.MODEL);
    expect(cmykBase.channels.join()).to.equal([100, 0, 100, 0, 1].join());
    expect(cmykBase.ranges.join()).to.equal([[0, 100], [0, 100], [0, 100], [0, 100], [0, 1]].join());
    expect(cmykBase.alpha).to.equal(1);
    expect(cmykBase.model).to.equal(CMYK.MODEL);
  });

  it('Should create HSL Base using generic method', () => {
    const hslBase = BaseFactory.createGeneric([370, -26, 27, 0.5], HSL.MODEL);
    expect(hslBase.channels.join()).to.equal([10, 0, 27, 0.5].join());
    expect(hslBase.ranges.join()).to.equal([[0, 360], [0, 100], [0, 100], [0, 1]].join());
    expect(hslBase.alpha).to.equal(0.5);
    expect(hslBase.model).to.equal(HSL.MODEL);
  });

  it('Should create LAB Base using generic method', () => {
    const labBase = BaseFactory.createGeneric([370, -226, 270, 4.5], LAB.MODEL);
    expect(labBase.channels.join()).to.equal([100, -128, 128, 1].join());
    expect(labBase.ranges.join()).to.equal([[0, 100], [-128, 128], [-128, 128], [0, 1]].join());
    expect(labBase.alpha).to.equal(1);
    expect(labBase.model).to.equal(LAB.MODEL);
  });

  it('Should create RGB Base using generic method', () => {
    const rgbBase = BaseFactory.createGeneric([325, -26, 27, 0.5], RGB.MODEL);
    expect(rgbBase.channels.join()).to.equal([255, 0, 27, 0.5].join());
    expect(rgbBase.ranges.join()).to.equal([[0, 255], [0, 255], [0, 255], [0, 1]].join());
    expect(rgbBase.alpha).to.equal(0.5);
    expect(rgbBase.model).to.equal(RGB.MODEL);
  });

  it('Should create XYZ Base using generic method', () => {
    const xyzBase = BaseFactory.createGeneric([370, -226, -0.0001, 4.5], XYZ.MODEL);
    expect(xyzBase.channels.join()).to.equal([100, 0, 0, 1].join());
    expect(xyzBase.ranges.join()).to.equal([[0, 100], [0, 100], [0, 100], [0, 1]].join());
    expect(xyzBase.alpha).to.equal(1);
    expect(xyzBase.model).to.equal(XYZ.MODEL);
  });
});


describe('BaseFactory register model tests', () => {

  it('Should register a new model', () => {

    BaseFactory.setModel('hip', [[0, 65025], [0, 65025], [0, 65025], [0, 255]], 3);

    const hipBase = BaseFactory.createGeneric([-10,16581375, -255, 256],'hip');
    expect(hipBase.ranges.join()).to.equal([[0, 65025], [0, 65025], [0, 65025], [0, 255]].join());
    expect(hipBase.channels.join()).to.equal([[0, 65025, 0, 255]].join());

  });

});