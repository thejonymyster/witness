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
        window.puzzle = deserializePuzzle("v2_CAgQ~BAGB~EAGFAAGFAAGFAAGFAAGFAAGFAAGF~5AYUIgEABgEGFAAGFAYE~4AIgIGFAAGF~5AYU~4ABhQABhQ~4AGFAAGF~5AYUBgQ~5ABhQ~4AGFAYBAAYBBhQ~4AGFAAGF~7ABhQABhQ~7AYUAAAGAgYU~4ABhQ~7AYU~AAYU~7AGFAAGF~5AYUBgIGF~6AGBQAABgEAAAYCBhQ~4AGFAAGF~7ABhQABhQ~7AYUBgMAAAYUAAYU~7AGFAYEBhQ~4AGF~7ABgIABhQ~4AGF~5AYUBgIGF~5AYUAAYU~7AGF~7ABhQABhQ~7AYU~7AGFAYD~8ABhQAAAYBBhQGBAYU~4ABhQABhQABhQ~4AGFAAGFAAGF~PAD-AAApEAAAKRAA-6OjAP---wDUaGgA-9SjAP-bqACI--8A--8i-2h0dHBzXDpcL1wvbWVkaWFcLmRpc2NvcmRhcHBcLm5ldFwvYXR0YWNobWVudHNcLzE1NTc3MzAzODkwODkzMjA5N1wvODc1NjMzODk1MjI2MzU1NzEyXC91bmtub3duXC5wbmdcP3dpZHRoXD02MzBcJmhlaWdodFw9NjMw");
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
        default: // editor
            window.location.href = './editor.html';
            break;
    }
}

});
      