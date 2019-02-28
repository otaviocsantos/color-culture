# Color Culture

Color naming and conversion library, with automatic path finding between color models.

Color Culture makes color conversion easier by automatically finding a way to convert from one color model to another.

To create on color you just need to select the desired color model:
```ts

import { RGB } from 'rgb';

let colorA: RGB = new RGB(0, 0, 255); //blue
```

To convert to another color model just call the function connected to the desired color model:
```ts

import { HSL } from 'hsl';

let colorB:HSL = colorA.hsl();
```

## Installation

npm i color-culture --save

## Usage

A "hello, world" style example, this will create a color black and display its value as a string in an alert window:
```ts
import { RGB } from 'color-culture';

const color = new RGB();

alert(color.rgba)
```

A color may also be created using its name as in:
```ts
import { Color, RGB } from 'color-culture';

const red = new Color('red'); // this will create a new red RGB color
const blue = new Color('#00FF00'); // this will create a new blue RGB color
```


To define de values of the channels in a color use an array, this will create a green color:
```ts
const color = new RGB([0,250,0,1]);
```

In an RGB model the first three values represent the channles red, green and blue respectively and the last one the alpha channel.

Color culture comes with predefined color models: RGB, HSL, CMYK, LAB and XYZ, to creat a CMYK color proceed like so;
```ts
import { CMYK } from 'color-culture';

const color = new CMYK([100,100,0,0,1]); // which is blue
```

### Conversion

Color Culture converts between CMYK, HSL, LAB, RGB and XYZ out of the box
```ts
import { CMYK, HSL, LAB, RGB } from 'color-culture';


let colorA = new RGB([0, 0, 255, 1]);
let colorB = colorA.hsl();
let colorC = colorB.to(LAB.MODEL);
let colorD = colorC.to('xyz');
```

### How to work with new color models

In case you have a new color model there's no need to create conversion functions to all others color models, Color Culture uses https://www.npmjs.com/package/ngraph.path to automatically find the shortest path between models.

Conversion work as long as there's at least **one** function converting **to** RGB, HSL, CMYK, LAB or XYZ and **one** function converting **from** RGB, HSL, CMYK, LAB or XYZ to your new model.

First pick a call name to your model, in this example 'hip' will be used, then register functions on how to convert **to** and **from** your model:
```ts
import { Base, BaseFactory, Color, HSL, Converter } from 'color-culture';

Converter.register('hsl', 'hip',
      (value: Base): Base => { 
            // code to convert, check /tests/custom_model.spec.ts in repository for the full example
       }); 

Converter.register('hip', 'hsl',
      (value: Base): Base => { 
            // code to convert, check /tests/custom_model.spec.ts in repository for the full example
       }); 
//to use

let original = new CMYK([48,78,10,5,1]);
let converted = original.to('hip');
```

## Cultures
Are like palettes in the sense that they are groups of colors, but with cultures have two main new functionalities:

1. You can link one color to another, so changing one color will affect all colors linked to it.

2. You can create colors based on functions that are executed every time the culture is read.

```ts
import { Color, CMYK, RGB, Culture, Relation } from 'color-culture';

// RGB yellow plus CMYK K20% should result in dark CMYK yellow
  const darkCMKYYellow = new CMYK([0, 0, 100, 20, 1]);
  const cmykMod = new CMYK([0, 0, 0, 20, 0]);

  const culture = new Culture();
  const source = culture.addColor(yellow);


  const relation = culture.addRelation(cmykMod, source);
  const result = relation.result;
  alert(result.toString()) // dark yellow
  

```

In this example if the first color is changed to blue, the color linked to it will appear as a dark blue:

```ts

  source.modifier = new Color('blue');
  alert(result.toString()) // dark blue
  
```

This relation is a function independet of other colors and will return a shade of green every time this culture is read:
```ts

  
  const randomGreen = culture.addRelation(() => {
      return new HSL([150, 50, Math.random() * 75, 1]);
  });

```

## Examples
Examples can be found in:

Angular application: https://github.com/otaviocsantos/color-culture-angular-example

