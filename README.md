# Color Culture

Color Culture is a library to create Cultures - dynamic color palettes -, it also convert colors between models, accepts new color models defined by the user, offers out of the box modifier methods and many other functionalities.



## Usage

A "hello, world" example, this will create a color black and display its value as a string in an alert window:
```ts
import { RGB } from 'color-culture';

const color = new RGB();

alert(color.rgba)
```

A color may also be created using a string:
```ts
import { Color, RGB } from 'color-culture';

const red = new Color('red'); // this will create a new red RGB color
const blue = new Color('#00FF00'); // this will create a new blue RGB color
const yellow = new Color('#DDDD0080'); // this will create a new yellow RGB color, the last two digits represent its alpha channel
const green = new Color('rgb(0,255,0)'); // this will create a new green RGB color
```


You may also create a color using an array, this will create a green color:
```ts
const color = new RGB([0,250,0,1]);
```

In an RGB model the first three values represent the channles red, green and blue respectively and the last one the alpha channel; alpha channels are used to define transparency.

Color culture comes with some predefined color models: RGB, HSL, CMYK, LAB and XYZ, for example, to creat a CMYK color you may proceed like so;
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
## Custom Color Models

If you need to use a color model not available in Color Culture there are ways to register a new model, as well as conversion functions that will allow you to convert between any other color model present.

### How to register a new color model

Note that without **also registering conversion functions** your custom model would not be capable of much, to learn more about that look into next section.

To have the values of your channels kept within ranges just register you model like so:
```ts
    
    import { BaseFactory } from 'color-culture';

    BaseFactory.setModel('hip', [[0, 65025], [0, 65025], [0, 65025], [0, 255]], 3);

```

In this case the first three channels are bound between values 0 to 65025 inclusive and the last channel between 0 to 255 also iclusive.
Alpha channel is set to the forth channel (3, since we start to count from 0).

Color Culture will automatically keep values in range by min/maxing through ranges, but if there's need to a different approach in keeping values within range you may specify a custom function to do so, for example:
```ts

    import { Base, BaseFactory } from 'color-culture';

    BaseFactory.setModel('hip', [[0, 360], [0, 100], [0, 100], [0, 1]], 3, (model: Base) => {
      model.channels[0] = ((model.channels[0] % 360) + 360) % 360;
      for (let i = 1; i < model.channels.length; i++) {
        model.channels[i] =
          model.ranges[i][0] > model.channels[i]
            ? model.ranges[i][0]
            : model.ranges[i][1] < model.channels[i]
            ? model.ranges[i][1]
            : model.channels[i];
      });
```

After registration you may create a new instance of your color using BaseFactory: 

```ts

    import { BaseFactory } from 'color-culture';

    const color = BaseFactory.createGeneric([100, 50, 50, 1], 'hip');

```


### How to convert to and from a new color model

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

Registration only needs to be done once.

## Cultures
Cultures are like color palettes in the sense that they are groups of colors, but cultures have two distinctive functionalities:

1. You can link one color to another, so changing the source color will affect all colors linked to it.

2. You can create colors based on functions that are executed every time the culture is read.

How is a culture created:
```ts
import { Color, CMYK, RGB, Culture, Relation } from 'color-culture';


// adding a bit of black to a pure yellow should result in a darker yellow

  const bitOfBlack = new CMYK([0, 0, 0, 30, 0]);
  const yellow = new CMYK([0, 0, 100, 0, 1]);

  const culture = new Culture();
  const source = culture.addColor(yellow);


  const relation = culture.addRelation( ()=>{
      return bitOfBlack.add(source)
  } );

  const result = relation.result;
  alert(result.toString()) // darker yellow
  

```

If the original color is changed from yellow to blue, the result will appear as a darker blue instead of darker yellow:

```ts

    const darkCMKYYellow = new CMYK([0, 0, 100, 30, 1]);
    const darkCMKYBlue = new CMYK([100, 100, 0, 30, 1]);

    const bitOfBlack = new CMYK([0, 0, 0, 30, 0]);
    const CMYKyellow = new CMYK([0, 0, 100, 0, 1]);

    const culture = new Culture();

    // add a pure yellow to the culture
    const source = culture.addColor(CMYKyellow);

    // relation is a function
    const relation = culture.addRelation( ()=>{
      // it calls upon the source color using source result
      // and adds a bitOfBlack to it
        return bitOfBlack.add(source.result)
    } );
    
    alert(relation.result.toString()) // this will result in a darker yellow
    
    // if we change the source color to blue
    source.modifier = new CMYK([100, 100, 0, 0, 1]);

    alert(relation.result.toString()) // this will result in a darker blue

  
```

This is an example of a Relation that is independent of any other colors and will return a random shade of green:
```ts
  
  const randomGreen = culture.addRelation( () => {
      return new HSL([150, 50, Math.random() * 75, 1]);
  } );


```

## Color Manipulation

Every instance of the Color class contains commonly used functions for color manipulation.

```ts

  let color = new Color('Turquoise');
  console.log(color.rgba);
  console.log(color.lighten().rgba);

```
  

Modifications can also be chained.

```ts
 
  let color = new Color('Turquoise');
  console.log(color.rgba);
  console.log(color.darken().desaturate());

```
  

Modifications may be changed by an amount ( with the exception of negate, which is absolute ).

```ts
 
  let color = new Color('Turquoise');
  console.log(color.rgba); 
  console.log(color.rotate(120).saturate(55));

```
  

A modification DOES NOT change the original color, but if your intent is to change the original color proceed like so:

```ts

  let color = new Color('Turquoise');
  color.negate(); // this will NOT  change the value of the variable color
  color = color.negate(); // this will update the value of the variable color

```
  
## Color as string

A string representation of a color may be expressed in many ways.

as a hexadecimal:
```ts

  let color = new Color('red');
  color.hex; // #FF0000

```

as an alpha hexadecimal, where the ending two digist represent the alpha channel:
```ts

  let color = new Color('red');
  color.hexa; // #FF0000FF 

```

and, of course, using toString:
```ts

  let color = new Color('red');
  color.toString(); // rgb(255,0,0,1)

  color = new CMYK([0,100,100,0,1])
  color.toString(); // cmyk(0,100,100,0,1)
  
```

## Installation

npm i color-culture --save


## Examples
Examples can be found in:

Angular application: https://github.com/otaviocsantos/color-culture-angular-example

Vue application: https://github.com/otaviocsantos/color-culture-vue-example


## Change Log
5.0.3,

Fixes: 

Contrast now works correctly when used with models other than RGB.

5.0.2,

Fixes: 

Named.getName now returns a color's name by its value.

New Features: 

  Color constructor now accepts a color instance as parameter to create a new color.
  
  Named.getValue returns a color's value by its name.
  
  Added test cases to new methods.
  
  Added documentation to some methods.
  
  Updated docs.
  
5.0.1
  
  Fixes:
  
  Documentation for contrast method.

5.0.0 
  
  Breaking changes:
  
  Removed spaces from names in Named.css.
  
  Renamed Named.css to Named.names.
  
  New features: 
  
  Added HSV color model.

  New contrast modifier: makes sure your color is readable.

  New Range class to create gradients.

  Named now accepts user defined names.

  Expanded tests.

  Fixes:
  
  Color convertions fixes between RGB <-> XYZ

4.0.0 

New and improved, hopefully better maintained in the future...

3.0.0 

Made Relation more flexible, expanded documentation, added test cases, fixed round bug when calling rgba, better creation from string, better support for custom models.

2.0.0 

Ground up rewrite and streamlining.

2.0.1 

Small fix in documentation and link to Angular app example.

2.0.2 

Expanded documentation and link to Vue app example.

2.1.0 

Added new creation methods to BaseFactory, fixed some some creation methods in BaseFactory. Updated documentation.

2.1.1 

Fixed small typos in README

2.1.2 

Added custom color model CRUD methods to BaseFactory.