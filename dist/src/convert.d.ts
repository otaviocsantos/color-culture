import { Color } from './models/color';
/**
 * Helper class, call color conversion functions.
 * Each function is connected to a pair of strings that represent the models
 * from which and to which the color will be converterd.
 */
export declare class Convert {
    /**
     * internal list of conversion functions
     */
    protected static conversions: Map<string, (n: any) => any>;
    /**
     * internal graph of conversion functions, used to find shortest path between functions
     */
    protected static graph: any;
    /**
     * Character used to separate string pairs when indexing conversion functions
     */
    private static readonly divider;
    /**
     * Assigns a function to string pair FROM, TO, the function must be able to convert between color models
     * @param from Color signature from wich the conversion will be made, eg: "RGB"
     * @param to Color signature to wich the conversion will be made, eg: "HSL"
     * @param func Function that does the color conversion
     */
    static register(from: string, to: string, func: (n: any) => any): void;
    /**
     * Return true if there's a function registered to this pair of color models, returns false otherwise.
     * @param from Color model signature from which color will be converted
     * @param to Color model signature to which color will be converted
     */
    static has(from: string, to: string): boolean;
    /**
     * Convert a color to another color model, defined by a string in to parameter
     * @param from Color to be converted
     * @param to Color model signature to which a color will be converted
     */
    static it(from: Color, to: string): any;
    /**
     * Remove an index from conversions functions list
     * @param from Color model signature representing origin color
     * @param to Color model signature representing destiny color
     */
    static delete(from: string, to: string): boolean;
}
