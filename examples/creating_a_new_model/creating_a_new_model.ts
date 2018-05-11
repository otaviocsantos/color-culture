import { ColorCulture } from '../../src/color-culture';
import { RGB } from '../../src/models/rgb';
import { HSL } from '../../src/models/hsl';
import { Hip } from './hip';


let cc = new ColorCulture();

//register hip to rgb conversion
cc.register(Hip.model, RGB.model, function (val: number) {
  let r = (val >> 16) & 255;
  let g = (val >> 8) & 255;
  let b = val & 255;

  return new RGB(r, b, b);
});

//register rgb to hip conversion
cc.register(RGB.model, Hip.model, function (val: RGB) {
  let dec = (val.r << 16) + (val.g << 8) + (val.b);
  return new Hip(dec);
});


//now it is possible to convert from and from the new model 
//and all the other models registered without the need to create
//new functions to and from every other model.


//Create a instance of the new color model
let newModel = new Hip(16711680); // 16711680 = FF0000 in hexadecimal = 255, 0 ,0 in RGB

//Using the conversions registered before Color Culture will be able to find a path from Hip to HSL automatically
let hsl: HSL = newModel.as(HSL);

console.log(hsl.toString()); //{h: 0, s: 100, l; 50}

console.log(newModel.to(RGB.model).toString()); //{r: 255, g: 0, b; 0}