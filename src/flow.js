'use strict';

const path = require('path');
const proc = require('process');

const fs = require('fs-extra');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const babelCode = require('@babel/code-frame');

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

      console.error(chalk.bold.red(result.errors.length, 'errors found.'));
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
        return acc.concat(chalk.bold(item.text));
      }
      if (item.kind === 'Reference') {
        const type = item.message[0].text;
        return acc.concat(chalk.underline(type), ' ', `[${item.referenceId}]`);
      }

      return acc;
    }, [])
    .join('')
    .replace('[1]', chalk.bold.blue('[1]'))
    .replace('[2]', chalk.bold.red('[2]'));

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
    message: chalk.blue(primary.id),
  });
  if (root) {
    root.frame = babelCode.codeFrameColumns(root.content, root.loc, {
      highlightCode: false,
      message: chalk.red(root.id),
    });
  }

  return { primary, root, message };
}

function outputError({ primary, root, message }) {
  console.error(
    `${chalk.red('error')}: ${chalk.bold('some type failures found')}`,
    chalk.dim('(null)'),
    `${chalk.green(primary.path)}:`,
  );

  console.error(message);
  console.error('');
  console.error(chalk.blue(primary.path));
  console.error(primary.frame);
  if (root) {
    console.error('');
    console.error(chalk.red(root.path));
    console.error(root.frame);
  }
  console.error('');
}
