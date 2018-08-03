// @flow

import baz from './baz';
import { add, sub } from './math';

// const foo = 123;

export default async () => {
  const added = await add(10, 20);
  const subed = sub(added, 1234);

  baz('zzzaz');

  // some huh yup
  // console.log(import.meta);
  if (subed === 2) {
    console.log('okkk');
  } else {
    sub(added, 645645);
    console.log('not ok', added);
  }
};
