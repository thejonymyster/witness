namespace(function() {
  
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

let puzzles;
let code;
let currentPanel;
function reloadPanel() {
  window.puzzle = puzzles[currentPanel];
  let svg = document.getElementById('puzzle')
  while (svg.firstChild) svg.removeChild(svg.firstChild)
  draw(window.puzzle)
  window.clearAnimations();
  applyTheme(puzzle);
  applyImage(puzzle);
}

window.onload = function() {
  let toLoad = (new URL(window.location.href).hash);
  code = toLoad.hashCode();
  if (toLoad) {
    puzzles = importSequence(toLoad.slice(1));
    localStorage[`puzzleProgress_${code}`] ??= 0;
    currentPanel = localStorage[`puzzleProgress_${code}`];
    reloadPanel();
  }
}

window.reloadSymbolTheme = function() {
  draw(window.puzzle)
}

window.onSolvedPuzzle = function(paths) {
    if ((currentPanel == localStorage[`puzzleProgress_${code}`]) && (currentPanel < (puzzles.length - 1))) localStorage[`puzzleProgress_${code}`]++;
}

window.getNext = function() {
  if (currentPanel == localStorage[`puzzleProgress_${code}`]) return;
  currentPanel++;
  reloadPanel();
}

window.getPrev = function() {
  if (currentPanel == 0) return;
  currentPanel--;
  reloadPanel();
}

});