import 'mocha';

import { expect } from 'chai';

import { Color } from '../src/color';
import { Named } from '../src/named';
import { Parser } from '../src/parser';

describe('Parser tests', () => {

    it('Should correctly format a Hexadecimal string ', () => {
        const name = Parser.formatHEX('#FF0');
        expect(name).to.equal('FFFF00FF');
    });


    it('Should correctly format a Hexadecimal string ', () => {
        const name = Parser.formatHEX('FF0');
        expect(name).to.equal('FFFF00FF');
    });


    it('Should correctly format a Hexadecimal string ', () => {
        const name = Parser.formatHEX('#FF0C');
        expect(name).to.equal('FFFF00CC');
    });

    it('Should correctly format a Hexadecimal string ', () => {
        const name = Parser.formatHEX('');
        expect(name).to.equal(null)
    });

    it('Should correctly format a Hexadecimal string ', () => {
        const name = Parser.formatHEX('#ABC');
        expect(name).to.equal('AABBCCFF');
    });


    
//   it('Should create an RGB color from a hex value ', () => {
//     const color = new Color('#C0FFEE', '', false);
//     expect(color.toString()).to.equal('rgb(192, 255, 238, 1)');
//   });

//   it('Should create an RGB color with proper alpha from a hex value with 8 digits ', () => {
//     const color = new Color('#C0FFEEFF', '', false);
//     expect(color.toString()).to.equal('rgb(192, 255, 238, 1)');
//   });

  
//   it('Should create an RGB color from a hex value with 3 digits ', () => {
//     const color = new Color('#ABC', '', false);
//     expect(color.toString()).to.equal('rgb(170, 187, 204, 1)');
//   });


});
