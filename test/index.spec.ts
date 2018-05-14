import { expect } from 'chai';
import 'mocha';

import { Color } from '../src//models/color';
import { CSS } from '../src//models/css';
import { HSL } from '../src//models/hsl';
import { RGB } from '../src//models/rgb';
import { ColorCulture } from '../src';

let cc = new ColorCulture();

describe('control group', () => {

  it('if not even this one is passing something else is wrong...', () => {
    expect(true).to.equal(true);

  });
});
