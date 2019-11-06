// @flow
import 'regenerator-runtime/runtime';
import type { compare1, compare2 } from 'tObject';
import filterKey from './iteration';

describe('Verify Some Types', () => {
  test("Find object key", () => {
    const obj = {
      name: 'test key',
      id: 1
    }
    const res = filterKey<string>(obj, 'id');
    expect(res).toBe('id');
  });
  test('Compare unary words alphabetically unequal', () => {
    const comp: compare1<string> = x => (y) => {
      // take the leading chars and compare until different or end of strings
      const xx = x.trim();
      const yy = y.trim();
      if (xx.length === 0 && yy.length === 0) return 0;
      const xFirst = xx.substring(0, 1).toLowerCase().charCodeAt(0);
      const yFirst = yy.substring(0, 1).toLowerCase().charCodeAt(0);
      if (xFirst > yFirst) return 1;
      if (xFirst < yFirst) return -1;
      return comp(xx.substring(1, xx.length))(yy.substring(1, yy.length));
    };
    expect(comp('aad')('Abcd')).toBe(-1);
  });
  test('Compare binary words alphabetically unequal', () => {
    const comp: compare2<string> = (x, y) => {
      // take the leading chars and compare until different or end of strings
      const xx = x.trim();
      const yy = y.trim();
      if (xx.length === 0 && yy.length === 0) return 0;
      const xFirst = xx.substring(0, 1).toLowerCase().charCodeAt(0);
      const yFirst = yy.substring(0, 1).toLowerCase().charCodeAt(0);
      if (xFirst > yFirst) return 1;
      if (xFirst < yFirst) return -1;
      return comp(xx.substring(1, xx.length), yy.substring(1, yy.length));
    };
    expect(comp('bcd', 'Abcd')).toBe(1);
  });
})