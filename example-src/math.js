// @flow

import toString from './baz';
import num from './qux/hah';

export function add(foo: number, bar: number) {
  return foo + bar;
}

export function sub(a: number, b: number) {
  const fo = add(1, 24423);
  console.log(toString('sasa'), fo, num);

  return a - b;
}
