"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
/**
 * CSS Color Model
 */
class CSS extends color_1.Color {
    /**
     * Instantiate a new CSS color model Class
     * @param val string value, as the form of
     * _named: cyan, red, black, blue, green, white, yellow, etc...
     * hexadecimal: #000 | #FFFFFF
     * rgb|rgba : rgb(0,127,255) , rgba(255,0,127,0.1), rgb(0%,50%,100%)
     * hsl|hsla : hsl(0,0,0) , hsla(20,30,40,0.1), rgb(10%,20%,30%)
     */
    constructor(val = "#000000") {
        super();
        /**
         * internal original string value
         */
        this._value = "";
        this._hexValue = "";
        if (!CSS._named) {
            CSS.setNamedIndex();
        }
        this.value = val;
    }
    static setNamedIndex() {
        CSS._named = new Map();
        CSS._named.set("aliceblue", "F0F8FF");
        CSS._named.set("antiquewhite", "FAEBD7");
        CSS._named.set("aqua", "00FFFF");
        CSS._named.set("aquamarine", "7FFFD4");
        CSS._named.set("azure", "F0FFFF");
        CSS._named.set("beige", "F5F5DC");
        CSS._named.set("bisque", "FFE4C4");
        CSS._named.set("black", "000000");
        CSS._named.set("blanchedalmond", "FFEBCD");
        CSS._named.set("blue", "0000FF");
        CSS._named.set("blueviolet", "8A2BE2");
        CSS._named.set("brown", "A52A2A");
        CSS._named.set("burlywood", "DEB887");
        CSS._named.set("cadetblue", "5F9EA0");
        CSS._named.set("chartreuse", "7FFF00");
        CSS._named.set("chocolate", "D2691E");
        CSS._named.set("coral", "FF7F50");
        CSS._named.set("cornflowerblue", "6495ED");
        CSS._named.set("cornsilk", "FFF8DC");
        CSS._named.set("crimson", "DC143C");
        CSS._named.set("cyan", "00FFFF");
        CSS._named.set("darkblue", "00008B");
        CSS._named.set("darkcyan", "008B8B");
        CSS._named.set("darkgoldenrod", "B8860B");
        CSS._named.set("darkgray", "A9A9A9");
        CSS._named.set("darkgrey", "A9A9A9");
        CSS._named.set("darkgreen", "006400");
        CSS._named.set("darkkhaki", "BDB76B");
        CSS._named.set("darkmagenta", "8B008B");
        CSS._named.set("darkolivegreen", "556B2F");
        CSS._named.set("darkorange", "FF8C00");
        CSS._named.set("darkorchid", "9932CC");
        CSS._named.set("darkred", "8B0000");
        CSS._named.set("darksalmon", "E9967A");
        CSS._named.set("darkseagreen", "8FBC8F");
        CSS._named.set("darkslateblue", "483D8B");
        CSS._named.set("darkslategray", "2F4F4F");
        CSS._named.set("darkslategrey", "2F4F4F");
        CSS._named.set("darkturquoise", "00CED1");
        CSS._named.set("darkviolet", "9400D3");
        CSS._named.set("deeppink", "FF1493");
        CSS._named.set("deepskyblue", "00BFFF");
        CSS._named.set("dimgray", "696969");
        CSS._named.set("dimgrey", "696969");
        CSS._named.set("dodgerblue", "1E90FF");
        CSS._named.set("firebrick", "B22222");
        CSS._named.set("floralwhite", "FFFAF0");
        CSS._named.set("forestgreen", "228B22");
        CSS._named.set("fuchsia", "FF00FF");
        CSS._named.set("gainsboro", "DCDCDC");
        CSS._named.set("ghostwhite", "F8F8FF");
        CSS._named.set("gold", "FFD700");
        CSS._named.set("goldenrod", "DAA520");
        CSS._named.set("gray", "808080");
        CSS._named.set("grey", "808080");
        CSS._named.set("green", "008000");
        CSS._named.set("greenyellow", "ADFF2F");
        CSS._named.set("honeydew", "F0FFF0");
        CSS._named.set("hotpink", "FF69B4");
        CSS._named.set("indianred ", "CD5C5C");
        CSS._named.set("indigo ", "4B0082");
        CSS._named.set("ivory", "FFFFF0");
        CSS._named.set("khaki", "F0E68C");
        CSS._named.set("lavender", "E6E6FA");
        CSS._named.set("lavenderblush", "FFF0F5");
        CSS._named.set("lawngreen", "7CFC00");
        CSS._named.set("lemonchiffon", "FFFACD");
        CSS._named.set("lightblue", "ADD8E6");
        CSS._named.set("lightcoral", "F08080");
        CSS._named.set("lightcyan", "E0FFFF");
        CSS._named.set("lightgoldenrodyellow", "FAFAD2");
        CSS._named.set("lightgray", "D3D3D3");
        CSS._named.set("lightgrey", "D3D3D3");
        CSS._named.set("lightgreen", "90EE90");
        CSS._named.set("lightpink", "FFB6C1");
        CSS._named.set("lightsalmon", "FFA07A");
        CSS._named.set("lightseagreen", "20B2AA");
        CSS._named.set("lightskyblue", "87CEFA");
        CSS._named.set("lightslategray", "778899");
        CSS._named.set("lightslategrey", "778899");
        CSS._named.set("lightsteelblue", "B0C4DE");
        CSS._named.set("lightyellow", "FFFFE0");
        CSS._named.set("lime", "00FF00");
        CSS._named.set("limegreen", "32CD32");
        CSS._named.set("linen", "FAF0E6");
        CSS._named.set("magenta", "FF00FF");
        CSS._named.set("maroon", "800000");
        CSS._named.set("mediumaquamarine", "66CDAA");
        CSS._named.set("mediumblue", "0000CD");
        CSS._named.set("mediumorchid", "BA55D3");
        CSS._named.set("mediumpurple", "9370DB");
        CSS._named.set("mediumseagreen", "3CB371");
        CSS._named.set("mediumslateblue", "7B68EE");
        CSS._named.set("mediumspringgreen", "00FA9A");
        CSS._named.set("mediumturquoise", "48D1CC");
        CSS._named.set("mediumvioletred", "C71585");
        CSS._named.set("midnightblue", "191970");
        CSS._named.set("mintcream", "F5FFFA");
        CSS._named.set("mistyrose", "FFE4E1");
        CSS._named.set("moccasin", "FFE4B5");
        CSS._named.set("navajowhite", "FFDEAD");
        CSS._named.set("navy", "000080");
        CSS._named.set("oldlace", "FDF5E6");
        CSS._named.set("olive", "808000");
        CSS._named.set("olivedrab", "6B8E23");
        CSS._named.set("orange", "FFA500");
        CSS._named.set("orangered", "FF4500");
        CSS._named.set("orchid", "DA70D6");
        CSS._named.set("palegoldenrod", "EEE8AA");
        CSS._named.set("palegreen", "98FB98");
        CSS._named.set("paleturquoise", "AFEEEE");
        CSS._named.set("palevioletred", "DB7093");
        CSS._named.set("papayawhip", "FFEFD5");
        CSS._named.set("peachpuff", "FFDAB9");
        CSS._named.set("peru", "CD853F");
        CSS._named.set("pink", "FFC0CB");
        CSS._named.set("plum", "DDA0DD");
        CSS._named.set("powderblue", "B0E0E6");
        CSS._named.set("purple", "800080");
        CSS._named.set("rebeccapurple", "663399");
        CSS._named.set("red", "FF0000");
        CSS._named.set("rosybrown", "BC8F8F");
        CSS._named.set("royalblue", "4169E1");
        CSS._named.set("saddlebrown", "8B4513");
        CSS._named.set("salmon", "FA8072");
        CSS._named.set("sandybrown", "F4A460");
        CSS._named.set("seagreen", "2E8B57");
        CSS._named.set("seashell", "FFF5EE");
        CSS._named.set("sienna", "A0522D");
        CSS._named.set("silver", "C0C0C0");
        CSS._named.set("skyblue", "87CEEB");
        CSS._named.set("slateblue", "6A5ACD");
        CSS._named.set("slategray", "708090");
        CSS._named.set("slategrey", "708090");
        CSS._named.set("snow", "FFFAFA");
        CSS._named.set("springgreen", "00FF7F");
        CSS._named.set("steelblue", "4682B4");
        CSS._named.set("tan", "D2B48C");
        CSS._named.set("teal", "008080");
        CSS._named.set("thistle", "D8BFD8");
        CSS._named.set("tomato", "FF6347");
        CSS._named.set("turquoise", "40E0D0");
        CSS._named.set("violet", "EE82EE");
        CSS._named.set("wheat", "F5DEB3");
        CSS._named.set("white", "FFFFFF");
        CSS._named.set("whitesmoke", "F5F5F5");
        CSS._named.set("yellow", "FFFF00");
        CSS._named.set("yellowgreen", "9ACD32");
    }
    /**
       * Returns this color type model. For example a color instance of HSL class will return HSL.model, ie "HSL".
       */
    get signature() {
        return CSS.model;
    }
    /**
     * set string value
     */
    set value(val) {
        if (val == undefined || val == null)
            return;
        if (typeof val === "string") {
            this._value = val.toLowerCase();
            //check for #hex
            if (this._value.substr(0, 1) == "#") {
                this._hexValue = this._value.substr(1);
            }
            //check for rgb/rgba
            else if (this._value.substr(0, 3) == "rgb") {
                //percentage or absolute?
                let isPercentage = val.indexOf("%") > -1;
                //check for syntax
                let values;
                //is it , separated?
                if (val.indexOf(",") > -1) {
                    values = val.split("(")[1].split(")")[0].split(",");
                }
                else {
                    //then it must be divided by blank space
                    const isThereAlpha = val.split("/");
                    values = val.split("(")[1].split(")")[0].split(" ");
                    if (isThereAlpha.length == 2) {
                        let alp = isThereAlpha[1].split(")")[0];
                        if (!alp.endsWith("%")) {
                            this.alpha = Number(alp);
                        }
                        else {
                            this.alpha = Number(alp.slice(0, -1)) / 100;
                        }
                    }
                }
                //all values have % or none, otherwise issue an error
                //0 means we haven't started checking yet
                //1 the value has no %
                //2 the value has a %
                let allOrNone = "";
                this._hexValue = "";
                for (let i = 0; i < 3; i++) {
                    let checkOne = values[i].endsWith("%") ? "%" : "-";
                    if (allOrNone == "") {
                        allOrNone = checkOne;
                    }
                    else if (allOrNone != checkOne) {
                        throw new Error("Don't mix integers and percentages.");
                    }
                    if (checkOne == "%") {
                        let asNumber = Number(values[i].slice(0, -1));
                        asNumber = Math.round(asNumber / 100 * 255);
                        this._hexValue += ("0" + (asNumber.toString(16))).slice(-2).toUpperCase();
                    }
                    else {
                        const asNumber = Math.round(Number(values[i]));
                        this._hexValue += ("0" + (asNumber.toString(16))).slice(-2).toUpperCase();
                    }
                }
            }
            //check for _named
            else if (CSS._named.has(this._value)) {
                this._hexValue = CSS._named.get(this._value);
            }
            else {
                throw new Error("It wasn't possible to parse color " + this._value);
            }
        }
        else {
            super.value = val;
        }
    }
    /**
     * get original string value
     */
    get value() {
        return this._value;
    }
    /**
     * get original string value parsed as a hexadecimal value, eg: abcdef
     */
    get hexValue() {
        return this._hexValue;
    }
    /*
    function parseColor(input) {
      if (input.substr(0,1)=="#") {
      var collen=(input.length-1)/3;
      var fact=[17,1,0.062272][collen-1];
      return [
          Math.round(parseInt(input.substr(1,collen),16)*fact),
          Math.round(parseInt(input.substr(1+collen,collen),16)*fact),
          Math.round(parseInt(input.substr(1+2*collen,collen),16)*fact)
      ];
      }
      else return input.split("(")[1].split(")")[0].split(",").map(Math.round);
  }
    */
    /**
     * This class representation as a string, with h,s,l vals exposed.
     */
    toString() {
        return `value: ${this.value}}`;
    }
}
/**
   * Read only string constant used to identify this color model
   */
CSS.model = "CSS";
exports.CSS = CSS;
