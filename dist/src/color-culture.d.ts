/**
 * Color Culture, the shortest path between two colors
 */
export declare class ColorCulture {
    /**
     * this module version
     */
    static readonly version: string;
    /**
      * When Color Culture is instantiated it register basic conversion functions
      */
    constructor();
    /**
     * Convenience method, provide conversion without the need to import Converter
     * @param from Color signature from wich the conversion will be made, eg: "RGB"
       * @param to Color signature to wich the conversion will be made, eg: "HSL"
       * @param func Function that does the color conversion
     */
    register(from: string, to: string, func: (n: any) => any): void;
}
