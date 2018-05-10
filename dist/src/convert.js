"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @ignore
 */
const graphLib = require('ngraph.graph');
/**
 * @ignore
 */
const path = require('ngraph.path');
/**
 * Helper class, call color conversion functions.
 * Each function is connected to a pair of strings that represent the models
 * from which and to which the color will be converterd.
 */
class Convert {
    /**
     * Assigns a function to string pair FROM, TO, the function must be able to convert between color models
     * @param from Color signature from wich the conversion will be made, eg: "RGB"
     * @param to Color signature to wich the conversion will be made, eg: "HSL"
     * @param func Function that does the color conversion
     */
    static register(from, to, func) {
        Convert.conversions.set(from + this.divider + to, func);
        Convert.graph.addNode(from);
        Convert.graph.addNode(to);
        Convert.graph.addLink(from, to);
    }
    /**
     * Return true if there's a function registered to this pair of color models, returns false otherwise.
     * @param from Color model signature from which color will be converted
     * @param to Color model signature to which color will be converted
     */
    static has(from, to) {
        return Convert.conversions.has(from + Convert.divider + to);
    }
    /**
     * Convert a color to another color model, defined by a string in to parameter
     * @param from Color to be converted
     * @param to Color model signature to which a color will be converted
     */
    static it(from, to) {
        if (from.signature == to) {
            return from;
        }
        if (Convert.has(from.signature, to)) {
            let func = Convert.conversions.get(from.signature + Convert.divider + to);
            let res = func.call(func, from);
            return res;
        }
        let result = from;
        let pathFinder = path.aStar(Convert.graph, null);
        let p = pathFinder.find(from.signature, to).reverse();
        //first step is equal to color from, so remove it in order to save processing
        //and go directly to second step
        p.shift();
        if (p) {
            for (let index in p) {
                if (result.signature != p[index].id) {
                    //result = Convert.conversions[result.signature + Convert.divider + p[index].id].apply(result);
                    let func = Convert.conversions.get(result.signature + Convert.divider + p[index].id);
                    return func.apply(from);
                }
            }
        }
        return null;
    }
    /**
     * Remove an index from conversions functions list
     * @param from Color model signature representing origin color
     * @param to Color model signature representing destiny color
     */
    static delete(from, to) {
        return Convert.conversions.delete(from + this.divider + to);
    }
}
/**
 * internal list of conversion functions
 */
Convert.conversions = new Map();
/**
 * internal graph of conversion functions, used to find shortest path between functions
 */
Convert.graph = graphLib();
/**
 * Character used to separate string pairs when indexing conversion functions
 */
Convert.divider = "_";
exports.Convert = Convert;
