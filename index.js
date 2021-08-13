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
    let svg = document.getElementById('puzzle')
    while (svg.firstChild) svg.removeChild(svg.firstChild)
    draw(window.puzzle)
    window.clearAnimations();
}

window.onload = function() {
    let toLoad = (new URL(window.location.href).hash);
    if (toLoad.startsWith('#vs')) window.location.replace('prodzpod.github.io/witness/play' + toLoad);
    else if (toLoad.startsWith('#v')) window.location.replace('prodzpod.github.io/witness/editor' + toLoad);
    else {
        window.puzzle = deserializePuzzle("v2_CAgQ~QAYUAAYUAAYUAAYUAAYUAAYUAAYU~4ABhQiAQAGAQYUAAYUBgQ~4AiAgYUAAYU~4ABhQ~4AGFAAGF~5AYUAAYU~4ABhQGB~6AGF~5AYUBgEABgEGF~5AYUAAYU~7AGFAAGF~7ABhQAAAYCBhQ~4AGF~7ABhQ~9ABhQ~7AYUAAYU~4ABhQGAgYU~6AYFAAAGAQAABgIGF~5AYUAAYU~7AGFAAGF~7ABhQGAwAABhQABhQ~7AYUBgQGF~5AYU~7AGAgAGF~5AYU~4ABhQGAgYU~4ABhQABhQ~7AYU~7AGFAAGF~7ABhQ~7AYUBgM~7AYEBhQAAAYBBhQGBAYU~4ABhQABhQABhQABhQABhQABhQABhQ~DABgE~AAP8AAEQbAAApEAD-o6MA~4-ANRoaAD-1KMA-9uoAIj--wD--yL-aHR0cHNcOlwvXC9tZWRpYVwuZGlzY29yZGFwcFwubmV0XC9hdHRhY2htZW50c1wvNTE1Njc4OTE0MzE2ODYxNDUxXC84NzU2MjE3NjQ0MTQxODk1OThcL2ltYWdlXzRcLnBuZ1w-d2lkdGhcPTUwOFwmaGVpZ2h0XD01MDg_");
        reloadPanel();
    }
}

window.reloadSymbolTheme = function() {
    draw(window.puzzle)
}

window.onSolvedPuzzle = function(paths) {
    let avgs = paths.map(segment => (
        {'x': (segment.poly1.animatedPoints[0].x + segment.poly1.animatedPoints[1].x + segment.poly1.animatedPoints[2].x + segment.poly1.animatedPoints[3].x), 
        'y': segment.poly1.animatedPoints[0].y + segment.poly1.animatedPoints[1].y + segment.poly1.animatedPoints[2].y + segment.poly1.animatedPoints[3].y}));
    let dir = "";
    for (let i = 1; i < avgs.length; i++) {
        if (Math.abs(avgs[i].x - avgs[i-1].x) > Math.abs(avgs[i].y - avgs[i-1].y)) {
            if (avgs[i].x > avgs[i-1].x) dir += 'r';
            else dir += 'l';
        } else {
            if (avgs[i].y > avgs[i-1].y) dir += 'd';
            else dir += 'u';
        }
    }
    switch (dir) {
        case 'uulluullll': // crosses
            break;
        case 'uulluulluu': // curves
            break;
        case 'uulluulluull': // x
            break;
        case 'uuuurruull': // pentagon
            break;
        case 'uuuurruurr': // copier
            break;
        case 'rruurrrruull': // arrow
            break;
        case 'rruurrrruu': // dart
            break;
        case 'rrr': // tent
            break;
        case 'rrrrrr': // antitriangle
            break;
        case 'rrrrrrdd': // holes
            break;
        case 'ddd': // antimino
            break;
        case 'ddrrrrddllddrr': // twobytwo
            break;
        case 'ddrrrrddrrdd': // celledhex
            break;
        case 'ddddddllllll': // sizer
            break;
        case 'ddddddlllllluu': // bridge
            break;
        case 'llddddlluull': // chips
            break;
        case 'lllluu': // divdiamonds
            break;
        case 'lllluulldd': // portals
            break;
        case 'dddddd': // editor
            window.location.href = './editor.html';
            break;
    }
}

});
      