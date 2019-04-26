import { Color } from './color';
import { Relation } from './relation';
import { Compute } from '.';

/**
 * Ccollection of groups of colors indexed by names
 */
export class Culture {
  get items() {
    return this.m_items;
  }

  /**
   * Ccollection of groups of colors indexed by names
   */
  protected m_items = new Array<Relation>();

  /**
   * Create a collection of groups of colors indexed by names
   */
  constructor() {}

  /**
   * Add a color to this culture
   * @param color Color to be added
   */
  public addColor(color: Color): Relation {
    if (color !== undefined && color !== null) {
      const rel = new Relation(color);

      this.m_items.push(rel);

      return rel;
    }
    throw new Error('Culture cant add an undefined color');
  }

  public addRelation(modifier: any = null, from?: Relation | undefined, list = null): Relation {
    const relation = new Relation(modifier, from, list);

    if (relation.from != undefined) {
      relation.fromList = this.m_items;
    }

    this.m_items.push(relation);

    return relation;
  }

  // According to https://sighack.com/post/averaging-rgb-colors-the-right-way, https://www.youtube.com/watch?v=LKnqECcg6Gw
  /**
   * Average color of the items in this Culture
   */
  public get average(): Color {
    const colors = this.items.map(o => {
      return o.result.rgb();
    });
    return Compute.average(colors);
  }

  /**
   * Remove item from culture
   * @param name Item id
   */
  removeById(id: string): Relation | undefined {
    let result = undefined;
    if (id != '') {
      const index = this.items.findIndex(o => o.id == id);
      if (index > -1) {
        let result = this.items.splice(index, 1);
      }
    }
    return result;
  }

  remove(relation: Relation): Relation | undefined {
    if (relation == undefined) throw new Error('Culture cannot remove an undefined relation');
    return this.removeById(relation.id);
  }

  /**
   * Get an item by its id
   * @param id Item id
   */
  getById(id: string): Relation | undefined {
    let result = undefined;
    if (id != '') {
      const index = this.items.findIndex(o => o.id == id);
      if (index > -1) {
        let result = this.items[index];
      }
    }
    return result;
  }

  /**
  /* Pick a random color vertex of the path
  */
  randomColor(): Color | undefined {
    if (this.items == undefined || this.items.length === 0) {
      throw new Error('Cannot pick random color of an empty culture');
    }

    const index = Math.floor(Math.random() * this.items.length);

    return this.items[index].result;
  }

  /**
   * Get a Color from mixing two random colors in this culture
   */
  randomMix(): Color {
    if (this.items == undefined || this.items.length === 0) {
      throw new Error('Cannot pick random color mix of an empty culture');
    }
    const pool = [...this.items];
    let size = pool.length;
    const firstColor = pool.splice(Math.floor(Math.random() * size))[0].result;
    if (size === 1) {
      return firstColor;
    }
    size = pool.length;
    const secondColor = pool.splice(Math.floor(Math.random() * size))[0].result;

    return secondColor.mix(firstColor, Math.random());
  }
}