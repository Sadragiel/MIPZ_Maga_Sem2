const ONE_LINE_COMMENT_KEY = '//';
const MULTI_LINE_COMMENT_OPEN_KEY = '/*';
const MULTI_LINE_COMMENT_CLOSE_KEY = '*/';

module.exports = function(codeLines) {
  let isInCommentState = false;

  return codeLines.reduce((acc, cur) => {
    if (isInCommentState) {
      isInCommentState = 
      isInCommentState = !cur.includes(MULTI_LINE_COMMENT_CLOSE_KEY);

      return acc + 1;
    }

    const oneLineCommentIndex = getIndexOfSubstring(cur, ONE_LINE_COMMENT_KEY);
    const multiLineCommentIndex = getIndexOfSubstring(cur, MULTI_LINE_COMMENT_OPEN_KEY);

    if (oneLineCommentIndex < multiLineCommentIndex) {
      return acc + 1;
    } else if (multiLineCommentIndex < oneLineCommentIndex) {
      isInCommentState = true;
      return acc + 1;
    }

    return acc;
  }, 0);
}

function getIndexOfSubstring(string, subscting) {
  const index = string.indexOf(subscting);
  return index === -1 ? string.length : index;
}