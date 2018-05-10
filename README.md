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
```ts
import { ColorCulture } from 'color-culture';
```

Instantiate the main class:
```ts

const cc = new ColorCulture();
```

### Conversion

Basic color conversion is provided to RGB, HSL and XYZ.
```ts
// import models
import { RGB } from 'rgb';
import { HSL } from 'hsl';

// instantiate Color Culture
const cc = new ColorCulture();

let colorA: RGB = new RGB(0, 0, 255); //blue
let colorB: HSL = colorA.hsl();
```

### How to work with new color models

In case you have a new color model there's no need to create conversion functions to all others color models, Color Culture will automatically find the shortest path between models. 

Conversion work as long as there's at least **one** function converting **to** **RGB** or **HSL**, and **one** function converting **from** **RGB** or **HSL** to your new model
```ts
// import color culture
import { ColorCulture } from 'color-culture';
// import color class to extend it
import { Color } from 'color';

// import converter to register your converting functions
import { Converter } from 'converter';

// import models
import { RGB } from 'rgb';
import { HSL } from 'hsl';
import { Hip } from 'hipothetical-colormodel'; // your hipothetical new color model


// instantiate Color Culture
const cc = new ColorCulture();

// register your converting functions
// from RGB to your color model
Converter.register("RGB", "HIP", Converter.register(RGB.model, HIP.model,
      function (value: any): HIP { ... })

// from your color model to RGB
Converter.register(HIP.model, RGB.model,
      function (value: any): RGB { ... })

//now you can convert from your color model to and from any other color model registered
//without the need to create functions to every color model
let colorA: HIP = new HIP(...hipothetical values);
let colorB: HSL = colorA.hsl(); // color culture will convert colorA->RGB->HSL

```

## Examples
Examples can be found in __examples__ folder, remember to execute __npm install__ in order to install all packages needed.

## Test 
To run tests execute in a terminal:
```sh
npm run test
```