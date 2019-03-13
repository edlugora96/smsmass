export const insertTextOnCursor = (el, newText) => {
  let start = el.selectionStart;
  let endWord = el.selectionEnd;
  let text = el.value;
  let before = text.substring(0, start);
  let after  = text.substring(endWord, text.length);
  el.value = (before + newText + after);
  el.selectionStart = el.selectionEnd = start + newText.length;
  el.focus();
}