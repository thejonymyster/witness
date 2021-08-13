function namespace(code) {
  code()
}

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

window.ERROR = function(message) {
  var request = new XMLHttpRequest()
  request.open('POST', '/error', true) // Fire and forget
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send('data=' + message)
}

window.LINE_NONE     = 0
window.LINE_BLACK    = 1
window.LINE_BLUE     = 2
window.LINE_YELLOW   = 3
window.DOT_NONE      = 0
window.DOT_BLACK     = 1
window.DOT_BLUE      = 2
window.DOT_YELLOW    = 3
window.DOT_INVISIBLE = 4
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
window.CUSTOM_X = -13
window.GAP_NONE      = 0
window.GAP_BREAK     = 1
window.GAP_FULL      = 2

window.dotToSpokes = function(dot) {
  if (dot >= -12) return 0;
  else return (dot * -1) - 12
}

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
l('@keyframes start-grow {from {r:12;} to {r: 24;}}')
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

function createCheckbox() {
  var checkbox = document.createElement('div')
  checkbox.style.width = '22px'
  checkbox.style.height = '22px'
  checkbox.style.display = 'inline-block'
  checkbox.style.verticalAlign = 'text-bottom'
  checkbox.style.marginRight = '6px'
  checkbox.style.borderWidth = '1.5px'
  checkbox.style.borderStyle = 'solid'
  checkbox.style.borderColor = 'var(--text)'
  checkbox.style.background = 'var(--background)'
  checkbox.style.color = 'var(--text)'
  return checkbox
}

// Required global variables/functions:
// window.puzzle
// window.onSolvedPuzzle()
// window.MAX_SOLUTIONS // defined by solve.js
window.addSolveButtons = function() {
  var parent = document.currentScript.parentElement

  var solveMode = createCheckbox()
  solveMode.id = 'solveMode'
  parent.appendChild(solveMode)

  solveMode.onpointerdown = function() {
    this.checked = !this.checked
    this.style.background = (this.checked ? 'var(--text)' : 'var(--background)')
    if (window.setSolveMode) window.setSolveMode(this.checked)
  }

  var solveManual = document.createElement('label')
  parent.appendChild(solveManual)
  solveManual.id = 'solveManual'
  solveManual.onpointerdown = function() {solveMode.onpointerdown()}
  solveManual.innerText = 'Solve (manually)'
  solveManual.style = 'margin-right: 8px'

  var solveAuto = document.createElement('button')
  parent.appendChild(solveAuto)
  solveAuto.id = 'solveAuto'
  solveAuto.innerText = 'Solve (automatically)'
  solveAuto.onpointerdown = solvePuzzle
  solveAuto.style = 'margin-right: 8px'

  var div = document.createElement('div')
  parent.appendChild(div)
  div.style = 'display: inline-block; vertical-align:top'

  var progressBox = document.createElement('div')
  div.appendChild(progressBox)
  progressBox.id = 'progressBox'
  progressBox.style = 'display: none; width: 220px; border: 1px solid black; margin-top: 2px'

  var progressPercent = document.createElement('label')
  progressBox.appendChild(progressPercent)
  progressPercent.id = 'progressPercent'
  progressPercent.style = 'float: left; margin-left: 4px'
  progressPercent.innerText = '0%'

  var progress = document.createElement('div')
  progressBox.appendChild(progress)
  progress.id = 'progress'
  progress.style = 'z-index: -1; height: 38px; width: 0%; background-color: #390'

  var solutionViewer = document.createElement('div')
  div.appendChild(solutionViewer)
  solutionViewer.id = 'solutionViewer'
  solutionViewer.style = 'display: none'

  var previousSolution = document.createElement('button')
  solutionViewer.appendChild(previousSolution)
  previousSolution.id = 'previousSolution'
  previousSolution.innerHTML = '&larr;'

  var solutionCount = document.createElement('label')
  solutionViewer.appendChild(solutionCount)
  solutionCount.id = 'solutionCount'
  solutionCount.style = 'padding: 6px'

  var nextSolution = document.createElement('button')
  solutionViewer.appendChild(nextSolution)
  nextSolution.id = 'nextSolution'
  nextSolution.innerHTML = '&rarr;'
}

window.themeArgs = ['background', 'outer', 'inner', 'text', 'line-undone', 'line-default', 'line-success', 'line-primary', 'line-secondary'];

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
  for (entry of ['background-image', 'foreground-image']) {
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

const _keyStr = ".123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-0"

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

window.serializeTheme = function(puzzle) {
  let ints = [];
  for (const entry of themeArgs) ints.push(puzzle.theme[entry]);
  return 'vt1_' + runLength(btoa(intToByte(...ints).join('') + (puzzle.image['background-image'] ?? '') + '\u0000' + (puzzle.image['foreground-image'] ?? '')).replace(/\+/g, '.').replace(/\//g, '-').replace(/=/g, '_'));
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
  }
  window.puzzle = puzzle;
  applyTheme(puzzle);
  applyImage(puzzle);
}

window.symbols = ['square', 'star', 'pentagon', 'triangle', 'arrow', 'dart', 'atriangle', 'tent', 'blackhole', 'whitehole', 'divdiamond', 'pokerchips', 'bridge', 'scaler', 'sizer', 'twobytwo', 'poly', 'ylop', 'polynt', 'nega', 'copier', 'portal', 'celledhex'];
window.endEnum = ['top', 'right', 'left', 'bottom'];
window.serializePuzzle = function(puzzle) {
  // scary task!
  let raw = "";
  raw += String.fromCharCode(Math.floor(puzzle.width / 2));
  raw += String.fromCharCode(Math.floor(puzzle.height / 2));
  raw += String.fromCharCode(makeBitSwitch(puzzle.symmetry, puzzle.symmetry?.x, puzzle.symmetry?.y, puzzle.pillar)); // start
  for (let i = 0; i < puzzle.height; i++) for (let j = 0; j < puzzle.width; j++) {
    let cell = puzzle.grid[j][i];
    let type = window.symbols.indexOf(cell?.type) + 1;
    if (cell?.type == 'line') { // we know where the lines are
      let dot = (5 - (cell.dot ?? 0));
      let start = endEnum.indexOf(cell.end) + ((cell.start ?? 0) * 5) + ((cell.gap ?? 0) * 10) + 1;
      if (dot == 5 && !start) raw += '\u0000';
      else {
        raw += String.fromCharCode(dot + 1, start);
      }
    } else {
      raw += String.fromCharCode(type);
      if (type) {
        let color = parseInt(cell.color.slice(1), 16);
        raw += intToByte(color)[0];
        let count = 0;
        if (['triangle', 'arrow', 'dart', 'atriangle', 'divdiamond'].includes(cell.type)) count += cell.count;
        if (['arrow', 'dart'].includes(cell.type)) count = count * 8 + cell.rot;
        if (cell.type == 'scaler') raw += String.fromCharCode(!!cell.flip);
        if (count) raw += String.fromCharCode(count);
        if (['poly', 'ylop', 'polynt'].includes(cell.type)) {
          raw += intToByte(Number(cell.polyshape))[0];
        }
      }
    }
  }
  raw += '\u00ff';
  ints = [];
  for (const entry of themeArgs) ints.push(puzzle.theme[entry]);
  raw += intToByte(...ints).join('');
  raw += (puzzle.image['background-image'] ?? '') + '\u0000' + (puzzle.image['foreground-image'] ?? '');
  return 'v2_' + runLength(btoa(raw).replace(/\+/g, '.').replace(/\//g, '-').replace(/=/g, '_'));
}

window.deserializePuzzle = function(string) {
  let veri = string.indexOf('_');
  let version = string.slice(0, veri);
  string = string.slice(veri + 1);
  if (version == 'v2') return deserializePuzzleV2(string);
  else throw Error('unknown puzzle format');
}

function deserializePuzzleV2(string) {
  let raw = atob(derunLength(string).replace(/\./g, '+').replace(/-/g, '/').replace(/_/g, '='));
  let i = 2;
  let char = readBitSwitch(raw.charCodeAt(i));
  let puzzle = new Puzzle(raw.charCodeAt(0), raw.charCodeAt(1), char[3]);
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
    cell.color = '#' + Number(byteToInt(raw.slice(i, i+4))[0]).toString(16).padStart(8, '0');
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
  for (const entry of raw.slice(i).split('\u0000')) {
    puzzle.image = {};
    puzzle.image['background-image'] = (entry[0]?.length ? entry[0] : null);
    puzzle.image['foreground-image'] = (entry[1]?.length ? entry[1] : null);
  }
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
