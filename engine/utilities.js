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

function colourNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return colour;
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
  return num.map(n => String.fromCharCode((n & 0xff000000) >> 24,
  (n & 0x00ff0000) >> 16,
  (n & 0x0000ff00) >> 8,
  (n & 0x000000ff)));
}

window.byteToInt = function(...byte) {
  return byte.map(b => (b.charCodeAt(0) << 24) + (b.charCodeAt(1) << 16) + (b.charCodeAt(2) << 8) + b.charCodeAt(3));
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
  return runLength(btoa([intToByte(...ints).join(''), puzzle.image['background-image'], puzzle.image['foreground-image']].join("\u0080\u0080\u0080\u0080")).replace(/\+/g, '.').replace(/\//g, '-').replace(/=/g, '_'));
}

window.deserializeTheme = function(puzzle, string) {
  let raw = atob(derunLength(string).replace(/\./g, '+').replace(/-/g, '/').replace(/_/g, '=')).split('\u0080\u0080\u0080\u0080');
  let theme = byteToInt(...raw[0].match(/.{1,4}/g));
  console.warn(string, raw, theme);
  for (let i = 0; i < themeArgs.length; i++) puzzle.theme[themeArgs[i]] = theme[i];
  puzzle.image ??= {};
  if (raw[1].length) puzzle.image['background-image'] = raw[1];
  else puzzle.image['background-image'] = null;
  if (raw[2].length) puzzle.image['foreground-image'] = raw[2];
  else puzzle.image['foreground-image'] = null;
  applyTheme(puzzle);
  applyImage(puzzle);
}

window.symbols = ['square', 'star', 'pentagon', 'triangle', 'arrow', 'dart', 'atriangle', 'tent', 'blackhole', 'whitehole', 'divdiamond', 'pokerchips', 'bridge', 'scaler', 'sizer', 'twobytwo', 'poly', 'ylop', 'polynt', 'nega', 'copier', 'portal', 'celledhex'];
window.endEnum = ['top', 'right', 'left', 'bottom'];
window.serializePuzzle = function(puzzle) {
  // scary task!
  let raw = "";
  raw += String.fromCharCode(puzzle.width);
  raw += String.fromCharCode(puzzle.height);
  raw += String.fromCharCode(makeBitSwitch(puzzle.symmetry, puzzle.symmetry?.x, puzzle.symmetry?.y, puzzle.pillar)); // start
  for (const row of puzzle.grid) for (const cell of row) {
    let type = window.symbols.indexOf(cell?.type) + 1;
    if (cell?.type == 'line') { // we know where the lines are
      let dot = (5 - (cell.dot ?? 0));
      let start = endEnum.indexOf(cell.end) + ((cell.start ?? 0) * 5) + ((cell.gap ?? 0) * 10) + 1;
      if (dot == 5 && !start) raw += '\u0000';
      else {
        raw += '\u0001'; // line with content
        raw += String.fromCharCode(dot, start);
      }
    } else {
      raw += String.fromCharCode(type);
      if (type) {
        raw += intToByte(Number(colourNameToHex(cell.color).slice(0, -1))).join('');
        let count = 0;
        if (['triangle', 'arrow', 'dart', 'atriangle', 'divdiamond'].includes(cell.type)) count += cell.count;
        if (['arrow', 'dart'].includes(cell.type)) count = count * 8 + cell.rot;
        if (cell.type == 'scaler') count = cell.flip;
        if (count) raw += String.fromCharCode(count);
        if (['poly', 'ylop', 'polynt'].includes(cell.type)) {
          raw += intToByte(Number(cell.polyshape)).join('');
        }
      }
    }
  }
  raw += '\u00ff';
  ints = [];
  for (const entry of themeArgs) ints.push(puzzle.theme[entry]);
  raw += intToByte(...ints).join('');
  raw += (puzzle.image['background-image'] ?? '') + '\u0000' + (puzzle.image['foreground-image'] ?? '');
  return runLength(btoa(raw).replace(/\+/g, '.').replace(/\//g, '-').replace(/=/g, '_'));
}

window.deserializePuzzle = function(string, puzzle) {
  let raw = atob(derunLength(string).replace(/\./g, '+').replace(/-/g, '/').replace(/_/g, '='));
  let i = 2;
  let char = readBitSwitch(raw.charCodeAt(i));
  createEmptyPuzzle(raw.charCodeAt(0) / 2, raw.charCodeAt(1) / 2, );
  if (char[0]) puzzle.symmetry = {'x': char[1], 'y': char[2]};
  else delete puzzle.symmetry;
  while (true) {
    i++;
    char = raw.charCodeAt(i);
    switch (symbols[char - 1]) {

    }
  }
}

})
