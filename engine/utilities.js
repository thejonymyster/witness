function namespace(code) {
  code()
}

// ---------------------------------------------------------------------------------------------------- //
//* data stuff
// ---------------------------------------------------------------------------------------------------- //

namespace(function() {

/*** Start cross-compatibility ***/
// Used to detect if IDs include a direction, e.g. resize-top-left
if (!String.prototype.includes) {
  String.prototype.includes = function() {
    return String.prototype.indexOf.apply(this, arguments) !== -1
  }
}
Event.prototype.movementX = Event.prototype.movementX || Event.prototype.mozMovementX
Event.prototype.movementY = Event.prototype.movementY || Event.prototype.mozMovementY
Event.prototype.isRightClick = function() {
  return this.which === 3 || (this.touches && this.touches.length > 1)
}
/*** End cross-compatibility ***/

// https://stackoverflow.com/q/12571650
window_onerror = window.onerror
window.onerror = function(message, url, line) {
  console.error(message, url, line)
}

var tracks = {
  'start':   './data/panel_start_tracing.aac',
  'success': './data/panel_success.aac',
  'fail':    './data/panel_failure.aac',
  'abort':   './data/panel_abort_tracing.aac',
}
var audio = new Audio(src='./data/panel_start_tracing.aac')

window.PLAY_SOUND = function(name) {
  audio.pause()
  audio.src = tracks[name]
  audio.volume = localStorage.volume
  audio.play()
}

// ---------------------------------------------------------------------------------------------------- //
//* enum stuff
// ---------------------------------------------------------------------------------------------------- //

window.LINE_NONE     = 0
window.LINE_BLACK    = 1
window.LINE_BLUE     = 2
window.LINE_YELLOW   = 3
window.DOT_NONE      = 0
window.DOT_BLACK     = 1
window.DOT_BLUE      = 2
window.DOT_YELLOW    = 3
window.DOT_INVISIBLE = 4
window.CUSTOM_DOTS   = 5
window.CUSTOM_CROSS               = -1
window.CUSTOM_CROSS_FILLED        = -2
window.CUSTOM_CROSS_BLUE          = -3
window.CUSTOM_CROSS_BLUE_FILLED   = -4
window.CUSTOM_CROSS_YELLOW        = -5
window.CUSTOM_CROSS_YELLOW_FILLED = -6
window.CUSTOM_CURVE               = -7
window.CUSTOM_CURVE_FILLED        = -8
window.CUSTOM_CURVE_BLUE          = -9
window.CUSTOM_CURVE_BLUE_FILLED   = -10
window.CUSTOM_CURVE_YELLOW        = -11
window.CUSTOM_CURVE_YELLOW_FILLED = -12
window.SOUND_DOT   = 40
window.CUSTOM_X = -13
window.GAP_NONE      = 0
window.GAP_BREAK     = 1
window.GAP_FULL      = 2

window.symbols = ['square', 'star', 'pentagon', 'triangle', 'arrow', 'dart', 'atriangle', 'vtriangle', 'blackhole', 'whitehole', 'divdiamond', 'pokerchip', 'bridge', 'scaler', 'sizer', 'twobytwo', 'poly', 'ylop', 'polynt', 'nega', 'copier', 'portal', 'celledhex', 'dice', 'xvmino', 'crystal', '!poly', '!ylop', '!polynt', '!xvmino', 'swirl', 'eye'];
window.polyominoes = ['poly', 'ylop', 'polynt', 'xvmino'];
window.endEnum = ['top', 'right', 'left', 'bottom'];
window.themeArgs = ['background', 'outer', 'inner', 'text', 'line-undone', 'line-default', 'line-success', 'line-primary', 'line-secondary'];
window.symbolColors = ["#000000ff", "#00000080", "#00000000", "#ffffffff", "#ffffff80", "#ccccccff", "#ff0000ff", "#ff66b3ff", "#800000ff", "#ffa500ff", "#fa8f04ff", "#ff6666ff", "#ffff00ff", "#ffff80ff", "#cccc44ff", "#008000ff", "#b0ffb0ff",  "#3cd4d9ff", "#0000ffff", "#6867fdff", "#80ffffff", "#800080ff", "#8101ffff", "#ff07ffff", "#55556cff", "#b4b4c4ff", "#aa0000ff", "#ff4000ff", "#ffc900ff", "#00ff00ff", "#76a856ff", "#aa00aaff"];
window.symmetryModes = function(symmetry, pillar) {
  if (pillar) {
    if (!symmetry) return 'Pillar';
    else switch (symmetry.y * 2 + symmetry.x) {
      case 0:
        return 'Pillar (Two Lines)';
      case 1:
        return 'Pillar (H Symmetry)';
      case 2:
        return 'Pillar (V Symmetry)';
      case 3:
        return 'Pillar (R Symmetry)';
    }
  } else {
    if (!symmetry) return 'Default';
    else switch (symmetry.y * 2 + symmetry.x) {
      case 1:
        return 'Horizontal Symmetry';
      case 2:
        return 'Vertical Symmetry';
      case 3:
        return 'Rotational Symmetry';
    }
  }
}

// ---------------------------------------------------------------------------------------------------- //
//* animation stuff
// ---------------------------------------------------------------------------------------------------- //

var animations = ''
var l = function(line) {animations += line + '\n'}
// pointer-events: none; allows for events to bubble up (so that editor hooks still work)
l('.line-1 {')
l('  fill: var(--line-default);')
l('  pointer-events: none;')
l('}')
l('.line-2 {')
l('  fill: var(--line-primary);')
l('  pointer-events: none;')
l('}')
l('.line-3 {')
l('  fill: var(--line-secondary);')
l('  pointer-events: none;')
l('}')
l('@keyframes line-success {to {fill: var(--line-success);}}')
l('@keyframes line-fail {to {fill: var(--line-failure);}}')
l('@keyframes error {to {fill: red;}}')
l('@keyframes fade {to {opacity: 0.35;}}')
l('@keyframes start-grow { 0% {r: 12;} 100% {r: 24;} }')
// Neutral button style
l('#symboltheme, .loadButtonWrapper, button {')
l('  background-color: var(--outer);')
l('  border: 1px solid var(--border);')
l('  color: var(--text);')
l('  display: inline-block;')
l('  margin: 0px;')
l('  outline: none;')
l('  opacity: 1.0;')
l('  padding: 1px 6px;')
l('  -moz-appearance: none;')
l('  -webkit-appearance: none;')
l('}')
// Active (while held down) button style
l('#symboltheme:active, .loadButtonWrapper:active, button:active {filter: brightness(0.8);}')
// Disabled button style
l('#symboltheme:disabled, .loadButtonWrapper:disabled, button:disabled {opacity: 0.5;}')
// Selected button style (see https://stackoverflow.com/a/63108630)
l('#symboltheme:focus, .loadButtonWrapper:focus, button:focus {outline: none;}')
l = null

var style = document.createElement('style')
style.type = 'text/css'
style.title = 'animations'
style.appendChild(document.createTextNode(animations))
document.head.appendChild(style)

// ---------------------------------------------------------------------------------------------------- //
//* log stuff
// ---------------------------------------------------------------------------------------------------- //

// Custom logging to allow leveling
var consoleError = console.error
var consoleWarn = console.warn
var consoleInfo = console.log
var consoleLog = console.log
var consoleDebug = console.log
var consoleSpam = console.log
var consoleGroup = console.group
var consoleGroupEnd = console.groupEnd

window.setLogLevel = function(level) {
  console.error = function() {}
  console.warn = function() {}
  console.info = function() {}
  console.log = function() {}
  console.debug = function() {}
  console.spam = function() {}
  console.group = function() {}
  console.groupEnd = function() {}

  if (level === 'none') return

  // Instead of throw, but still red flags and is easy to find
  console.error = consoleError
  if (level === 'error') return

  // Less serious than error, but flagged nonetheless (Default for auto solves)
  console.warn = consoleWarn
  if (level === 'warn') return

  // Only shows validation data, useful for manual solves
  console.info = consoleInfo
  if (level === 'info') return

  // Useful for debugging (mainly validation)
  console.log = consoleLog
  if (level === 'log') return

  // Useful for serious debugging (mainly graphics/misc)
  console.debug = consoleDebug
  if (level === 'debug') return

  // Useful for insane debugging (mainly tracing/recursion)
  console.spam = consoleSpam
  console.group = consoleGroup
  console.groupEnd = consoleGroupEnd
  if (level === 'spam') return
}
setLogLevel('warn') //! CHANGE THIS IN DEV

window.deleteElementsByClassName = function(rootElem, className) {
  var elems = []
  while (true) {
    elems = rootElem.getElementsByClassName(className)
    if (elems.length === 0) break;
    elems[0].remove()
  }
}

window.pathsToDir = function(rawPath) {  
  let res = "", path = [...rawPath];
  res += String.fromCharCode(path[0].x);
  res += String.fromCharCode(path[0].y);
  path[path.length - 1] = ['', 'left', 'right', 'top', 'bottom'].indexOf(puzzle.getCell(puzzle.endPoint.x, puzzle.endPoint.y).end);
  for (let i = 1; i < path.length; i += 4) {
    res += String.fromCharCode(
      ((Math.max(1, path[i  ]) - 1)     ) |
      ((Math.max(1, path[i+1]) - 1) << 2) |
      ((Math.max(1, path[i+2]) - 1) << 4) | 
      ((Math.max(1, path[i+3]) - 1) << 6)
    );
  }
  return res;
}

// ---------------------------------------------------------------------------------------------------- //
//* util stuff
// ---------------------------------------------------------------------------------------------------- //

window.hexToInt = function(hex) {
  return parseInt(hex.slice(1), 16);
}

window.intToHex = function(int) {
  return '#' + Number(int).toString(16).padStart(6, '0');
}

window.makeBitSwitch = function (...bits) {
  let cur = 1;
  let res = 0;
  for (const b of bits) {
    if (b) res += cur;
    cur <<= 1;
  }
  res += cur;
  return res;
}

window.readBitSwitch = function (bs) {
  let cur = 0;
  let res = [];
  while ((bs >> cur) > 1) {
    if ((bs >> cur) % 2) res.push(true);
    else res.push(false);
    cur++;
  }
  return res;
}

window.intToByte = function(...num) {
  return num.map(n => String.fromCharCode(((n & 0xff000000) >>> 24), ((n & 0x00ff0000) >>> 16), ((n & 0x0000ff00) >>> 8), n & 0x000000ff))};

window.byteToInt = function(...byte) {
  return byte.map(b => ((b.charCodeAt(0) << 24 >>> 0) + (b.charCodeAt(1) << 16 >>> 0) + (b.charCodeAt(2) << 8 >>> 0) + (b.charCodeAt(3) >>> 0)));
}

window.rdiv = function(n, a) {
  return ((n % a) + a) % a;
}

const _keyStr = "`123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-0"

window.runLength = function(str) {
  let res = "";
  let cur = '';
  let rep = 0;
  str += '!'; // terminate
  for (let i = 0; i < str.length; i++) {
    if (rep == 64) {
      res += '~0' + cur;
      rep = 0;
    }
    if (cur != str[i]) { 
      if (rep > 3) { 
        res += '~' 
        res += _keyStr[rep];
        res += cur;
      }
      else res += cur.repeat(rep);
      cur = str[i]; rep = 1;
    } else rep++;
  }
  return res;
}

window.derunLength = function(str) {
  let res = ""
  for (let i = 0; i < str.length; i++) {
    if (str[i] == '~') {
      res += str[i+2].repeat(_keyStr.indexOf(str[i+1]));
      i += 2;
    }
    else res += str[i];
  }
  return res;
}

window.checkboxToggle = function(id, fn) {
  let checkbox = document.getElementById(id);
  checkbox.checked = !checkbox.checked
  checkbox.style.background = (checkbox.checked ? 'var(--text)' : 'var(--background)')
  if (fn) fn(checkbox.checked)
}

// ---------------------------------------------------------------------------------------------------- //
//* puzzle stuff
// ---------------------------------------------------------------------------------------------------- //

window.dotToSpokes = function(dot) {
  if (dot >= -12) return 0;
  else return (dot * -1) - 12
}

// Automatically solve the puzzle
window.solvePuzzle = function() {
  if (window.setSolveMode) window.setSolveMode(false)
  document.getElementById('solutionViewer').style.display = 'none'
  document.getElementById('progressBox').style.display = null
  document.getElementById('solveAuto').innerText = 'Cancel Solving'
  document.getElementById('solveAuto').onpointerdown = function() {
    this.innerText = 'Cancelling...'
    this.onpointerdown = null
    window.setTimeout(window.cancelSolving, 0)
  }

  window.solve(window.puzzle, function(percent) {
    document.getElementById('progressPercent').innerText = percent + '%'
    document.getElementById('progress').style.width = percent + '%'
  }, function(paths) {
    document.getElementById('progressBox').style.display = 'none'
    document.getElementById('solutionViewer').style.display = null
    document.getElementById('progressPercent').innerText = '0%'
    document.getElementById('progress').style.width = '0%'
    document.getElementById('solveAuto').innerText = 'Solve (automatically)'
    document.getElementById('solveAuto').onpointerdown = solvePuzzle

    window.puzzle.autoSolved = true
    paths = window.onSolvedPuzzle(paths)
    showSolution(window.puzzle, paths, 0)
  })
}

function showSolution(puzzle, paths, num) {
  var previousSolution = document.getElementById('previousSolution')
  var solutionCount = document.getElementById('solutionCount')
  var nextSolution = document.getElementById('nextSolution')

  if (paths.length === 0) { // 0 paths, arrows are useless
    solutionCount.innerText = '0 of 0'
    previousSolution.disabled = true
    nextSolution.disabled = true
    return
  }

  while (num < 0) num = paths.length + num
  while (num >= paths.length) num = num - paths.length

  if (paths.length === 1) { // 1 path, arrows are useless
    solutionCount.innerText = '1 of 1'
    if (paths.length >= window.MAX_SOLUTIONS) solutionCount.innerText += '+'
    previousSolution.disabled = true
    nextSolution.disabled = true
  } else {
    solutionCount.innerText = (num + 1) + ' of ' + paths.length
    if (paths.length >= window.MAX_SOLUTIONS) solutionCount.innerText += '+'
    previousSolution.disabled = false
    nextSolution.disabled = false
    previousSolution.onpointerdown = function(event) {
      if (event.shiftKey) {
        showSolution(puzzle, paths, num - 10)
      } else {
        showSolution(puzzle, paths, num - 1)
      }
    }
    nextSolution.onpointerdown = function(event) {
      if (event.shiftKey) {
        showSolution(puzzle, paths, num + 10)
      } else {
        showSolution(puzzle, paths, num + 1)
      }
    }
  }

  if (paths[num] != null) {
    // Save the current path on the puzzle object (so that we can pass it along with publishing)
    puzzle.path = paths[num]
    // Draws the given path, and also updates the puzzle to have path annotations on it.
    window.drawPath(puzzle, paths[num])
  }
}

window.copyTheme = function(puzzle) {
  puzzle.theme = {};
  for (entry of themeArgs) {
    puzzle.theme[entry] = hexToInt(getComputedStyle(document.documentElement).getPropertyValue('--' + entry));
  }
}

window.applyTheme = function(puzzle) {
  for (entry of Object.entries(puzzle.theme)) {
    document.documentElement.style.setProperty('--' + entry[0], intToHex(entry[1]));
  }
}

window.copyImage = function(puzzle) {
  puzzle.image = {};
  for (entry of ['background-image', 'foreground-image', 'background-music']) {
    let res = getComputedStyle(document.documentElement).getPropertyValue('--' + entry);
    if (res == 'none') puzzle.image[entry] = null;
    else puzzle.image[entry] = res.slice(4, -1);
  }
}

window.applyImage = function(puzzle) {
  for (entry of Object.entries(puzzle.image)) {
    if (entry[1] == null) document.documentElement.style.setProperty('--' + entry[0], 'none');
    else document.documentElement.style.setProperty('--' + entry[0], `url(${entry[1]})`);
  }
}

window.serializeTheme = function(puzzle) {
  let ints = [];
  for (const entry of themeArgs) ints.push(puzzle.theme[entry]);
  return 'vt1_' + runLength(btoa(intToByte(...ints).join('') + (puzzle.image['background-image'] ?? '') + '\u0000' + (puzzle.image['foreground-image'] ?? '') + '\u0000' + (puzzle.image['background-music'] ?? '')).replace(/\+/g, '.').replace(/\//g, '-').replace(/=/g, '_'));
}

window.deserializeTheme = function(puzzle, string) {
  let veri = string.indexOf('_');
  let version = string.slice(0, veri);
  string = string.slice(veri + 1);
  if (version == 'vt1') deserializeThemeV1(puzzle, string);
  else throw Error('unknown theme format');
}

function deserializeThemeV1(puzzle, string) {
  let raw = atob(derunLength(string).replace(/\./g, '+').replace(/-/g, '/').replace(/_/g, '='));
  puzzle.theme = {};
  let i = 0;
  for (const entry of themeArgs) {
    let char = byteToInt(raw.slice(i, i+4))[0];
    puzzle.theme[entry] = char;
    i += 4;
  }
  for (const entry of raw.slice(i).split('\u0000')) {
    puzzle.image = {};
    puzzle.image['background-image'] = (entry[0]?.length ? entry[0] : null);
    puzzle.image['foreground-image'] = (entry[1]?.length ? entry[1] : null);
    puzzle.image['background-music'] = (entry[2]?.length ? entry[2] : null);
  }
  window.puzzle = puzzle;
  applyTheme(puzzle);
  applyImage(puzzle);
}

window.serializePuzzle = function(puzzle) {
  const SCHEMA = new Map([
    ['sols', 'byte'],
    ['symmetry', 'byte'], //* symmetry, symmetry?.x, symmetry?.y, pillar, perfect
    ['height', 'byte'],
    ['width', 'byte'],
    ['defaultCorner', 'corner'], //* only if majority of corner is same dot/gap/start, else null
    ['defaultCell', 'cell'],
    ['corners', 'sparse[]<corner>'],
    ['soundDots', '[]<byte>'],
    ['cells', 'sparse[]<cell>'],
    ['theme.background', 'int'],
    ['theme.inner', 'int'],
    ['theme.outer', 'int'],
    ['theme.line-default', 'int'],
    ['theme.line-primary', 'int'],
    ['theme.line-secondary', 'int'],
    ['theme.line-success', 'int'],
    ['theme.line-undone', 'int'],
    ['theme.text', 'int'],
    ['image.background-image', 'string'],
    ['image.foreground-image', 'string'],
  ]);

  /**
   *! Cell data structure
   ** type: type,
   ** color: byte,
    // optional - count
   ** ['triangle', 'arrow', 'dart', 'atriangle', 'divdiamond', 'dice', 'crystal', 'eye']: count: byte
   ** ['arrow', 'dart']:: count += (4 * dir)
    // optional - flip
   ** ['scaler', 'swirl']: flip: byte
    // optional - poly
   ** ['poly', 'ylop', 'polynt', 'xvmino']: polyshape: int (canRotate built into cell type)!!
   */

  /**
   *! Corner data structure
   ** dot: byte (dot, gap info)
   ** start: byte (startx3, endx3 (direction + null));
   */

  let raw = "";
  //* header
  raw += String.fromCharCode(Math.min(0xff, puzzle.sols ?? 1));
  raw += String.fromCharCode(makeBitSwitch(puzzle.symmetry, puzzle.symmetry?.x, puzzle.symmetry?.y, puzzle.pillar, puzzle.perfect, puzzle.disableFlash, puzzle.optional));
  raw += String.fromCharCode(Math.floor(puzzle.width / 2));
  raw += String.fromCharCode(Math.floor(puzzle.height / 2));
  //* defaultCorner
  let med = {};
  for (let i = 0; i < puzzle.width / 2; i++) for (let j = 0; j < puzzle.height / 2; j++) {
    if (puzzle.grid[i*2]?.[j*2] === undefined) continue;
    let dot = getCornerData(puzzle.grid[i*2][j*2]);
    if (dot[1] != '\0') continue;
    med[dot] ??= 0; med[dot]++;
  }
  let defCorner = "\0\0";
  for (let k in med) if (med[k] >= (puzzle.width * puzzle.height / 8)) defCorner = k;
  raw += defCorner[0];
  //* defaultCell
  med = {};
  for (let i = 0; i < puzzle.width / 2; i++) for (let j = 0; j < puzzle.height / 2; j++) {
    if (puzzle.grid[i*2+1]?.[j*2+1] === undefined) continue;
    let data = getCellData(puzzle.grid[i*2+1][j*2+1]);
    med[data] ??= 0; med[data]++;
  }
  let defCell = "\0";
  for (let k in med) if (med[k] >= (puzzle.height * puzzle.width / 8)) defCell = k;
  raw += defCell;
  //* corners
  let corner = ["", "", ""];
  for (let i = 0; i < puzzle.width; i++) for (let j = 0; j < puzzle.height; j++) {
    if ((i % 2) && (j % 2) || !puzzle.grid[i]?.[j]) continue;
    let data = getCornerData(puzzle.grid[i][j]);
    if (!((i % 2) || (j % 2))) { if (data == defCorner) continue; }
    else if (data == '\0\0') continue;
    corner[0] += String.fromCharCode(i);
    corner[1] += String.fromCharCode(j);
    corner[2] += data;
  }
  raw += String.fromCharCode((corner[0].length & 0xFF00) << 8) + String.fromCharCode(corner[0].length & 0xFF);
  raw += corner[0];
  raw += corner[1];
  raw += corner[2];
  //* soundData
  raw += String.fromCharCode(puzzle.soundDots.length);
  for (let i = 0; i < puzzle.soundDots.length; i++) raw += String.fromCharCode(puzzle.soundDots[i]);
  //* cells
  let cell = ["", "", ""];
  for (let i = 0; i < puzzle.width / 2; i++) for (let j = 0; j < puzzle.height / 2; j++) {
    if (puzzle.grid[i*2+1]?.[j*2+1] === undefined) continue;
    let data = getCellData(puzzle.grid[i*2+1][j*2+1]);
    if (defCell == data) continue;
    cell[0] += String.fromCharCode(i);
    cell[1] += String.fromCharCode(j);
    cell[2] += data;
  }
  raw += String.fromCharCode((cell[0].length & 0xFF00) << 8) + String.fromCharCode(cell[0].length & 0xFF);
  raw += cell[0];
  raw += cell[1];
  raw += cell[2];
  let ints = [];
  for (const entry of themeArgs) ints.push(puzzle.theme[entry]);
  raw += intToByte(...ints).join('');
  let addedFirst = false;
  if (puzzle.image['foreground-image'])
    raw += puzzle.image['foreground-image'];
  if (puzzle.image['background-image']) {
    raw += '\0' + puzzle.image['background-image'];
    addedFirst = true;
  }
  if (puzzle.image['background-music'])
    raw += (addedFirst ? '' : '\0') + '\0' + puzzle.image['background-music'];
  return 'v4_' + runLength(btoa(raw).replace(/\+/g, '.').replace(/\//g, '-').replace(/\=/g, '_'));
}

function getCellData(cell) {
  let raw = "";
  if (!cell) return "\0";
  if (polyominoes.includes(cell.type) && (cell.polyshape & 1048576)) cell.type = '!' + cell.type;
  let type = window.symbols.indexOf(cell.type) + 2;
  if (cell.type[0] == '!') cell.type = cell.type.slice(1);
  raw += String.fromCharCode(type);
  raw += String.fromCharCode(cell.color);
  let count = 0;
  if (['triangle', 'arrow', 'dart', 'atriangle', 'divdiamond', 'dice', 'crystal', 'eye'].includes(cell.type)) count += cell.count;
  if (['arrow', 'dart'].includes(cell.type)) count = count * 8 + cell.rot;
  if (['scaler', 'swirl'].includes(cell.type)) raw += String.fromCharCode(!!cell.flip);
  if (count) raw += String.fromCharCode(count);
  if (polyominoes.includes(cell.type)) {
    raw += String.fromCharCode((cell.polyshape & 0xFF00) >> 8);
    raw += String.fromCharCode((cell.polyshape & 0xFF));
  }
  return raw;
}

function getCornerData(cell) {
  if (cell == null) return "\0\0";
  let dot = cell.dot ? cell.dot + 29 : 0;
  let start = endEnum.indexOf(cell.end) + 1 + (!!cell.start << 3) + ((cell.gap ?? 0) << 4);
  return String.fromCharCode(dot) + String.fromCharCode(start);
}

window.readRawArray = function(str) {
  return str.split('').map(x => x.charCodeAt(0));
}

window.deserializePuzzle = function(string) {
  let veri = string.indexOf('_');
  let version = string.slice(0, veri);
  string = string.slice(veri + 1);
  if (version == 'v2') return deserializePuzzleV2(deserializePuzzlePre(string));
  else if (version == 'v3') return deserializePuzzleV3(deserializePuzzlePre(string));
  else if (version == 'v4') return deserializePuzzleV4(deserializePuzzlePre(string));
  else throw Error('unknown puzzle format');
}

function deserializePuzzlePre(string) {
  return atob(derunLength(string).replace(/\./g, '+').replace(/\-/g, '/').replace(/\_/g, '='));
}

function deserializePuzzleV4(raw) {
  //* header
  let char = readBitSwitch(raw.charCodeAt(1));
  let puzzle = new Puzzle(raw.charCodeAt(2), raw.charCodeAt(3), char[3]);
  puzzle.sols = raw.charCodeAt(0);
  if (char[0]) puzzle.symmetry = {'x': char[1], 'y': char[2]};
  if (char[4]) puzzle.perfect = true;
  if (char[5]) puzzle.disableFlash = true;
  if (char[6]) puzzle.optional = true;
  let ptr = 4;
  //* defaults
  let defCorner = raw.charCodeAt(ptr);
  if (defCorner) for (let i = 0; i < puzzle.width / 2; i++) for (let j = 0; j < puzzle.height / 2; j++) puzzle.grid[i*2][j*2] = cornerData(defCorner, 0);
  ptr++;
  let defCell = raw.charCodeAt(ptr);
  if (defCell) {
    ptr++;
    let temp = cellData(defCell, raw.charCodeAt(ptr), raw.charCodeAt(ptr + 1), raw.charCodeAt(ptr + 2));
    for (let i = 0; i < puzzle.width / 2; i++) for (let j = 0; j < puzzle.height / 2; j++) {
      if (puzzle.grid[i*2+1]?.[j*2+1] === undefined) continue;
      puzzle.grid[i*2+1][j*2+1] = temp[0];
    } 
    ptr += temp[1];
  }
  ptr++;
  //* corners
  let x = [], y = [];
  let lenCorner = (raw.charCodeAt(ptr) >> 8) + (raw.charCodeAt(ptr + 1));
  ptr += 2;
  for (let i = 0; i < lenCorner; i++) { y.push(raw.charCodeAt(ptr)); ptr++; }
  for (let i = 0; i < lenCorner; i++) { x.push(raw.charCodeAt(ptr)); ptr++; }
  for (let i = 0; i < lenCorner; i++) { 
    puzzle.grid[y[i]][x[i]] = cornerData(raw.charCodeAt(ptr), raw.charCodeAt(ptr + 1));
    ptr += 2; 
  }
  //* soundData
  puzzle.soundDots = [];
  let lenSoundDots = raw.charCodeAt(ptr);
  ptr++;
  for (let i = 0; i < lenSoundDots; i++) {
    puzzle.soundDots.push(raw.charCodeAt(ptr));
    ptr++;
  }
  //* cells
  x = []; y = [];
  let lenCell = (raw.charCodeAt(ptr) >> 8) + (raw.charCodeAt(ptr + 1));
  ptr += 2;
  for (let i = 0; i < lenCell; i++) { y.push(raw.charCodeAt(ptr)); ptr++; }
  for (let i = 0; i < lenCell; i++) { x.push(raw.charCodeAt(ptr)); ptr++; }
  for (let i = 0; i < lenCell; i++) { 
    let temp = cellData(raw.charCodeAt(ptr), raw.charCodeAt(ptr + 1), raw.charCodeAt(ptr + 2), raw.charCodeAt(ptr + 3));
    puzzle.grid[y[i]*2+1][x[i]*2+1] = temp[0];
    ptr += 2 + temp[1]; 
  }
  //* style
  puzzle.theme = {};
  for (const entry of themeArgs) {
    char = byteToInt(raw.slice(ptr, ptr + 4))[0];
    puzzle.theme[entry] = char;
    ptr += 4;
  }
  //* image
  let urls = raw.slice(ptr).split('\0');
  puzzle.image = {};
  if (urls[0]?.length) puzzle.image['foreground-image'] = urls[0];
  if (urls[1]?.length) puzzle.image['background-image'] = urls[1];
  if (urls[2]?.length) puzzle.image['background-music'] = urls[2];
  window.puzzle = puzzle;
  applyTheme(puzzle);
  applyImage(puzzle);
  return puzzle;
}

function cellData(type, color, data1, data2) {
  if (!type) return [null, -1];
  let ret = {'type': symbols[type - 2], 'color': color};
  switch (ret.type) {
    case 'scaler':
    case 'swirl':
      ret.flip = !!data1;
      return [ret, 1];
    case 'arrow':
    case 'dart':
      ret.rot = data1 & 0x7;
      data1 >>= 3;
    case 'triangle':
    case 'atriangle':
    case 'divdiamond':
    case 'dice':
    case 'crystal':
    case 'eye':
      ret.count = data1;
      return [ret, 1];
    case 'poly':
    case 'ylop':
    case 'polynt':
    case 'xvmino':
    case '!poly':
    case '!ylop':
    case '!polynt':
    case '!xvmino':
      ret.polyshape = (data1 << 8) | data2;
      if (ret.type[0] == '!') {
        ret.type = ret.type.slice(1);
        ret.polyshape |= 1048576;
      }
      return [ret, 2];
    default:
      return [ret, 0];
  }
}

function cornerData(dot, start) {
  let ret = {'type': 'line', 'line': 0};
  if (dot) ret.dot = dot - 29;
  if (start & 0x7) ret.end = endEnum[(start & 0x7) - 1]
  if ((start & 0x8) >> 3) ret.start = true;
  if (start >> 4) ret.gap = (start >> 4);
  return ret;
}

function deserializePuzzleV3(raw) {
  return deserializePuzzleV2(raw.slice(1), raw.charCodeAt(0));
}

function deserializePuzzleV2(raw, sols=1) {
  let i = 2;
  let char = readBitSwitch(raw.charCodeAt(i));
  let puzzle = new Puzzle(raw.charCodeAt(0), raw.charCodeAt(1), char[3]);
  if (sols > 1) {
    puzzle.perfect = true;
    puzzle.sols = sols;
  } else puzzle.perfect = false;
  if (char[0]) puzzle.symmetry = {'x': char[1], 'y': char[2]};
  let x = -1; y = 0;
  while (true) {
    x++;
    if (x == puzzle.width) {
      x = 0; y++;
    }
    i++; char = raw.charCodeAt(i);
    if (char == 0xff) break;
    let cell = {};
    if (x % 2 == 0 || y % 2 == 0) { // line
      cell.type = 'line';
      if (char == 0x00) continue;
      // read additional data
      let dot = 6 - char
      if (dot) cell.dot = dot;
      i++; char = raw.charCodeAt(i);
      if (char >= 10) cell.gap = Math.floor(char / 10); char %= 10;
      if (char >= 5) cell.start = !!(Math.floor(char / 5)); char %= 5;
      if (char) cell.end = endEnum[char - 1];
      puzzle.grid[x][y] = cell;
      continue;
    }
    if (char == 0x00) {
      puzzle.grid[x][y] = null;
      continue;
    }
    cell.type = symbols[char - 1];
    i++;
    cell.color = symbolColors.indexOf('#' + Number(byteToInt(raw.slice(i, i+4))[0]).toString(16).padStart(8, '0'));
    i += 4; char = raw.charCodeAt(i);
    switch (cell.type) {
      case 'arrow':
      case 'dart':
        cell.rot = char % 8; char = Math.floor(char / 8);
      case 'triangle':
      case 'atriangle':
      case 'divdiamond':
        cell.count = char;
        break;
      case 'scaler':
      case 'swirl':
        cell.flip = !!char;
        break;
      case 'poly':
      case 'ylop':
      case 'polynt':
        cell.polyshape = byteToInt(raw.slice(i, i+4))[0];
        i += 3;
        break;
      default:
        i--;
        break;
    }
    puzzle.grid[x][y] = cell;
  }
  puzzle.theme = {};
  for (const entry of themeArgs) {
    char = byteToInt(raw.slice(i+1, i+5))[0];
    puzzle.theme[entry] = char;
    i += 4;
  }
  i++;
  let entry = raw.slice(i).split('\u00ff')
  puzzle.image = {};
  puzzle.image['background-image'] = (entry[0]?.length ? entry[0] : null);
  puzzle.image['foreground-image'] = (entry[1]?.length ? entry[1] : null);
  window.puzzle = puzzle;
  applyTheme(puzzle);
  applyImage(puzzle);
  return puzzle;
}

window.exportSequence = function(list) {
    return 'vs1_' + list.join('~~');
}

window.importSequence = function(string) {
  let veri = string.indexOf('_');
  let version = string.slice(0, veri);
  string = string.slice(veri + 1);
  if (version == 'vs1') return importSequenceV1(string);
  else throw Error('unknown puzzle format');
}

function importSequenceV1(string) {
  let res = string.split('~~').map(e => window.deserializePuzzle(e));
  return res;
}

})
