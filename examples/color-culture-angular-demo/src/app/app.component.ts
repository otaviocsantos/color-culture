import { Component, ViewChild,
  AfterViewInit,
  ElementRef,
  OnInit} from '@angular/core';
import { ColorCulture } from 'color-culture';
import { RGB } from 'color-culture';
import { HSL } from 'color-culture';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Color Culture';
  cc: ColorCulture;
  rgb: RGB;
  hsl: HSL;

  @ViewChild('sample') sample: ElementRef;

  constructor() {
    this.cc = new ColorCulture();
    this.rgb = new RGB(128, 0, 0);
    this.hsl = new HSL(0, 0, 0);
  }

  ngOnInit() {
    this.updateFromRGB();
  }

  updateFromRGB() {
    this.hsl = this.rgb.as(HSL);
    this.sample.nativeElement.style['background-color'] = `rgb(${this.rgb.r},${this.rgb.g},${this.rgb.b})`;
  }

  updateFromHSL() {
    this.rgb = this.hsl.as(RGB);
  }
}
