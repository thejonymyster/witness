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
    if (toLoad.startsWith('#vs')) window.location.replace('https://prodzpod.github.io/witness/play' + toLoad);
    else if (toLoad.startsWith('#v')) window.location.replace('https://prodzpod.github.io/witness/editor' + toLoad);
    else {
        window.puzzle = deserializePuzzle("v4_AWAIC~4AGYBAQEBAQEBAgICAgICAgICAgICAwMDAwMEBAQEBAQEBAUFBQUFBQYGBgYGBgYGBgYHBwcHCAgJCQkJCQkKCgoKCgsLCwsLCwsMDAwMDAwMDAwNDQ0NDg4ODg4ODg4ODg8PDw8PDw8CBAYICgwOAQMEBQcICgsMDQ4PAgYKDhABBQYJCwwNDwIEBggKDgECAwUGBwsMDg8ECAoMABACBAYKDA4BBQoLDwIEBggKDA4BAwUHCQsMDQ8ECAoQAQIEBQgJCwwPEAIEBggKDA4AIAAgACAAIAAgACAAIAAgACAAAQAgACAAAwACACAAAwAgAAIAAwAgACAAIAAgABAAIAAgAAMAIAAgAAEAIAAgAAEAIAAgAAQAIAAgACAABAAgACAAAQAgACAAAgAEACAAIAAgAAQAIAABAAgAIAAEACAAIAAEACAAIAAgAAIAIAAgAAEAIAABACAAIAAgAAQAIAAgACAAIAAgACAAAQAgACAAIAAgACAAEAAgAAIAAwAgAAIAIAAgAAIAIAABACAAIAAgACAAIAAgAC~4AEFBgQ~4ApEAAAKRAAqsKZAP---wCAXiMA-9SjAP---wCI--8A--8iaHR0cHNcOlwvXC9jZG5cLmRpc2NvcmRhcHBcLmNvbVwvYXR0YWNobWVudHNcLzUxNTY3ODkxNDMxNjg2MTQ1MVwvOTI4NTAzNzk0NzYzOTcyNjc4XC9pbWFnZV8zNVwucG5n");
        reloadPanel();
    }
}

window.reloadSymbolTheme = function() {
    draw(window.puzzle)
}

window.onSolvedPuzzle = function(paths) {
    let dir = pathsToDir(puzzle.path);
    switch (btoa(dir)) {
        case 'CBAKGg==': // cross
            window.location.href = "https://prodzpod.github.io/witness#vs1_v2_AQIQBgU~7AcAAAc~8AGAv8A4--.AFugsQBboLE~6AEhGYwBGkP8Aoez-AIj--wD--yL-~~v2_AgIQBgUABw~AABw~5AH~BAHAAAGAv8A4--.AFugsQBboLE~6AEhGYwBGkP8Aoez-AIj--wD--yL-~~v2_AgIQ~4ABhQ~7AYUBgUABwAABgI~5ABhQ~4AGFAD-AOP--gBboLEAW6Cx~6ABIRmMARpD-AKHs-wCI--8A--8i-w__~~v2_AgIQBgUABw~GAc~8AF~6AYC-wDj--4AW6CxAFugsQ~6ASEZjAEaQ-wCh7P8AiP--AP--Iv8_~~v2_AwMQBgUAAAYK~CABQAABQAH~MAc~KAGCgYC-wDj--4AW6CxAFugsQ~6ASEZjAEaQ-wCh7P8AiP--AP--Iv8_~~v2_AwMQBgUAAAYK~GABw~LAH~FAFAAAGCgAABgL-AOP--gBboLEAW6Cx~6ABIRmMARpD-AKHs-wCI--8A--8i-w__~~v2_AwMQBgUABw~4AYK~6AEAAAD-~CABwAAAQAAAP8AAf~4-8AAf~4-8ABw~DAB~5-w~9AHAAAGAv8A4--.AFugsQBboLE~6AEhGYwBGkP8Aoez-AIj--wD--yL-~~v2_AwMQBgU~CAB~5-w~9AH~GABw~8AH~5-AAEAAAD-AAH~5-~AAYC-wDj--4AW6CxAFugsQ~6ASEZjAEaQ-wCh7P8AiP--AP--Iv8_~~v2_AwMQBgU~FAH~5-~DAQAAAP8AAf~4-8AAQAAAP8~CAB~5-w~CAcAAAYC-wDj--4AW6CxAFugsQ~6ASEZjAEaQ-wCh7P8AiP--AP--Iv8_~~v2_AwMQBw~5AGAQYU~6AH~5-AAAGFAAABw~8AEAAAD-~5AQAAAP8~7Ac~6Af~4-8~7AYF~7AHAP8A4--uAClVMABbsWY~6AEZjVABG-08A3v.hAIj--wD--yL-~~v2_BAQQBgUABw~DAB~4A-w~4AH~5-~AAc~6Af~4-8~4AB~4A-w~GAYKAAAB~4A-w~4AH~5-~FAB~5-w~4AEAAAD-~CABwAABgL-AOP--gBboLEAW6Cx~6ABIRmMARpD-AKHs-wCI--8A--8i-w__~~v2_BAQQ~6AYB~7AB~4A-wAB~5-w~4AH~5-~FAC--8A-w~4AEAAAD-AAL--wD-AAc~5ABgU~4AH~6AH~5-AAH~5-~AAc~8AB~4A-w~7AQAAAP8~7AYF~5AP8A4--uAClVMABbsWY~6AEZjVABG-08A3v.hAIj--wD--yL-~~v2_BAQQAAAH~6AcAAAYBAAIAAAD-~NAB~4A-w~7AQAAAP8AAAYKBgU~4AGBQ~4AIAAAD-~7AB~4A-w~DAGF~9AIAAAD-AAAGFAAABw~6A-wDj-.4AKVUwAFuxZg~6ARmNUAEb-TwDe-6EAiP--AP--Iv8_~~v2_BAQQ~4ABhQABhQ~6AgAAAP8AAAYUAAAB~4A-wAF~EAL~5-AAAGFAH~5-~4ABw~GAH~5-~LAQAAAP8~4AC~4A-wU~4AGBQ~4Ac~5ABgT-AOP-7gApVTAAW7Fm~6ABGY1QARv9PAN7-oQCI--8A--8i-w__~~v2_AwMQ~8ABgEAEf--AP8~4AB~KAEf--AP8~4AD~KAEf--AP8~4ADAAYF~8A-wD5-.MAS1UpALGhWw~6AY1VGAP-ORgD--aEAiP--AP--Iv8_~~v2_AwMQBw~8AYB~7AR--8A-wAQABE~4AF~8AEf--AP8AEAAx~CABQ~AAEf--AP8AEAARAAYF~7AHAP8A.f-jAEtVKQCxoVs~6AGNVRgD-zkYA--2hAIj--wD--yL-~~v2_BAQQBw~AABgE~KAH~8AEf--AP8AEABH~PABH--wD-ABAARw~6ABw~EABgo~5ABgU~9ABwD-APn-4wBLVSkAsaFb~6ABjVUYA-85GAP-9oQCI--8A--8i-w__~~v2_AQIQAAAGAg~4Ag~8AGBQAA-wD7-.MAUVUpALGoWw~6AYWNGAP-jRgD-4aEAiP--AP--Iv8_~~v2_AQIQAAAGAg~4AcAAAg~5ABgUAAP8A.--jAFFVKQCxqFs~6AGFjRgD-40YA-.GhAIj--wD--yL-~~v2_AgIQAAAFAAAGAQ~9AI~BAGBQAH~4A-wD7-.MAUVUpALGoWw~6AYWNGAP-jRgD-4aEAiP--AP--Iv8_~~v2_AwMQ~8ABgIAAf~4-8~7Ag~EAf~4-8~CAI~9AQAAAP8ABgUAC~7A-wD7-.MAUVUpALGoWw~6AYWNGAP-jRgD-4aEAiP--AP--Iv8_~~v2_AwMQ~6AgAAAYC~AAc~BAEAAAD-AAH~5-AAEAAAD-~AAc~BAYFAAg~6AP8A.--jAFFVKQCxqFs~6AGFjRgD-40YA-.GhAIj--wD--yL-~~v2_BAQQBw~5AI~6AcAABH--wD-ABAAAw~cABgU~4AI~NAF~7AR--8A-wAQAAM~HABgL-APv-4wBRVSkAsahb~6ABhY0YA-.NGAP-hoQCI--8A--8i-w__~~v2_CgoQAAAI~AAYU~8AC~6AGAg~QABgoAAAc~5ACAAGCgAGFAAGFAc~8AI~7AGCg~QABwAAC~9Ac~5ABwAACAAACAAABw~WAc~9ABhQABhQI~6Ac~ZAc~5ACAAABw~6ABhQAAAg~5ABw~HAGF~7ABhQ~8AH~6Ac~4AGFAYFBhQ~CAGF~5AYU~4ABhQ~4AGFAAGF~5AYUAAYU~AAYKAAYUAAYUAAYK~aABgo~8AI~4ABhQ~8AI~KABhQ~DABw~5AH~AAYUBwAAC~9Ag~WAH~BAHAAYU~6Ac~FAYK~JAGAwYKAAAI~6Ac~4AGFAAGCg~5AI~4A-wBFRUUAwsLCAMLCwg~6Abm5uAP---wD---8AiP--AP--Iv8_";
            break;
        case 'CBAKCgI=': // curve
            window.location.href = "https://prodzpod.github.io/witness#vs1_v3_AQICEAAACAAABgI~9ABw~AABgU~4AHAP8AenJsAFRJQACrn5IA~4-AHpybADjiUUA~4-AIj--wD--yL-~~v3_AQECEAYF~7ANAAAN~8ABgL-AHpybABUSUAAq5.SAP---wB6cmwA44lFAP---wCI--8A--8i-w__~~v3_AQICEAYFAA0~BA0~5ADQ~AADQAABgL-AHpybABUSUAAq5.SAP---wB6cmwA44lFAP---wCI--8A--8i-w__~~v3_AQICE~5AYU~7AGFAYFAA0AAAYC~6AYU~4ABhQA-wB6cmwAVElAAKufkgD---8AenJsAOOJRQD---8AiP--AP--Iv8_~~v3_AQICEAYFAA0~GAO~8ABQ~5AGAv8AenJsAFRJQACrn5IA~4-AHpybADjiUUA~4-AIj--wD--yL-~~v3_AQMDEA0AAAcAAA0AAAYC~AAcAAA0AAAcAAA0~BA0AAAcAAA0AAAc~BAYFAA0AAAcAAA0A-wB6cmwAVElAAKufkgD---8AenJsAOOJRQD---8AiP--AP--Iv8_~~v3_AQMDEA0AAA0AAA0AAAYCAAEAAAD-~5Af~4-8ADQAADQAADQAADQ~AADQAADQAADQAADQAAAf~4-8~4AB~4A-wAGBQANAAANAAANAP8AenJsAFRJQACrn5IA~4-AHpybADjiUUA~4-AIj--wD--yL-~~v3_AQMDEA4~8AGAg~7AQAAAP8~7A4~8AC~4A-wYK~6A4~8AB~4A-w~6ABgU~7A4A-wB6bGwAXkpKAKuSkgD---8AemxsAOOJRQD---8AiP--AP--Iv8_~~v3_AQQEEA0AAA0AAA0AAA0AAAYC~4ABP.lAP8B~7ANAAANAAANAAANAAAN~EA0AAA0AAA0AAA0AAA0~DADQAADQAADQAADQAADQ~DAGBQANAAANAAANAAANAP8AemxsAF5KSgCrkpIA~4-AHpsbADjiUUA~4-AIj--wD--yL-~~v3_AQQEE~BABgI~HADQ~AAEf.lAP8AEABj~AA0~5ABw~AAEf.lAP8AEABj~AA0~CAGCg~5AGBQ~AA-wB6bGwAXkpKAKuSkgD---8AemxsAOOJRQD---8AiP--AP--Iv8_~~v3_AQQEE~BABgI~FAc~5ADQ~7ABH-pQD-ABAAJw~PAR-6UA-wAQACc~4AN~BAH~7AGCg~5AGBQ~AA-wB6bGwAXkpKAKuSkgD---8AemxsAOOJRQD---8AiP--AP--Iv8_~~v3_AQQEEAAABw~5AHAAAGAg~HAN~BAR-6UA-wAQAGMAEf.lAP8AEAAB~4ADQAABw~DAR-6UA-wAQAAEAEf.lAP8AEAAB~SABgU~7A0AAAD-AHpsbABeSkoAq5KSAP---wB6bGwA44lFAP---wCI--8A--8i-w__~~v3_AQQEE~6AI~6AYC~7AC-6UA-wAC-6UA-w~4A4~EAf.lAP8~4AC-6UA-w~9AO~6AL-pQD-~5Af.lAP8~IAv.lAP8AAv.lAP8~7AYF~4AC~7A-wB6bGwAXkpKAKuSkgD---8AemxsAOOJRQD---8AiP--AP--Iv8_~~v3_AQYGEAYFAA0AAA0AAA0AAA0AAA0AAA0BBgo~7AYK~8ADQAADQAADQAADQAADQAADQAADQ~IADQAGCg0AAA0AAA0AAA0AAA0ABgoN~AAYK~8ADQAADQAADQAADQAADQAADQAADQ~IADQAADQAGCg0AAA0AAA0AAA0AAA0~FAYKAAANAAANAAANAAANAAANAAANAAAN~JANAAANAAANAAANAAANAAANAAANAP8AemxsAF5KSgCrkpIA~4-AHpsbADjdEUA~4-AIj--wD--yL-~~v3_AQQEE~9A0~DAEf.lAP8AEAAh~KAEf.lAP8AEAAh~KAEf.lAP8AEAAh~CADQ~7ABH-pQD-ABAAIQ~9AGBQ~9AGAv8AemxsAF5KSgCrkpIA~4-AHpsbADjiUUA~4-AIj--wD--yL-~~v3_AQQEE~9AYE~5Af~4-8~5ABhQB~5-w~4A0ABgo~BAEAAAD-~QAEAAAD-~7AGBQ~4A0~6Af~4-8~7AH~5-~4ADQ~8AD-AHpsbABeSkoAq5KSAP---wB6bGwA44lFAP---wCI--8A--8i-w__~~v3_AQkJEA0AAA0AAA0AAA0AAA0AAA0AAA0AAA0AAA0AAA0C~QA0AAA0AAA4AAA0AAA0AAA0AAA4AAA0AAA0AAA0~7AYK~JANAAYKDQAADgAADQAADQAADQAADgAADQAADgAADQ~HAGCg~8A0AAA0ABgoOAAANAAANAAANAAAOAAANAAAOAAAN~RAN~6A0~5ADQ~5AN~6A0~WAN~4ABgoN~6A0~5ADQ~5AN~FAGCg~AADQAADgAADQAADgAADQAADQAADQAADQAADQAADQ~QADQAADgAADQAADgAADQAADQAADgAADQAADQAADQ~4AYK~MA0AAA4AAA0AAA4AAA0AAA0AAA4ABgoOAAAOAAAN~RAGBQANAAANAAYKDQAADQAADQAADQAADQAADQAADQD-AEVFRQDCwsIAwsLCAP---wBubm4A~4-AP---wCI--8A--8i-w__";
            break;
        case 'CBAKCgA=': // dots
            break;
        case 'CBAKAw==': // x
            break;
        case 'CBCq9Q0=': // pentagon
            window.location.href = "https://prodzpod.github.io/witness#vs1_v2_AQIQ~6AEAAAD-AAYFAAYCAAH~5-~5AP8A4.b-AAA66QAAOuk~8AggAAajP8A~4-AIj--wD--yL-~~v2_AQIQ~6AMAAAD-AAYFAAYCAAP~5-~5AP8A4.b-AAA66QAAOuk~8AggAAajP8A~4-AIj--wD--yL-~~v2_AgIQBgU~7AMAAAD-AAMAAAD-~AAP~5-AAP~5-~6AYKBgL-AOPm-wAAOukAADrp~8AIIAAGoz-AP---wCI--8A--8i-w__~~v2_AgIQBgU~7AMAAAD-AAMAAAD-~AAP~5-AAP~5-Bgo~5ABgL-AOPm-wAAOukAADrp~8AIIAAGoz-AP---wCI--8A--8i-w__~~v2_AwMQ~BAD~4A-wAD~4A-wAD~4A-w~CAMAAAD-AAP~5-AAMAAAD-~AAYCAAP~5-AAP~5-AAP~5-AAYF~8A-wDj5v8AADrpAAA66Q~7ACCAABqM-wD---8AiP--AP--Iv8_~~v2_AwMQBgE~AAwAAAP8AAwAAAP8AAwAAAP8~CAD~4A-wAD~5-wAD~4A-w~CAP~5-AAP~5-AAP~5-AAYF~8A-wDj5v8AADrpAAA66Q~7ACCAABqM-wD---8AiP--AP--Iv8_~~v2_AQIQ~6AEAAAD-AAYFAAYCAAP~5-~5AP8A4.b-AAA66QAAOuk~8AggAAajP8A~4-AIj--wD--yL-~~v2_AQIQ~6AEAAAD-AAYFBgoGAgAD~5-w~4AD-AOPm-wAAOukAADrp~8AIIAAGoz-AP---wCI--8A--8i-w__~~v2_AQIQ~6AEAAAD-AAYFAAYCAAMAAAD-~5AP8A4.b-AE4A6QBOAOk~6ACsAgACMGv8A~4-AIj--wD--yL-~~v2_AQIQ~6AH~5-AAYFAAYCAAP~5-~5AP8A4.b-AE4A6QBOAOk~6ACsAgACMGv8A~4-AIj--wD--yL-~~v2_AgIQBgU~7AEAAAD-AAMAAAD-~AAMAAAD-AAH~5-~6AYKBgL-AOPm-wBOAOkATgDp~7ArAIAAjBr-AP---wCI--8A--8i-w__~~v2_AgIQBgU~7AEAAAD-AAMAAAD-~AAP~5-AAH~5-Bgo~5ABgL-AOPm-wBOAOkATgDp~7ArAIAAjBr-AP---wCI--8A--8i-w__~~v2_AwMQ~BAD~4A-wAD~4A-wAD~4A-w~CAEAAAD-AAH~5-AAEAAAD-~AAYCAAP~5-AAP~5-AAP~5-AAYF~8A-wDj5v8ATgDpAE4A6Q~6AKwCAAIwa-wD---8AiP--AP--Iv8_~~v2_AwMQBgE~AAwAAAP8AAQAAAP8AAwAAAP8~CAD~4A-wAB~5-wAD~4A-w~CAP~5-AAH~5-AAP~5-AAYF~8A-wDj5v8ATgDpAE4A6Q~6AKwCAAIwa-wD---8AiP--AP--Iv8_~~v2_BAQQAAAGAQ~9AD~4A-w~4AP~5-AAMAAAD-~FAB~4A-wAB~4A-wAB~4A-wAB~4A-w~FAwAAAP8AAf~4-8AAwAAAP8AAQAAAP8~FAP~5-AAH~5-AAP~5-AAEAAAD-AAYF~AAD-AOPm-wBOAOkATgDp~7ArAIAAjBr-AP---wCI--8A--8i-w__~~v2_BAQQ~EAMAAAD-AAMAAAD-AAP~5-AAMAAAD-~IAEAAAD-AAEAAAD-AAEAAAD-~FAD~4A-wAB~5-wAD~4A-wAB~4A-w~CAYCAAP~5-AAH~5-AAP~5-AAEAAAD-AAYF~AAD-AOPm-wBOAOkATgDp~7ArAIAAjBr-AP---wCI--8A--8i-w__~~v2_BAQQ~8ABgE~7AMAAAD-AAP~5-AAMAAAD-~FAB~4A-w~7AQAAAP8~FAMAAAD-AAH~5-AAMAAAD-~IAP~5-AAH~5-AAP~5-AAEAAAD-AAYF~AAD-AOPm-wBOAOkATgDp~7ArAIAAjBr-AP---wCI--8A--8i-w__~~v2_BwcQBgE~KAB~4A-w~4AH~5-~5AwAAAP8~4AD~5-w~PAD~4A-wAB~4A-wAD~5-w~7Af~4-8~NAP~5-~7AB~4A-wAB~5-wAD~4A-w~PAD~4A-wAB~5-w~9AD~5-wAB~4A-w~PAB~4A-wAD~4A-wAB~5-wAD~5-w~XAD~5-w~4AEAAAD-AAH~5-AAMAAAD-~NAB~5-wAD~5-w~4AMAAAD-~5AQAAAP8~NAYF-wBSUlIAgYGBALOzswD---8AWVhrAGxrzAD---8AiP--AP--Iv8_";
            break;
        case 'CBCq9VUa': // arrow
            window.location.href = "https://prodzpod.github.io/witness#vs1_v4_AYABAg~4AIAAgQAAAgAAgAAAg~4AEFCQEFCQIA6OjoAM3L2AC1tcQ~6AICBiQCZkawAmQD-AIj--wD--yI_~~v4_AYABAg~4AIAAgQAAAgAAgAAAQABBhYIAOjo6ADNy9gAtbXE~6ACAgYkAmZGsAJkA-wCI--8A--8i~~v4_AYABAg~4AIAAgQAAAgAAgAAAQAABhYIAOjo6ADNy9gAtbXE~6ACAgYkAmZGsAJkA-wCI--8A--8i~~v4_AYABAg~4AIAAgQAAAgAAgAAAQABBhYQAOjo6ADNy9gAtbXE~6ACAgYkAmZGsAJkA-wCI--8A--8i~~v4_AYACAg~4AIEBAAEAAIAC~4AgEBAAEGFg4GFg4A6OjoAM3L2AC1tcQ~6AICBiQCZkawAmQD-AIj--wD--yI_~~v4_AYACAg~4AIEBAAEAAIAC~4AgEBAAEGFhYGFg4A6OjoAM3L2AC1tcQ~6AICBiQCZkawAmQD-AIj--wD--yI_~~v4_AYACAg~4AIEBAAEAAIAC~4AgABAAEGFgwGFhYA6OjoAM3L2AC1tcQ~6AICBiQCZkawAmQD-AIj--wD--yI_~~v4_AYADAw~4AQAAwQGBgIBBgAIABAAEAACAAADAAECAAIBBhYMBhYQBhYMAOjo6ADNy9gAtbXE~6ACAgYkAmZGsAJkA-wCI--8A--8i~~v4_AYABAQ~4AIAAgIAAAgAAgAAAQAABhYLAOjo6ADNy9gAtbXE~6ACAgYkAmZGsAJkA-wCI--8A--8i~~v4_AYACAg~4AIABAQAAAgAAgAAAQEABhYNAOjo6ADNy9gAtbXE~6ACAgYkAmZGsAJkA-wCI--8A--8i~~v4_AYADAw~4AQAAQUGBgAGAAAIABAAEAACAAAEAAEBAgEAAgEGFhIGFgwGFg8GFg0A6OjoAM3L2AC1tcQ~6AICBiQCZkawAmQD-AIj--wD--yI_~~v4_AaADAw~4AMCAgYEBQAACAAQAAIAAAUAAQECAgEAAgACAgMGFhQCAwIABhYPAOjo6ADNy9gAtbXE~6ACAgYkAmZGsAJkA-wCI--8A--8i~~v4_AaAEB~5AcAAQIHBwgIBwgCAAgBCAAgACAACAAgABAAIAACAAAHAAECAgIDAwIAAAEDAQICAwIABQkBAgAGFg8CAwIDAOjo6ADNy9gAtbXE~6ACAgYkAmZGsAJkA-wCI--8A--8i~~v4_AaAEB~5AcAAQIEBAgIBwgIAAYABQAgACAeAAABAAgeAAAQAAAFAAECAgMCAgECAwMABhYQAgAGFg8CAwDo6OgAzcvYALW1x~7AgIGJAJmRrACZAP8AiP--AP--Ig__~~v4_AaAEBB4AAAIACAgAHggeAgAAAwIDAwECAwYWDgYWDgYWFgDo6OgAzcvYALW1x~7AgIGJAJmRrACZAP8AiP--AP--Ig__~~v4_AaAEB~5AIACAgAAAgAAgAACg~4AEBAgIDAwMAAQMAAgEDAAIDBhYSBhYIBhYIBhYMBhYMBhYIBhYIBhYMBhYMBhYeAOjo6ADNy9gAtbXE~6ACAgYkAmZGsAJkA-wCI--8A--8i~~v4_AaAEB~5AQABQgICAgAAwAIABAAAgAQAAAFAAABAgMCAwADAQUJAQYWEQUJAwUJAgUJAQDo6OgAzcvYALW1x~7AgIGJAJmRrACZAP8AiP--AP--Ig__~~v4_AaAEB~5AIACAgAAAgAAgAABQEBAgIDAQIBAgEGFg8cDABHHAwAYwYWCgYWDADo6OgAzcvYALW1x~7AgIGJAJmRrACZAP8AiP--AP--Ig__~~v4_AaAEB~5AQAAgQICAc~4AIABAeAAACAAAEAAECAgMBAAIGFggcDAAhBhYMHAwDIwDo6OgAzcvYALW1x~7AgIGJAJmRrACZAP8AiP--AP--Ig__~~v4_AaAEB~5AoAAAEDAwQFBgcIBQcIAAQBAAQIBwAQACAAIAAgAAEAIAAgAAgAIAAgAAAFAAIDAwMCAwABAgIDAgMDAAYWDgIAAOjo6ADNy9gAtbXE~6ACAgYkAmZGsAJkA-wCI--8A--8i~~v4_AaAGBg~4AYDBgYGBwwAAQIKDAcAEAAgAAEACAAQAB~4A8~4ABAQECAwMEBAUFBQUAAgMBBAUDAgMAAQECAwUGAQwGARsGARAGARUGARcGAQwGARIGARAGAQwGARYGAQgGAR4GAQ4GAR8GAQgA6OjoAN7e3gDExMQ~6AI.PjwDo6OgA~4-AIj--wD--yI_~~v4_AYADAw~4A4BAQICAgMDAwMEBAQFBQIEAQMFAAIEBgEDBQIEACAAIAAgACAAIAABACAAIAAIACAAIAAgACAAI~4AQIBBhYOAOjo6ADNy9gAtbXE~6ACAgYkAmZGsAJkA-wCI--8A--8iaHR0cHNcOlwvXC9jZG5cLmRpc2NvcmRhcHBcLmNvbVwvYXR0YWNobWVudHNcLzUxNTY3ODkxNDMxNjg2MTQ1MVwvOTI4ODA3MDUzNjAwODk1MDE2XC9pbWFnZV8zN1wucG5n"
            break;
        case 'CBCq9VUKAg==': // dart
            break;
        case 'CBCqqvUB': // antitriangle
            break;
        case 'CBCqqqUJ': // tent
            window.location.href = "https://prodzpod.github.io/witness/play#vs1_v2_AgEQ~8ACP.lAP8ACP.lAP8ABgU~4AGAv8AY4hxAEt3UgBik24A~4-AD1RSQCiuaIA7d7AAIj--wD--yL-~~v2_AgEQ~8ACP.lAP8ACP.lAP8ABgUGCgAABgL-AGOIcQBLd1IAYpNuAP---wA9UUkAormiAO3ewACI--8A--8i-w__~~v2_AwEQ~BAI-6UA-w~4Aj-pQD-AAYF~7AGAv8AY4hxAEt3UgBik24A~4-AD1RSQCiuaIA7d7AAIj--wD--yL-~~v2_AwEQ~BAI-6UA-w~4Aj-pQD-AAYFBQ~6ABgL-AGOIcQBLd1IAYpNuAP---wA9UUkAormiAO3ewACI--8A--8i-w__~~v2_AwEQAAU~8AFAAj-pQD-~4ACP.lAP8ABgU~7AYC-wBjiHEAS3dSAGKTbgD---8APVFJAKK5ogDt3sAAiP--AP--Iv8_~~v2_AwEQ~BAI-6UA-wAABQAI-6UA-wUABgU~7AYC-wBjiHEAS3dSAGKTbgD---8APVFJAKK5ogDt3sAAiP--AP--Iv8_~~v2_AgIQ~8ACP.lAP8~CAI-6UA-w~4AYF~4ABgL-AGOIcQBLd1IAYpNuAP---wA9UUkAormiAO3ewACI--8A--8i-w__~~v2_AwIQ~GACP.lAP8~5ABQ~6ACP.lAP8~7AYF~7AGAv8AY4hxAEt3UgBik24A~4-AD1RSQCiuaIA7d7AAIj--wD--yL-~~v2_AwMQ~BAB~4A-w~4Aj-pQD-~CACP.lAP8AAQAAAP8AAf~4-8~CAB~5-w~4AEAAAD-AAYF~7AGAv8AY4hxAEt3UgBik24A~4-AD1RSQCiuaIA7d7AAIj--wD--yL-~~v2_AwEQ~BAI-6UA-wAI-6UA-wAI-6UA-wAGBQ~6ABgL-AFE9QgBxVlwAqo2VAP---wCWbncA-.XnAOxfawCI--8A--8i-w__~~v2_AgMQ~8ACP.lAP8~CAI-6UA-w~CAj-pQD-~4ABgU~4AGAv8AUT1CAHFWXACqjZUA~4-AJZudwD-5ecA7F9rAIj--wD--yL-~~v2_AgMQ~8ACP.lAP8ACP.lAP8~NAj-pQD-AAj-pQD-AAYF~4ABgL-AFE9QgBxVlwAqo2VAP---wCWbncA-.XnAOxfawCI--8A--8i-w__~~v2_AwMQ~GACP.lAP8~CAI-6UA-w~4Aj-pQD-~CACP.lAP8~4AI-6UA-wAGBQ~6ABgL-AFE9QgBxVlwAqo2VAP---wCWbncA-.XnAOxfawCI--8A--8i-w__~~v2_AwMQ~CABgoAAAj-pQD-~CACP.lAP8~BAYK~6Aj-pQD-~4ACP.lAP8ABgU~7AYC-wBRPUIAcVZcAKqNlQD---8Alm53AP-l5wDsX2sAiP--AP--Iv8_~~v2_AwMQ~BAI-6UA-wAI-6UA-w~HAC-6UA-wAI-6UA-w~HAC-6UA-wAGBQ~6ABgL-AFE9QgBxVlwAqo2VAP---wCWbncA-.XnAOxfawCI--8A--8i-w__~~v3_AQIDE~9Aj-pQD-AAj-pQD-~NAI-6UA-wAI-6UA-wAGBQ~4AYC-wA.PVEAVl5xAEmRqwD---8ARDdYANv3-wAkSrwAiP--AP--Iv8_~~v2_AgMQ~8ACP--gP8ACP--gP8~NAj-pQD-AAj-pQD-AAYF~4ABgL-AD49UQBWXnEASZGrAP---wBEN1gA2-f-ACRKvACI--8A--8i-w__~~v2_AgMQ~8ACP.lAP8ACP--gP8~NAj-pQD-AAj--4D-AAYF~4ABgL-AD49UQBWXnEASZGrAP---wBEN1gA2-f-ACRKvACI--8A--8i-w__~~v2_AwMQ~BAI--.A-w~4Aj-pQD-~FAI-6UA-wAI--.A-w~HAI--.A-wAGBQ~6ABgL-AD49UQBWXnEASZGrAP---wBEN1gA2-f-ACRKvACI--8A--8i-w__~~v2_AwMQ~BAI--.A-w~4Aj-pQD-~6AU~9ACP.lAP8ACP--gP8~5ABgo~BAj--4D-AAYF~7AGAv8APj1RAFZecQBJkasA~4-AEQ3WADb9-8AJEq8AIj--wD--yL-~~v3_AQMEE~HAj6jwT-~CACP--gP8AEf--AP8AEAADAAj6jwT-~FAR--8A-wAQAAM~FAj--4D-~4ACP--gP8ABgU~7AYC-wA.PVEAVl5xAEmRqwD---8ARDdYANv3-wAkSrwAiP--AP--Iv8_~~v2_AgIQ~MAj-pQD-AAj--4D-AAYF~4ABgL-ACw-MQAoNCkAF5cdAP---wAhVC4Am.6bAGje7gCI--8A--8i-w__~~v2_AgIQ~8ACMzMzP8~CAI-6UA-wAI--.A-wAGBQ~4AYC-wAsPzEAKDQpABeXHQD---8AIVQuAJvumwBo3u4AiP--AP--Iv8_~~v2_AwMQ~CABgo~8AFAAAF~6Aj-pQD-AAj--4D-AAjMzMz-AAAGCgUAAAU~DABgU~7AYC-wAsPzEAKDQpABeXHQD---8AIVQuAJvumwBo3u4AiP--AP--Iv8_~~v2_AwMQ~MAUAAAU~5ACP.lAP8GCgj--4D-BgoIzMzM-w~4AUAAAU~DABgU~7AYC-wAsPzEAKDQpABeXHQD---8AIVQuAJvumwBo3u4AiP--AP--Iv8_~~v2_AwMQ~MAUABgoF~6Aj-pQD-AAj--4D-BgoIzMzM-w~4AUAAAU~DABgUAAAYKAAAGAv8ALD8xACg0KQAXlx0A~4-ACFULgCb7psAaN7uAIj--wD--yL-~~v2_BQQXBgM~4AF~8ABgU~9ACP--gP8~5ABQ~HAI-6UA-w~KAU~PABQ~HAIzMzM-w~4AYFAAAF~AAYC-wAsPzEAKDQpABeXHQD---8AIVQuAJvumwBo3u4AiP--AP--Iv8_~~v4_AZADAw~4AIABgYGAAgAAgAAAwEBAQABAgkJCQ0JBQBQK00AbTBuAMJwvwD---8AeXJ4APG87ACZTM0AiP--AP--Ig__~~v4_AZAFBQ~4AIACgoKAAgAAgAACQAAAQICAwMDBAEDAQMEAQIEAAkNCQUJCQkFCQkJBQkJCQ0JDQBQK00AbTBuAMJwvwD---8AeXJ4APG87ACZTM0AiP--AP--Ig__~~v4_AYAFB~4AD~7AQEBAQECAgICAgMDAwMEBAQEBQUFBQYGBgYHBwcHCAgICAgJCQkJCQoKCgoBAwUHAAIEBggBAwQFBwACBggBAwUHAAIGCAEDBQcAAgYIAQMEBQcAAgQGCAEDBQcAIAAgACAAIAAgACAAIAAgACAAIAAgAAgAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAAgAgACAAIAAgACAAIAAgACAAIAAgAC~4AECAgkDAGOIcQBLd1IAYpNuAP---wA9UUkAormiAO3ewACI--8A--8i"
            break;
        case 'CBCqDQ==': // swirl
            break;
        case 'CBCqqqVVHw==': // bridge
            window.location.href = "https://seren-35.github.io/witness-playground/";
            break;
        case 'CBCqyg==': // divdiamond
            break;
        case 'CBCqCso=': // chips
            window.location.href = "https://prodzpod.github.io/witness#vs1_v3_AQMBE~9AYBAAyAAAD-AAyAAAD-AAyAAAD-AAYF~8A-wA4ODgAqkZGAMV8f~7AyaamAODg4AD---8AiP--AP--Iv8_~~v3_AQMBE~9AYBAAyAAAD-~4ADIAAAP8ABgU~7AD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQMDE~9AYBAAyAAAD-~4ADIAAAP8~VAyAAAD-~4ADIAAAP8ABgU~7AD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQQEE~BABgEADIAAAP8~7AyAAAD-~NAMgAAA-w~cADIAAAP8~7AyAAAD-AAYF~AAD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQQEE~BABgEADIAAAP8~4AMgAAA-wAMgAAA-w~.ADIAAAP8~7AyAAAD-AAYF~AAD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQMDE~9AYB~7AMgAAA-w~HAMgAAA-w~CAyAAAD-AAyAAAD-AAyAAAD-AAYF~8A-wA4ODgAqkZGAMV8f~7AyaamAODg4AD---8AiP--AP--Iv8_~~v3_AQMDE~9AYBAAyAAAD-~4ADIAAAP8~HADIAAAP8~CAMgAAA-wAMgAAA-wAMgAAA-wAGBQ~7AP8AODg4AKpGRgDFfHw~6AMmmpgDg4OAA~4-AIj--wD--yL-~~v3_AQQDE~BABgE~PADIAAAP8ADIAAAP8ADIAAAP8ADIAAAP8~KAMgAAA-w~4AYF~AAD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQICE~6AGAQAMgAAA-wAMAAD--w~9AMgAAA-wAMAAD--wAGBQ~4AD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQMDE~9AYB~4ADIAAAP8~FAwAAP--~4ADAAA--8~FAyAAAD-~4ABgU~7AD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQQEE~BABgEADIAAAP8~7AyAAAD-~FAMAAD--wAMAAD--wAMAAD--wAMAAD--w~fAMgAAA-w~4AyAAAD-AAYF~AAD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQQEE~BABgEADIAAAP8~7AyAAAD-~FAMAAD--wAMAAD--wAMAAD--wAMAAD--w~EADIAAAP8~VAyAAAD-AAYF~AAD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQQEE~BABgE~4AMgAAA-wAMgAAA-wAMgAAA-w~EADAAA--8~lAwAAP--AAwAAP--AAwAAP--AAyAAAD-AAYF~AAD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQQEE~BABgEADIAAAP8~4AMgAAA-wAMgAAA-w~HAMAAD--w~iAwAAP--AAwAAP--AAwAAP--AAyAAAD-AAYF~AAD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQMCE~9AYCAAH~5-AAEAAAD-~FAMgAAA-w~4AyAAAD-AAYF~8A-wA4ODgAqkZGAMV8f~7AyaamAODg4AD---8AiP--AP--Iv8_~~v3_AQMDE~9AYCAAyAAAD-AAEAAAD-AAyAAAD-~FAB~4A-wAB~5-w~CAyAAAD-AAH~5-AAyAAAD-AAYF~8A-wA4ODgAqkZGAMV8f~7AyaamAODg4AD---8AiP--AP--Iv8_~~v3_AQQEE~BABgIAD~4AP8~7AwAAAD-~FAM~4A-w~4AH~5-AAGAAAD-~FABgAAA-wAB~5-w~KAwAAAD-~7AM~4A-wAGBQ~AA-wA4ODgAqkZGAMV8f~7AyaamAODg4AD---8AiP--AP--Iv8_~~v3_AQQEE~BABgIADP~4-8ADP~4-8~4AM~5-w~KAGAAAD-AAEAAAD-~FAB~4A-wABgAAA-w~KAz~5-~7AM~5-wAGBQ~AA-wA4ODgAqkZGAMV8f~7AyaamAODg4AD---8AiP--AP--Iv8_~~v3_AQMDE~9AYBAAEAAAD-~5Af~4-8~VAwAAAD-~4AD~4AP8ABgU~7AD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQMDE~9AYBAAEAAAD-~5Af~4-8~VAz~5-~4ADP~4-8ABgU~7AD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQMDE~9AYBAAEAAAD-~5Af~4-8~VAwAAAD-~7AGBQ~7AP8AODg4AKpGRgDFfHw~6AMmmpgDg4OAA~4-AIj--wD--yL-~~v3_AQMDE~9AYBAAEAAAD-~5Af~4-8~VAwAAAD-~5AQAAAP8ABgU~7AD-ADg4OACqRkYAxXx8~6ADJpqYA4ODgAP---wCI--8A--8i-w__~~v3_AQQEE~BABgIAAQAAAP8~7AwAAAD-~NAM~4A-w~HAB~5-w~KAwAAAD-AAwAAAD-~4AD~4AP8ABgU~AAP8AODg4AKpGRgDFfHw~6AMmmpgDg4OAA~4-AIj--wD--yL-~~v3_AQQEE~BABgIAAQAAAP8~7Az~5-~NAM~5-w~HAB~5-w~KAz~5-AAz~5-~4ADP~4-8ABgU~AAP8AODg4AKpGRgDFfHw~6AMmmpgDg4OAA~4-AIj--wD--yL-"
            break;
        case 'CBCqCgoK': // crystal
            break;
        case 'CBCqCgrwAQ==': // black holes
            break;
        case 'CBCqCgoA': // white holes
            break;
        case 'CBCqqgoC': // dice
            break;
        case 'CBCqqqoN': // celled hex
            break;
        case 'CBCqqqqlCQ==': // two by two
            window.location.href = "https://prodzpod.github.io/witness#vs1_v3_AQICE~6AGAgAQ~4-g~IAGBQ~4AD-AP---wDu7u4A~4q~7AzMzMAzMzMAP---wCI--8A--8i-w__~~v3_AQMDE~9AYCAAAGCg~IAEP---4~CAYK~BAGBQ~7AP8A~4-AO7u7gCqqqo~6ADMzMwDMzMwA~4-AIj--wD--yL-~~v3_AQMDE~9AYC~BAGCg~AAEf--AP8~4Az~FAQ~4-gAAR--8A-wAQAAc~4AGBQ~7AP8A~4-AO7u7gCqqqo~6ADMzMwDMzMwA~4-AIj--wD--yL-~~v3_AQQEE~BABgI~qAR--8A-wAAADM~4AR--8A-wAQAGM~5ABgo~AABD---.~8AGBQ~AA-wD---8A7u7uAKqqqg~6AMzMzAMzMzAD---8AiP--AP--Iv8_~~v3_AQQEE~BABgIAAQAAAP8~4AB~4A-w~8AYK~9Af~4-8~4AB~5-w~GAYKAAAQ~4-gAYKAQAAAP8~CAGBQ~AABgo~EAP8A~4-AO7u7gCqqqo~6ADMzMwDMzMwA~4-AIj--wD--yL-~~v3_AQQEE~6AGAQ~7Av---4~8AH---.~FAYKAAAQ~4-gAAQ~4-gAYK~EAU~8AQ~4-g~7ABgU~IAv---4~EA-wD---8A7u7uAKqqqg~6AMzMzAMzMzAD---8AiP--AP--Iv8_~~v3_AQQEE~BABgI~PAEP---4~5AR~5-wAAADM~fAEf~4-8~4Az~4AEf~4-8~4Az~4ABgU~AAP8A~4-AO7u7gCqqqo~6ADMzMwDMzMwA~4-AIj--wD--yL-~~v3_AQQEE~BABgI~SAR--8A-wAQAEcGChD---.~CAGCg~AAEf--AP8AEABH~SABgU~AAP8A~4-AO7u7gCqqqo~6ADMzMwDMzMwA~4-AIj--wD--yL-~~v3_AQQEE~AAGCg~AAEf--AP8AEAAH~HABD---.~LAEP---4AAAv---4~IABgI~4AQ~4-g~4ABH--wD-ABAARw~4AYF~8A-wD---8A7u7uAKqqqg~6AMzMzAMzMzAD---8AiP--AP--Iv8_~~v3_AQQEEAAABgU~9AEf--AP8AEABH~lAR--8A-wAQAHI~4AR--8A-wAQAGM~KAR--8A-wAQAAEGFBD---.~BAYB~5AP8A~4-AO7u7gCqqqo~6ADMzMwDMzMwA~4-AIj--wD--yL-~~v3_AQQEE~BABgIAAQAAAP8AAf~4-8AAQAAAP8AEP---4~EABgoQ~4-gAAQ~4-gAAQ~4-gAAQ~4-g~FAEP---4AAEP---4AGChD---.AABD---.~GAB~4-gAAQ~4-gAAC~5-wAB~4A-wAGBQ~AA-wD---8A7u7uAKqqqg~6AMzMzAMzMzAD---8AiP--AP--Iv8_~~v3_AQQEEAUAAAUAAAUAAAUAAAUC~CABQAABQAGCgUABgoFAAAF~5ABD---.AABD---.ABgoAAAUAAAUAAAUAAAUAAAU~4AGChD---.AABD---.~5ABQAABQAABQAGCgUAAAU~7AYK~6AYFAAUAAAUAAAUAAAUA-wD---8A7u7uAKqqqg~6AMzMzAMzMzAD---8AiP--AP--Iv8_~~v3_AQQEE~7ABgoAAAYC~9ABD---.~JAEAAAD-AAH~5-~IAL~5-~FAGBQ~7Av---4AGCgAAAQAAAP8~FAUA-wD---8A7u7uAKqqqg~6AMzMzAMzMzAD---8AiP--AP--Iv8_";
            break;
        case 'CBCqqqqlVQ8=': // portal  
            break;
        case 'CBCqqqqlVQE=': // eye
            break;
        case 'CBCqqqoKAw==': // xvmino
            break;
        case 'CBCqqqoKCA==': // antimino
            window.location.href = "https://prodzpod.github.io/witness#vs1_v2_AgEQ~6AYCABP-AAD-~4AEQ~4AYF~5AP8A~4-APT09ACLi4s~6ALOzswAZTJoA7MsXAP--~4A~4-~~v2_AwEQ~8ABgI~4AT-wAA-wAAAREGCgAABgU~7AD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_AwMQ~8ABgIAE-8AAP8~4AD~RAGCgAGCg~AAE-8AAP8~4ADAAYF~8A-wD---8A9PT0AIuLiw~6As7OzABlMmgDsyxcA--8AAAD---8_~~v2_AwMQ~8ABgI~KAT-wAA-w~4AM~4AT-wAA-wAAABE~KAGBQ~5AFAAD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_BQUQ~8ABgE~4AGAg~UAE-8AAP8~4Az~9ABP-AAD-~4AEw~MAE-8AAP8~4AH~qAE-8AAP8~4AR~CABgU~DA-wD---8A9PT0AIuLiw~6As7OzABlMmgDsyxcA--8AAAD---8_~~v2_BQIQ~7AGF~6AGAg~LAGF~8ABP-AAD-~4AEQ~6AE-8AAP8AEAAR~4ABgU~DA-wD---8A9PT0AIuLiw~6As7OzABlMmgDsyxcA--8AAAD---8_~~v2_AwMQ~8ABgI~MABP-AAD-ABAARwAR--8A-wAQAEc~5ABQ~EABgU~7AD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_AwMQ~8ABgI~MABP-AAD-ABAARwAR--8A-wAQAEc~BAU~9ABgU~7AD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_AwMQ~8ABgI~KAR--8A-wAQAAcAEgAA--8AEAAHABP-AAD-ABAABw~KAYF~8A-wD---8A9PT0AIuLiw~6As7OzABlMmgDsyxcA--8AAAD---8_~~v2_BAMQ~8ABgE~4AC-wAA-w~RABP-AAD-ABAAEw~HAT-wAA-wAQABM~7AL-AAD-AAYF~8ABgoA-wD---8A9PT0AIuLiw~6As7OzABlMmgDsyxcA--8AAAD---8_~~v2_BAQQ~BAGAgACgP---w~MAE-8AAP8AEAEh~qAE4D---8AEAERAAL-AAD-AAYF~AAD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_BAQQ~4ABgo~5ABgI~4AT-wAA-wAQARE~5ABgo~IABP-AAD-ABABIQ~JABP-AAD-~4AIQ~8AYK~MAYF~AAD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_BQMQ~EAYCABP--wD-ABAAJw~9AR--8A-wAQJw~LAR-wAA-wAQAyI~4AT-wAA-wAQMiAGCg~WAYF~DAP8A~4-APT09ACLi4s~6ALOzswAZTJoA7MsXAP--~4A~4-~~v2_BQMQ~EAYCABP--wD-ABAAJw~9AR--8A-wAQJw~LAR-wAA-wAQAyI~4AT-wAA-wAQMi~EABgo~JAYF~DAP8A~4-APT09ACLi4s~6ALOzswAZTJoA7MsXAP--~4A~4-~~v2_BQMQ~EAYCABP-AAD-ABAyI~AAT-wAA-wAQACc~KAR--8A-wAQAyI~4AR--8A-wAQACc~RAYK~6AYF~DAP8A~4-APT09ACLi4s~6ALOzswAZTJoA7MsXAP--~4A~4-~~v2_BQMQ~EAYCABP-AAD-ABAyI~AAT-wAA-wAQACc~KAR--8A-wAQAxE~4AR--8A-wAQACc~GAFAAAGCg~DAGBQ~CAD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_BAQQBQAABQAABQAABQAABgIAE-8AAP8AEAAnABP-AAD-ABAAJwAT-wAA-wAQACcAE-8AAP8AEAAnAAUAAAUAAAUAAAUAAAUAAAL-AAD-ABP-AAD-ABAAJwAT-wAA-wAQACcAE-8AAP8AEAAnAAUAAAUAAAUAAAUAAAUAABP-AAD-ABAAJwAT-wAA-wAQACcAE-8AAP8AEAAnABP-AAD-ABAAJwAFAAAFAAAFAAAFAAAFAAAT-wAA-wAQACcAE-8AAP8AEAAnABP-AAD-ABAAJwAT-wAA-wAQACcABgUABQAABQAABQAABQD-AP---wD09PQAi4uL~6ACzs7MAGUyaAOzLFwD--wAAAP---w__~~v2_BQUQ~EAYC~XABP-AAD-ABAADw~.AEf--AP8AEE92~lAGBf8A~4-APT09ACLi4s~6ALOzswAZTJoA7MsXAP--~4A~4-~~v2_BgYQBgM~sABH--wD-~4AJwAT~4Ag~4ACc~cABH--wD-ABADEwAT~4AgAAQAxM~PAEf--AP8AAAJ0ABMAAAC~4ACd~yABH--wD-~4AYwAT~4Ag~4AGM~CAGBQ~FAP8~6ACkpKQCLi4sA~4-ALOzswAZTJoA7MsXAP--~4A~4-";
            break;
        case 'CBCqqqoK8CA=': // sizer
            break;
        case 'CBCqqqqqAg==': // editor
            window.location.href = './editor.html';
            break;
        case 'CBCqqqqqAAD\/\/\/\/\/JQ==': // challenge 1
            break;
        case 'CBCqqqqqAAD\/\/\/\/\/pQE=': // challenge 2
            break;
        case 'CBCqqqqqVVX\/\/\/\/\/IA==': // challenge 3
            break;
    }
}

});
      