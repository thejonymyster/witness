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

function sol(id) {
  return document.createRange().createContextualFragment(
    `<div class='sols${((!puzzle.optional) && (currentPanel != localStorage[`puzzleProgress_${code}`])) ? ' active' : ''}${typeof(id) == 'string' ? ' perfect' : ''}' id='sols-${id}'></div>`);
}

let puzzles;
let code;
let currentPanel;
let solsWrapper;
let sols;
let perfectActivated = false;
let solsPerfect;
function reloadPanel() {
  while (solsWrapper.firstChild) solsWrapper.removeChild(solsWrapper.firstChild);
  while (document.getElementById('perfectWrapper').firstChild) document.getElementById('perfectWrapper').removeChild(document.getElementById('perfectWrapper').firstChild);
  window.puzzle = puzzles[currentPanel];
  if (puzzle.sols > 1) {
    sols = new Set();
    for (let i = 0; i < puzzle.sols; i++) solsWrapper.appendChild(sol(i+1));
  }
  perfectActivated = false;
  if (puzzle.perfect) {
    let kinds = Array.from(new Set(puzzle.grid.flat().filter(x => x?.type == 'vtriangle').map(x => x.color)));
    while (kinds.length < 3) kinds.push(-1);
    if (kinds.length == 3) {
      perfectActivated = true;
      solsPerfect = [[kinds[0], kinds[1], kinds[2]], [kinds[0], kinds[2], kinds[1]], [kinds[1], kinds[0], kinds[2]], [kinds[1], kinds[2], kinds[0]], [kinds[2], kinds[0], kinds[1]], [kinds[2], kinds[1], kinds[0]]];
      solsPerfect = Array.from(new Set(solsPerfect.map(x => x.join('-'))));
      for (let o of solsPerfect) document.getElementById('perfectWrapper').appendChild(sol(o));
    }
  }
  let svg = document.getElementById('puzzle')
  while (svg.firstChild) svg.removeChild(svg.firstChild)
  draw(window.puzzle)
  window.clearAnimations();
  applyTheme(puzzle);
  applyImage(puzzle);
  if (localStorage[`puzzleProgress_${code}_${currentPanel}`])
    window.setPath(window.puzzle, localStorage[`puzzleProgress_${code}_${currentPanel}`]);
  updateArrows();
}

window.onload = function() {
  solsWrapper = document.getElementById('solsWrapper')
  let toLoad = (new URL(window.location.href).hash);
  code = toLoad.hashCode();
  if (toLoad) {
    puzzles = importSequence(toLoad.slice(1));
    localStorage[`puzzleProgress_${code}`] ??= 0;
    currentPanel = localStorage[`puzzleProgress_${code}`];
    reloadPanel();
  } else window.location.replace('prodzpod.github.io/witness');
}

window.reloadSymbolTheme = function() {
  draw(window.puzzle)
}

window.onSolvedPuzzle = function(paths) {
  let dir = pathsToDir(puzzle.path);
  if (puzzle.optional || (currentPanel == localStorage[`puzzleProgress_${code}`])) {
    if (puzzle.sols > 1) {
      sols.add(dir);
      document.getElementById('sols-' + sols.size).classList.add('active');
    }
    let vr = puzzle.vtriangleResult?.join('-');
    if (perfectActivated && solsPerfect.includes(vr)) {
      solsPerfect.splice(solsPerfect.indexOf(vr), 1);
      document.getElementById('sols-' + vr).classList.add('active');
    }
    if (((sols?.size ?? 1) >= puzzle.sols) && (!perfectActivated || !solsPerfect.length)) levelUp();
  }
  localStorage[`puzzleProgress_${code}_${currentPanel}`] = dir;
}

function levelUp() {
  if ((currentPanel == localStorage[`puzzleProgress_${code}`]) && (currentPanel < (puzzles.length - 1))) localStorage[`puzzleProgress_${code}`]++;
  updateArrows();
}

function updateArrows() {
  if (currentPanel == 0) document.getElementById('prev').setAttribute('style', 'opacity: 0;');
  else document.getElementById('prev').setAttribute('style', 'opacity: 1;');
  if (currentPanel == localStorage[`puzzleProgress_${code}`]) document.getElementById('next').setAttribute('style', 'opacity: 0;');
  else document.getElementById('next').setAttribute('style', 'opacity: 1;');
}

window.getNext = function() {
  if (currentPanel == localStorage[`puzzleProgress_${code}`]) return;
  currentPanel++;
  reloadPanel();
  if (puzzle.optional) levelUp();
}

window.getPrev = function() {
  if (currentPanel == 0) return;
  currentPanel--;
  reloadPanel();
  if (puzzle.optional) levelUp();
}

});