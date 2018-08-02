'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const path = require('path');
const proc = require('process');

const fs = require('fs-extra');
const spawn = require('cross-spawn');
const babelCode = require('@babel/code-frame');

const { colors } = require('./utils');

/* eslint-disable no-param-reassign */

module.exports = async function flowtype() {
  return new Promise((resolve, reject) => {
    const cp = spawn('flow', ['check', '--json', '--json-version', '2']);

    cp.stdout.on('data', async (buf) => {
      const promise = Promise.resolve(buf.toString()).then(JSON.parse);

      promise.catch(reject);

      const result = await promise;

      if (result.passed) {
        resolve();
        return;
      }

      console.error('');

      result.errors
        .map(normalize)
        .map(normalizeRefs('primary'))
        .map(normalizeRefs('root'))
        .map(getContents)
        .map(createFrame)
        .forEach(outputError);

      console.error(colors.bold.red(result.errors.length, 'errors found.'));
      reject();
    });
  });
};

function normalize({ primaryLoc, referenceLocs, messageMarkup }) {
  const message = messageMarkup
    .reduce((acc, item) => {
      if (item.kind === 'Text') {
        return acc.concat(item.text);
      }
      if (item.kind === 'Code') {
        return acc.concat(colors.bold(item.text));
      }
      if (item.kind === 'Reference') {
        const type = item.message[0].text;
        return acc.concat(colors.underline(type), ' ', `[${item.referenceId}]`);
      }

      return acc;
    }, [])
    .join('')
    .replace('[1]', colors.bold.blue('[1]'))
    .replace('[2]', colors.bold.red('[2]'));

  return { message, primary: primaryLoc, root: referenceLocs['2'] };
}

function normalizeRefs(type) {
  return (res) => {
    if (type === 'root' && !res.root) {
      return res;
    }

    const refStart = res[type].start;
    const refEnd = res[type].end;

    const ref = {
      filepath: res[type].source,
      loc: {
        start: { line: refStart.line, column: refStart.column },
        end: { line: refEnd.line, column: refEnd.column + 1 },
      },
      id: type === 'primary' ? '[1]' : '[2]',
    };
    ref.path = path.relative(proc.cwd(), ref.filepath);
    ref.path = `${ref.path}:${ref.loc.start.line}:${ref.loc.start.column}`;

    res[type] = ref;
    return res;
  };
}

const CACHE = {};
function getContents({ primary, root, message }) {
  primary.content = CACHE[primary.filepath]
    ? CACHE[primary.source]
    : fs.readFileSync(primary.filepath, 'utf8');

  if (root) {
    root.content = CACHE[root.filepath]
      ? CACHE[root.source]
      : fs.readFileSync(root.filepath, 'utf8');
  }

  return { primary, root, message };
}

function createFrame({ primary, root, message }) {
  primary.frame = babelCode.codeFrameColumns(primary.content, primary.loc, {
    highlightCode: false,
    message: colors.blue(primary.id),
  });
  if (root) {
    root.frame = babelCode.codeFrameColumns(root.content, root.loc, {
      highlightCode: false,
      message: colors.red(root.id),
    });
  }

  return { primary, root, message };
}

function outputError({ primary, root, message }) {
  console.error(
    `${colors.red('error')}: ${colors.bold('some type failures found')}`,
    colors.dim('(null)'),
    `${colors.green(primary.path)}:`,
  );

  console.error(message);
  console.error('');
  console.error(colors.blue(primary.path));
  console.error(primary.frame);
  if (root) {
    console.error('');
    console.error(colors.red(root.path));
    console.error(root.frame);
  }
  console.error('');
}
