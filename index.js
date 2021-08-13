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
            window.location.href = "https://prodzpod.github.io/witness/play#vs1_v2_AQIQBgU~7AcAAAc~8AGAv8A4--.AFugsQBboLE~6AEhGYwBGkP8Aoez-AIj--wD--yL-~~v2_AgIQBgUABw~AABw~5AH~BAHAAAGAv8A4--.AFugsQBboLE~6AEhGYwBGkP8Aoez-AIj--wD--yL-~~v2_AQIQ~8ABgUABwI~7AD-AOP--gBboLEAW6Cx~6ABIRmMARpD-AKHs-wCI--8A--8i-w__~~v2_AgIQBgUABw~GAc~8AF~6AYC-wDj--4AW6CxAFugsQ~6ASEZjAEaQ-wCh7P8AiP--AP--Iv8_~~v2_AwMQBgUAAAYK~CABQAABQAH~MAc~KAGCgYC-wDj--4AW6CxAFugsQ~6ASEZjAEaQ-wCh7P8AiP--AP--Iv8_~~v2_AwMQBgUAAAYK~GABw~LAH~FAFAAAGCgAABgL-AOP--gBboLEAW6Cx~6ABIRmMARpD-AKHs-wCI--8A--8i-w__~~v2_AwMQBgUABw~4AYK~6AEAAAD-~CABwAAAQAAAP8AAf~4-8AAf~4-8ABw~DAB~5-w~9AHAAAGAv8A4--.AFugsQBboLE~6AEhGYwBGkP8Aoez-AIj--wD--yL-~~v2_AwMQBgU~CAB~5-w~9AH~GABw~8AH~5-AAEAAAD-AAH~5-~AAYC-wDj--4AW6CxAFugsQ~6ASEZjAEaQ-wCh7P8AiP--AP--Iv8_~~v2_AwMQBgU~FAH~5-~DAQAAAP8AAf~4-8AAQAAAP8~CAB~5-w~CAcAAAYC-wDj--4AW6CxAFugsQ~6ASEZjAEaQ-wCh7P8AiP--AP--Iv8_~~v2_AwMQBw~5AGAQYU~6AH~5-AAAGFAAABw~8AEAAAD-~5AQAAAP8~7Ac~6Af~4-8~7AYF~7AHAP8A4--uAClVMABbsWY~6AEZjVABG-08A3v.hAIj--wD--yL-~~v2_BAQQBgUABw~DAB~4A-w~4AH~5-~AAc~6Af~4-8~4AB~4A-w~GAYKAAAB~4A-w~4AH~5-~FAB~5-w~4AEAAAD-~CABwAABgL-AOP--gBboLEAW6Cx~6ABIRmMARpD-AKHs-wCI--8A--8i-w__~~v2_BAQQ~6AYB~7AB~4A-wAB~5-w~4AH~5-~FAC--8A-w~4AEAAAD-AAL--wD-AAc~5ABgU~4AH~6AH~5-AAH~5-~AAc~8AB~4A-w~7AQAAAP8~7AYF~5AP8A4--uAClVMABbsWY~6AEZjVABG-08A3v.hAIj--wD--yL-~~v2_BAQQAAAH~6AcAAAYBAAIAAAD-~NAB~4A-w~7AQAAAP8AAAYKBgU~4AGBQ~4AIAAAD-~7AB~4A-w~DAGF~9AIAAAD-AAAGFAAABw~6A-wDj-.4AKVUwAFuxZg~6ARmNUAEb-TwDe-6EAiP--AP--Iv8_~~v2_BAQQ~4ABhQABhQ~6AgAAAP8AAAYUAAAB~4A-wAF~EAL~5-AAAGFAH~5-~4ABw~GAH~5-~LAQAAAP8~4AC~4A-wU~4AGBQ~4Ac~5ABgT-AOP-7gApVTAAW7Fm~6ABGY1QARv9PAN7-oQCI--8A--8i-w__~~v2_AwMQ~8ABgEAEf--AP8~4AB~KAEf--AP8~4AD~KAEf--AP8~4ADAAYF~8A-wD5-.MAS1UpALGhWw~6AY1VGAP-ORgD--aEAiP--AP--Iv8_~~v2_AwMQBw~8AYB~7AR--8A-wAQABE~4AF~8AEf--AP8AEAAx~CABQ~AAEf--AP8AEAARAAYF~7AHAP8A.f-jAEtVKQCxoVs~6AGNVRgD-zkYA--2hAIj--wD--yL-~~v2_BAQQBw~AABgE~KAH~8AEf--AP8AEABH~PABH--wD-ABAARw~6ABw~EABgo~5ABgU~9ABwD-APn-4wBLVSkAsaFb~6ABjVUYA-85GAP-9oQCI--8A--8i-w__~~v2_AQIQAAAGAg~4Ag~8AGBQAA-wD7-.MAUVUpALGoWw~6AYWNGAP-jRgD-4aEAiP--AP--Iv8_~~v2_AQIQAAAGAg~4AcAAAg~5ABgUAAP8A.--jAFFVKQCxqFs~6AGFjRgD-40YA-.GhAIj--wD--yL-~~v2_AgIQAAAFAAAGAQ~9AI~BAGBQAH~4A-wD7-.MAUVUpALGoWw~6AYWNGAP-jRgD-4aEAiP--AP--Iv8_~~v2_AwMQ~8ABgIAAf~4-8~7Ag~EAf~4-8~CAI~9AQAAAP8ABgUAC~7A-wD7-.MAUVUpALGoWw~6AYWNGAP-jRgD-4aEAiP--AP--Iv8_~~v2_AwMQ~6AgAAAYC~AAc~BAEAAAD-AAH~5-AAEAAAD-~AAc~BAYFAAg~6AP8A.--jAFFVKQCxqFs~6AGFjRgD-40YA-.GhAIj--wD--yL-~~v2_BAQQBw~5AI~6AcAABH--wD-ABAAAw~cABgU~4AI~NAF~7AR--8A-wAQAAM~HABgL-APv-4wBRVSkAsahb~6ABhY0YA-.NGAP-hoQCI--8A--8i-w__~~v2_CgoQAAAI~AAYU~8AC~6AGAg~QABgoAAAc~5ACAAGCgAGFAAGFAc~8AI~7AGCg~QABwAAC~9Ac~5ABwAACAAACAAABw~WAc~9ABhQABhQI~6Ac~ZAc~5ACAAABw~6ABhQAAAg~5ABw~HAGF~7ABhQ~8AH~6Ac~4AGFAYFBhQ~CAGF~5AYU~4ABhQ~4AGFAAGF~5AYUAAYU~AAYKAAYUAAYUAAYK~aABgo~8AI~4ABhQ~8AI~KABhQ~DABw~5AH~AAYUBwAAC~9Ag~WAH~BAHAAYU~6Ac~FAYK~JAGAwYKAAAI~6Ac~4AGFAAGCg~5AI~4A-wBFRUUAwsLCAMLCwg~6Abm5uAP---wD---8AiP--AP--Iv8_"
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
      