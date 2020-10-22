import { expect } from 'chai';
import 'mocha';

import { Color } from '../src/color';
import { Culture } from '../src/culture';
import { HSL, LAB, RGB, XYZ } from '../src/models';


describe('Culture tests', () => {
  const color = new HSL([0, 100, 50]);

  it('a Color should be correctly added ', () => {

    const hsl = new HSL([180, 100, 50, 1]);
    const mod = new HSL([-240, -20, 25, 0], false);

    const expected = new HSL([300, 80, 75, 1]);


    const culture = new Culture();
    const reference = culture.addColor(hsl);
    const relation = culture.addRelation(()=>{
      return hsl.add(mod);
    });

    const result = relation.result;
    expect(result.clamp().toString()).to.equal(expected.toString());
    expect(true).to.equal(true);
  });
});


