const commentRegExp = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;

function cleaerComments(codeLines) {
  return codeLines.join('\n').replace(commentRegExp, '');
}

module.exports = function(codeLines) {
  const filteredText = cleaerComments(codeLines);

  const getMatchesCount = (regExp) => (filteredText.match(regExp) || []).length

  const selectionStatementsCount = getMatchesCount(/if|else if|else|\?|try|catch|switch/g);
  const iterationStatementsCount = getMatchesCount(/do[\s\S]*?while/g);
  const jumpStatementsCount = getMatchesCount(/return|break|goto|exit|continue|throw/g);
  const expressionStatementsCount = 
    getMatchesCount(/\w+\([\s\S]*?\)/g) // function calls
    + getMatchesCount(/[^=]=[^=>]/g) // assignment
    + getMatchesCount(/\{\s*\}/g); // empty statements

  const generalStatementsCount = getMatchesCount(/;/g) - getMatchesCount(/for/g);
  const blockDelimitersCount = getMatchesCount(/\{\S*\}/g) - selectionStatementsCount;
  const dataDeclarationsCount = getMatchesCount(/let|const|var|function/g);

  return selectionStatementsCount
    + iterationStatementsCount
    + jumpStatementsCount
    + expressionStatementsCount
    + generalStatementsCount
    + blockDelimitersCount
    + dataDeclarationsCount;
}