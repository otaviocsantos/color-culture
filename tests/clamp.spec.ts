import { expect } from 'chai';
import 'mocha';

import { Color, Culture, Relation } from '../src';
import { HSL, RGB, XYZ } from '../src/models';

describe('clamp RGB tests', () => {
  it('RGB should stay in range', () => {
    const color = new RGB([285, -78.8, 1111, 58]);
    expect(color.rgba).to.equal('rgba(255,0,255,1)');
  });



  it('a Color converted to HSL should clamp as an HSL ', () => {

    const hsl = new HSL([180, 100, 50, 1]);
    const mod = new HSL([-240, -20, 25, 0], false);

    const expected = new HSL([300, 80, 75, 1]);


    const culture = new Culture();
    const reference = culture.addColor(hsl);
    const relation = culture.addRelation(mod, reference);

    const result = relation.result;
    expect(result.clamp().toString()).to.equal(expected.toString());
    expect(true).to.equal(true);
  });


});
