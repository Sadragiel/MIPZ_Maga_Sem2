const fs = require('fs');
const path = require('path');
const sourceSearch = require('./sourceSearch');
const commentSearch = require('./commentSearch');

// Put path to the library here
const PATH_TO_LIBRARY = './test';

const EMPTY_PHYSICAL_LINES_MULTIPLIER = 0.25;

const measures = {
  lines: 0,
  emptyLines: 0,
  sourceLines: 0,
  commentLines: 0,
};

function walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      walkSync(path.join(dir, file.name));
      continue;
    }

    if(!/.js$/.test(file.name)) {
      // skip non-script files
      continue;
    }

    const text = fs.readFileSync(path.resolve(dir, file.name)).toString();

    const fileLines = text.split('\n').map(line => line.trim());

    measures.lines += fileLines.length;
    measures.emptyLines += fileLines.reduce((acc, cur) => cur ? acc : acc + 1, 0);
    measures.sourceLines += sourceSearch(fileLines);
    measures.commentLines += commentSearch(fileLines);
  }
}

walkSync(path.resolve(__dirname, PATH_TO_LIBRARY));

console.log('Кількість рядків коду : ', measures.lines);
console.log('Кількість пустих рядків коду : ', measures.emptyLines);
console.log('Кількість фізичних рядків коду : ', measures.lines - Math.floor(measures.emptyLines * (1 - EMPTY_PHYSICAL_LINES_MULTIPLIER)));
console.log('Кількість логічних рядків коду : ', measures.sourceLines);
console.log('Кількість рядків з коментарями : ', measures.commentLines);
console.log('Рівень коментування : ', measures.commentLines / measures.lines);
