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
            window.location.href = "https://prodzpod.github.io/witness/play#vs1_v2_AQIQ~6AEAAAD-AAYFAAYCAAH~5-~5AP8A4.b-AAA66QAAOuk~8AggAAajP8A~4-AIj--wD--yL-~~v2_AQIQ~6AMAAAD-AAYFAAYCAAP~5-~5AP8A4.b-AAA66QAAOuk~8AggAAajP8A~4-AIj--wD--yL-~~v2_AgIQBgU~7AMAAAD-AAMAAAD-~AAP~5-AAP~5-~6AYKBgL-AOPm-wAAOukAADrp~8AIIAAGoz-AP---wCI--8A--8i-w__~~v2_AgIQBgU~7AMAAAD-AAMAAAD-~AAP~5-AAP~5-Bgo~5ABgL-AOPm-wAAOukAADrp~8AIIAAGoz-AP---wCI--8A--8i-w__~~v2_AwMQ~BAD~4A-wAD~4A-wAD~4A-w~CAMAAAD-AAP~5-AAMAAAD-~AAYCAAP~5-AAP~5-AAP~5-AAYF~8A-wDj5v8AADrpAAA66Q~7ACCAABqM-wD---8AiP--AP--Iv8_~~v2_AwMQBgE~AAwAAAP8AAwAAAP8AAwAAAP8~CAD~4A-wAD~5-wAD~4A-w~CAP~5-AAP~5-AAP~5-AAYF~8A-wDj5v8AADrpAAA66Q~7ACCAABqM-wD---8AiP--AP--Iv8_~~v2_AQIQ~6AEAAAD-AAYFAAYCAAP~5-~5AP8A4.b-AAA66QAAOuk~8AggAAajP8A~4-AIj--wD--yL-~~v2_AQIQ~6AEAAAD-AAYFBgoGAgAD~5-w~4AD-AOPm-wAAOukAADrp~8AIIAAGoz-AP---wCI--8A--8i-w__~~v2_AQIQ~6AEAAAD-AAYFAAYCAAMAAAD-~5AP8A4.b-AE4A6QBOAOk~6ACsAgACMGv8A~4-AIj--wD--yL-~~v2_AQIQ~6AH~5-AAYFAAYCAAP~5-~5AP8A4.b-AE4A6QBOAOk~6ACsAgACMGv8A~4-AIj--wD--yL-~~v2_AgIQBgU~7AEAAAD-AAMAAAD-~AAMAAAD-AAH~5-~6AYKBgL-AOPm-wBOAOkATgDp~7ArAIAAjBr-AP---wCI--8A--8i-w__~~v2_AgIQBgU~7AEAAAD-AAMAAAD-~AAP~5-AAH~5-Bgo~5ABgL-AOPm-wBOAOkATgDp~7ArAIAAjBr-AP---wCI--8A--8i-w__~~v2_AwMQ~BAD~4A-wAD~4A-wAD~4A-w~CAEAAAD-AAH~5-AAEAAAD-~AAYCAAP~5-AAP~5-AAP~5-AAYF~8A-wDj5v8ATgDpAE4A6Q~6AKwCAAIwa-wD---8AiP--AP--Iv8_~~v2_AwMQBgE~AAwAAAP8AAQAAAP8AAwAAAP8~CAD~4A-wAB~5-wAD~4A-w~CAP~5-AAH~5-AAP~5-AAYF~8A-wDj5v8ATgDpAE4A6Q~6AKwCAAIwa-wD---8AiP--AP--Iv8_~~v2_BAQQAAAGAQ~9AD~4A-w~4AP~5-AAMAAAD-~FAB~4A-wAB~4A-wAB~4A-wAB~4A-w~FAwAAAP8AAf~4-8AAwAAAP8AAQAAAP8~FAP~5-AAH~5-AAP~5-AAEAAAD-AAYF~AAD-AOPm-wBOAOkATgDp~7ArAIAAjBr-AP---wCI--8A--8i-w__~~v2_BAQQ~EAMAAAD-AAMAAAD-AAP~5-AAMAAAD-~IAEAAAD-AAEAAAD-AAEAAAD-~FAD~4A-wAB~5-wAD~4A-wAB~4A-w~CAYCAAP~5-AAH~5-AAP~5-AAEAAAD-AAYF~AAD-AOPm-wBOAOkATgDp~7ArAIAAjBr-AP---wCI--8A--8i-w__~~v2_BAQQ~8ABgE~7AMAAAD-AAP~5-AAMAAAD-~FAB~4A-w~7AQAAAP8~FAMAAAD-AAH~5-AAMAAAD-~IAP~5-AAH~5-AAP~5-AAEAAAD-AAYF~AAD-AOPm-wBOAOkATgDp~7ArAIAAjBr-AP---wCI--8A--8i-w__~~v2_BwcQBgE~KAB~4A-w~4AH~5-~5AwAAAP8~4AD~5-w~PAD~4A-wAB~4A-wAD~5-w~7Af~4-8~NAP~5-~7AB~4A-wAB~5-wAD~4A-w~PAD~4A-wAB~5-w~9AD~5-wAB~4A-w~PAB~4A-wAD~4A-wAB~5-wAD~5-w~XAD~5-w~4AEAAAD-AAH~5-AAMAAAD-~NAB~5-wAD~5-w~4AMAAAD-~5AQAAAP8~NAYF-wBSUlIAgYGBALOzswD---8AWVhrAGxrzAD---8AiP--AP--Iv8_";
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
            window.location.href = "https://prodzpod.github.io/witness/play#vs1_v2_AgEQ~6AYCABP-AAD-~4AEQ~4AYF~5AP8A~4-APT09ACLi4s~6ALOzswAZTJoA7MsXAP--~4A~4-~~v2_AwEQ~8ABgI~4AT-wAA-wAAAREGCgAABgU~7AD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_AwMQ~8ABgIAE-8AAP8~4AD~RAGCgAGCg~AAE-8AAP8~4ADAAYF~8A-wD---8A9PT0AIuLiw~6As7OzABlMmgDsyxcA--8AAAD---8_~~v2_AwMQ~8ABgI~KAT-wAA-w~4AM~4AT-wAA-wAAABE~KAGBQ~5AFAAD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_BQUQ~8ABgE~4AGAg~UAE-8AAP8~4Az~9ABP-AAD-~4AEw~MAE-8AAP8~4AH~qAE-8AAP8~4AR~CABgU~DA-wD---8A9PT0AIuLiw~6As7OzABlMmgDsyxcA--8AAAD---8_~~v2_BQIQ~7AGF~6AGAg~LAGF~8ABP-AAD-~4AEQ~6AE-8AAP8AEAAR~4ABgU~DA-wD---8A9PT0AIuLiw~6As7OzABlMmgDsyxcA--8AAAD---8_~~v2_AwMQ~8ABgI~MABP-AAD-ABAARwAR--8A-wAQAEc~5ABQ~EABgU~7AD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_AwMQ~8ABgI~MABP-AAD-ABAARwAR--8A-wAQAEc~BAU~9ABgU~7AD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_AwMQ~8ABgI~KAR--8A-wAQAAcAEgAA--8AEAAHABP-AAD-ABAABw~KAYF~8A-wD---8A9PT0AIuLiw~6As7OzABlMmgDsyxcA--8AAAD---8_~~v2_BAMQ~8ABgE~4AC-wAA-w~RABP-AAD-ABAAEw~HAT-wAA-wAQABM~7AL-AAD-AAYF~8ABgoA-wD---8A9PT0AIuLiw~6As7OzABlMmgDsyxcA--8AAAD---8_~~v2_BAQQ~BAGAgACgP---w~MAE-8AAP8AEAEh~qAE4D---8AEAERAAL-AAD-AAYF~AAD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_BAQQ~4ABgo~5ABgI~4AT-wAA-wAQARE~5ABgo~IABP-AAD-ABABIQ~JABP-AAD-~4AIQ~8AYK~MAYF~AAD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_BQMQ~EAYCABP--wD-ABAAJw~9AR--8A-wAQJw~LAR-wAA-wAQAyI~4AT-wAA-wAQMiAGCg~WAYF~DAP8A~4-APT09ACLi4s~6ALOzswAZTJoA7MsXAP--~4A~4-~~v2_BQMQ~EAYCABP--wD-ABAAJw~9AR--8A-wAQJw~LAR-wAA-wAQAyI~4AT-wAA-wAQMi~EABgo~JAYF~DAP8A~4-APT09ACLi4s~6ALOzswAZTJoA7MsXAP--~4A~4-~~v2_BQMQ~EAYCABP-AAD-ABAyI~AAT-wAA-wAQACc~KAR--8A-wAQAyI~4AR--8A-wAQACc~RAYK~6AYF~DAP8A~4-APT09ACLi4s~6ALOzswAZTJoA7MsXAP--~4A~4-~~v2_BQMQ~EAYCABP-AAD-ABAyI~AAT-wAA-wAQACc~KAR--8A-wAQAxE~4AR--8A-wAQACc~GAFAAAGCg~DAGBQ~CAD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_BAQQBQAABQAABQAABQAABgIAE-8AAP8AEAAnABP-AAD-ABAAJwAT-wAA-wAQACcAE-8AAP8AEAAnAAUAAAUAAAUAAAUAAAUAAAL-AAD-ABP-AAD-ABAAJwAT-wAA-wAQACcAE-8AAP8AEAAnAAUAAAUAAAUAAAUAAAUAABP-AAD-ABAAJwAT-wAA-wAQACcAE-8AAP8AEAAnABP-AAD-ABAAJwAFAAAFAAAFAAAFAAAFAAAT-wAA-wAQACcAE-8AAP8AEAAnABP-AAD-ABAAJwAT-wAA-wAQACcABgUABQAABQAABQAABQD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_BQUQ~EAYC~XABP-AAD-ABAADw~.AEf--AP8AEE92~lAGBf8A~4-APT09ACLi4s~6ALOzswAZTJoA7MsXAP--~4A~4-~~v2_BQUQ~EAYC~XABP-AAD-ABAADw~.AEf--AP8AEE92~lAGBf8A~4-APT09ACLi4s~6ALOzswAZTJoA7MsXAP--~4A~4-~~v2_BgYQBgM~sABH--wD-~4AJwAT~4Ag~4ACc~cABH--wD-ABADEwAT~4AgAAQAxM~PAEf--AP8AAAJ0ABMAAAC~4ACd~yABH--wD-~4AYwAT~4Ag~4AGM~CAGBQ~FAP8~6ACkpKQCLi4sA~4-ALOzswAZTJoA7MsXAP--~4A~4-";
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
      